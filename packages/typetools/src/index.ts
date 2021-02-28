import { Font as OpentypeFont } from "opentype.js";

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

export * from "./Typetools";
export * from "./hooks";
