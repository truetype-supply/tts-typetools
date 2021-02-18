export const loadFontFace = async (name: string, url: string | ArrayBuffer) => {
    // @ts-ignore
    const font = new FontFace(name, `url("${url}")`, { fontDisplay: "block" });
    return new Promise<string>((resolve) => {
        // @ts-ignore
        font.load().then((loadedFont) => {
            // @ts-ignore
            document.fonts.add(loadedFont);
            const name: string = loadedFont.family;
            console.log(`%c>>> (new) ${name}. Installed!`, `color: #0000ff;`);
            resolve(name);
        });
    });
};
