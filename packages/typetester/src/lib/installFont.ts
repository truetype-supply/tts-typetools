import { loadFont, loadFontFace } from "@pulipola/opentype";
import { FontType, LoadedFont } from "../ContextFont";

export const installFont = async (list: FontType[]) => {
    return Promise.all(
        list.map(async ({ url, group }) => {
            const { font, variableAxes } = await loadFont(url as string);
            const family = font.names.fullName.en;
            await loadFontFace(family, url as string);
            return new Promise<LoadedFont>((resolve) => {
                resolve({
                    name: family,
                    font,
                    group,
                    variableAxes: variableAxes ? variableAxes : null,
                });
            });
        })
    );
};
