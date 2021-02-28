export const installFont = async (name: string, url: string | ArrayBuffer) => {
    // @ts-ignore
    const font = new FontFace(name, `url("${url}")`, { fontDisplay: "block" });
    return new Promise<string>((resolve) => {
        // @ts-ignore
        font.load().then((loadedFont) => {
            const newName: string = loadedFont.family;
            // @ts-ignore
            document.fonts.add(loadedFont);
            console.log(`%c>>> [new] ${newName}.`, `color: #ff00ff;`);
            return resolve(newName);
        });
    });
};
