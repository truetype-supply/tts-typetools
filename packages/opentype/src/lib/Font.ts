type Options = {
    empty: boolean;
    tables?: any;
    familyName?: string;
    styleName?: string;
    fullName?: string;
    postScriptName?: string;
    designer?: string;
    designerURL?: string;
    manufacturer?: string;
};

type Names = {
    fontFamily: string;
    fontSubfamily: string;
    fullName: string;
    postScriptName: string;
    designer: string;
    designerURL: string;
    manufacturer: string;
};

export default class Font {
    names: Names;
    supported: boolean;
    tables: any;
    encoding: any;
    outlinesFormat: any;

    constructor(options?: Options) {
        options = options;
        options.tables = options.tables || {};
        if (!options.empty) {
            // OS X will complain if the names are empty, so we put a single space everywhere by default.
            this.names = {
                fontFamily: options.familyName || " ",
                fontSubfamily: options.styleName || " ",
                fullName:
                    options.fullName ||
                    `${options.familyName} ${options.styleName}`,
                // postScriptName may not contain any whitespace
                postScriptName:
                    options.postScriptName ||
                    (options.familyName + options.styleName).replace(/\s/g, ""),
                designer: options.designer || " ",
                designerURL: options.designerURL || " ",
                manufacturer: options.manufacturer || " ",
            };
        }
        this.supported = true;
        this.tables = this.tables || {};

        Object.defineProperty(this, "hinting", {
            get: function () {
                if (this._hinting) return this._hinting;
                if (this.outlinesFormat === "truetype") {
                    // return (this._hinting = new HintingTrueType(this));
                }
            },
        });
    }

    hasChar(c: string): boolean {
        return this.encoding.charToGlyphIndex(c) !== null;
    }
    charToGlyphIndex(s: string): number {
        return this.encoding.charToGlyphIndex(s);
    }
}
