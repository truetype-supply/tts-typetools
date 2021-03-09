import { Parser } from "../lib/Parser";
import { getULong, getUShort } from "../utils/parse";

interface CMAP {
    format: number;
    glyphIndexMap: {
        [key: number]: number;
    };
    groupCount: number;
    language: number;
    length: number;
    numTables: number;
    version: number;
    segCount: number;
}

function parseCmapTableFormat12(cmap: CMAP, p: Parser) {
    p.parseUShort();

    // Length in bytes of the sub-tables.
    cmap.length = p.parseULong();
    cmap.language = p.parseULong();

    let groupCount: number;
    cmap.groupCount = groupCount = p.parseULong();
    cmap.glyphIndexMap = {};

    for (let i = 0; i < groupCount; i += 1) {
        const startCharCode = p.parseULong();
        const endCharCode = p.parseULong();
        let startGlyphId = p.parseULong();

        for (let c = startCharCode; c <= endCharCode; c += 1) {
            cmap.glyphIndexMap[c] = startGlyphId;
            startGlyphId++;
        }
    }
}

function parseCmapTableFormat4(
    cmap: CMAP,
    p: Parser,
    data: DataView,
    start: number,
    offset: number
) {
    // Length in bytes of the sub-tables.
    cmap.length = p.parseUShort();
    cmap.language = p.parseUShort();
    // segCount is stored x 2.
    let segCount: number;
    cmap.segCount = segCount = p.parseUShort() >> 1;
    p.skip("uShort", 3);

    // The "unrolled" mapping from character codes to glyph indices.
    cmap.glyphIndexMap = {};
    const endCountParser = new Parser(data, start + offset + 14);
    const startCountParser = new Parser(
        data,
        start + offset + 16 + segCount * 2
    );
    const idDeltaParser = new Parser(data, start + offset + 16 + segCount * 4);
    const idRangeOffsetParser = new Parser(
        data,
        start + offset + 16 + segCount * 6
    );
    let glyphIndexOffset = start + offset + 16 + segCount * 8;

    for (let i = 0; i < segCount - 1; i += 1) {
        let glyphIndex: number;
        const endCount = endCountParser.parseUShort();
        const startCount = startCountParser.parseUShort();
        const idDelta = idDeltaParser.parseShort();
        const idRangeOffset = idRangeOffsetParser.parseUShort();
        for (let c = startCount; c <= endCount; c += 1) {
            if (idRangeOffset !== 0) {
                // The idRangeOffset is relative to the current position in the idRangeOffset array.
                // Take the current offset in the idRangeOffset array.
                glyphIndexOffset =
                    idRangeOffsetParser.offset +
                    idRangeOffsetParser.relativeOffset -
                    2;

                // Add the value of the idRangeOffset, which will move us into the glyphIndex array.
                glyphIndexOffset += idRangeOffset;

                // Then add the character index of the current segment, multiplied by 2 for USHORTs.
                glyphIndexOffset += (c - startCount) * 2;
                glyphIndex = getUShort(data, glyphIndexOffset);
                if (glyphIndex !== 0) {
                    glyphIndex = (glyphIndex + idDelta) & 0xffff;
                }
            } else {
                glyphIndex = (c + idDelta) & 0xffff;
            }

            cmap.glyphIndexMap[c] = glyphIndex;
        }
    }
}

export function parseCmapTable(data: DataView, start: number): any {
    const cmap: CMAP = Object.prototype.constructor();
    cmap.version = getUShort(data, start);
    cmap.numTables = getUShort(data, start + 2);

    let offset = -1;
    for (let i = cmap.numTables - 1; i >= 0; i -= 1) {
        const platformId = getUShort(data, start + 4 + i * 8);
        const encodingId = getUShort(data, start + 4 + i * 8 + 2);
        if (
            (platformId === 3 &&
                (encodingId === 0 || encodingId === 1 || encodingId === 10)) ||
            (platformId === 0 &&
                (encodingId === 0 ||
                    encodingId === 1 ||
                    encodingId === 2 ||
                    encodingId === 3 ||
                    encodingId === 4))
        ) {
            offset = getULong(data, start + 4 + i * 8 + 4);
            break;
        }
    }

    if (offset === -1) {
        // There is no cmap table in the font that we support.
        throw new Error("No valid cmap sub-tables found.");
    }

    const p = new Parser(data, start + offset);
    cmap.format = p.parseShort();

    if (cmap.format === 12) {
        parseCmapTableFormat12(cmap, p);
    } else if (cmap.format === 4) {
        parseCmapTableFormat4(cmap, p, data, start, offset);
    } else {
        throw new Error(
            `Only format 4 and 12 cmap tables are supported (found format "${cmap.format}")`
        );
    }

    return cmap;
}
