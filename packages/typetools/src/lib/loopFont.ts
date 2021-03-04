import type { FontGroup, Font, FontFormat } from "../types";
import { installFont } from "./installFont";
import { readOpetype } from "./readOpentype";

export const loopFont = (group: FontGroup, list: Array<string>) => {
    return Promise.all(
        list.map(
            (url) =>
                new Promise<Font>((resolve) => {
                    readOpetype(url).then(async ({ font, variable }) => {
                        // Define actual name for preventing error
                        // User can't inject name manually
                        const fontName = font.names.fullName.en;
                        // Install font to browser
                        // Declare as `fontName` above
                        await installFont(fontName, url);

                        resolve({
                            group,
                            name: fontName,
                            url,
                            opentype: font,
                            variable,
                            format: font.outlinesFormat as FontFormat,
                        });
                    });
                })
        )
    );
};
