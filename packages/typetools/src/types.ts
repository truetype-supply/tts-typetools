import type { Font as OpentypeFont } from "opentype.js";

export type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
        ? { type: Key }
        : { type: Key; payload: M[Key] };
};

export type TextAlign = "left" | "center" | "right" | "justify";
export type LetterCase = "none" | "lowercase" | "capitalize" | "uppercase";
export interface TypetesterState {
    text: string;
    textAlign: TextAlign;
    letterCase: LetterCase;
    fontSize: number;
    fontTracking: number;
    fontLeading: number;
    fontOutline: boolean;
    readonly textReset?: boolean;
    readonly resetAll?: boolean;
}
export type TypetesterAction = ActionMap<TypetesterState>[keyof ActionMap<TypetesterState>];

export type FontGroup = "default" | "user";
export type FontFormat = "truetype" | "cff";
export interface Axes {
    tag: string;
    name: string;
    value: number;
    defaultValue: number;
    min: number;
    max: number;
    step: number;
}

export interface Font {
    format: FontFormat;
    group: FontGroup;
    name: string;
    opentype: OpentypeFont;
    url: string;
    variable: {
        axes: Axes[];
        instances: any;
    };
}

export interface Glyph {
    character?: string | undefined;
    unicode?: string | undefined;
    unicode_dec?: number | undefined;
    html_code?: string | undefined;
    glyph_id: number;
    name: string;
    pathh?: string;
}
