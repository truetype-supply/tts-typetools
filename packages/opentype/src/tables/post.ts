import { Parser } from "../lib/Parser";
import { standardNames } from "../utils/encoding";

export function parsePostTable(data: DataView, start: number) {
    const post = Object.prototype.constructor();
    const p = new Parser(data, start);
    // post.version = p.parseVersion();
    // post.italicAngle = p.parseFixed();
    post.underlinePosition = p.parseShort();
    post.underlineThickness = p.parseShort();
    post.isFixedPitch = p.parseULong();
    post.minMemType42 = p.parseULong();
    post.maxMemType42 = p.parseULong();
    post.minMemType1 = p.parseULong();
    post.maxMemType1 = p.parseULong();
    switch (post.version) {
        case 1:
            post.names = standardNames.slice();
            break;
        case 2:
            post.numberOfGlyphs = p.parseUShort();
            post.glyphNameIndex = new Array(post.numberOfGlyphs);
            for (let i = 0; i < post.numberOfGlyphs; i++) {
                post.glyphNameIndex[i] = p.parseUShort();
            }

            // post.names = [];
            // for (let i = 0; i < post.numberOfGlyphs; i++) {
            //     if (post.glyphNameIndex[i] >= standardNames.length) {
            //         const nameLength = p.parseChar();
            //         post.names.push(p.parseString(nameLength));
            //     }
            // }

            break;
        case 2.5:
            post.numberOfGlyphs = p.parseUShort();
            post.offset = new Array(post.numberOfGlyphs);
            for (let i = 0; i < post.numberOfGlyphs; i++) {
                post.offset[i] = p.parseChar();
            }

            break;
    }
    return post;
}
