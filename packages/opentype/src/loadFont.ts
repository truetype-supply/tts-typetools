import { load } from "opentype.js";
import VariableFont from "./variableFont";

export const loadFont = async (src: string) => {
    const font = await load(src);
    const vf = new VariableFont(font);
    const variableAxes = vf.getAxes();
    return { font, variableAxes };
};
