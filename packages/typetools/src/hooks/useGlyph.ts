import { useEffect, useState } from "react";
import { useTypetools } from "../Typetools";

export interface Glyph {
    character?: string | undefined;
    unicode?: string | undefined;
    unicode_dec?: number | undefined;
    html_code?: string | undefined;
    glyph_id: number;
    name: string;
    pathh?: string;
}

export const useGlyph = () => {
    const { font } = useTypetools();
    const [glyphs, setGlyphs] = useState<Glyph[]>([]);
    const [glyphSVG, setGlyphsSVG] = useState<Array<string>>([]);

    // useEffect(() => {
    //     if (!font) return;
    //     const width = 160;
    //     const height = width;
    //     const opentType = font.opentype;
    //     const head = opentType.tables.head;
    //     const maxHeight = head.yMax - head.yMin;
    //     const glyphMargin = 8;

    //     const glyphW = width - glyphMargin * 2;
    //     const glyphH = height - glyphMargin * 2;

    //     const glyphScale = Math.min(glyphW, glyphH / maxHeight);
    //     const glyphSize = glyphScale * opentType.unitsPerEm;
    //     const glyphBaseline = glyphMargin + (glyphH * head.yMax) / maxHeight;
    //     let ewe: any[] = [];
    //     const arr = Array(opentType.glyphs.length).fill(1);
    //     arr.map((_item, key) => {
    //         const glyph = opentType.glyphs.get(key);
    //         const gW = glyph.advanceWidth * glyphScale;
    //         const xMin2 = (width - gW) / 2;
    //         // const xMax2 = (width - gW) / 2;
    //         const x02 = xMin2;
    //         ewe.push(
    //             opentType.glyphs.get(key).getPath(x02, glyphBaseline, glyphSize)
    //         );
    //     });
    //     const sementara: string[] = [];
    //     ewe.map((item: any) => {
    //         sementara.push(item.toPathData(0));
    //     });
    //     setGlyphsSVG(sementara);
    // }, [font]);

    useEffect(() => {
        if (!font) return;
        const openType = font.opentype;
        // @ts-ignore
        const selectedGlyph = openType.glyphs.glyphs;
        console.log(openType);
        // console.log(openType.charToGlyphIndex("a"));

        const newGlyphs = Object.values(selectedGlyph)
            // @ts-ignore
            .filter((g) => g.unicode !== undefined)
            // @ts-ignore
            .sort((a, b) => a.index - b.index)
            // .slice(0, 20)
            .map((glyph) => {
                // @ts-ignore
                const hasUnicode = glyph.unicode;
                // @ts-ignore
                const glyphIndex = glyph.index as number;
                // @ts-ignore
                const glyphName = glyph.name as string;
                const cUnicode = `0x${(
                    "0000" + parseInt(hasUnicode).toString(16)
                ).slice(-4)}`;

                return {
                    character: hasUnicode
                        ? String.fromCharCode(hasUnicode)
                        : undefined,
                    unicode_dec: hasUnicode ? hasUnicode : undefined,
                    unicode: hasUnicode ? cUnicode : undefined,
                    html_code: hasUnicode ? `&#${hasUnicode};` : undefined,
                    glyph_id: glyphIndex,
                    name: glyphName,
                };
            });

        setGlyphs(newGlyphs);
    }, [font]);

    return { glyphs, glyphSVG };
};
