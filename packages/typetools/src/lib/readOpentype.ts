import type { Axes } from "../index";
import { load } from "opentype.js";
import VariableFont from "./readVariable";

export const readOpetype = async (src: string) => {
    const font = await load(src);
    const VF = new VariableFont(font);

    const axes = VF.getAxes();
    const instances = VF.getInstances();

    const newAxes: Axes[] = [];
    if (axes) {
        axes.map((item: any) =>
            newAxes.push({
                tag: item.tag,
                name: item.name.en,
                value: item.defaultValue,
                defaultValue: item.defaultValue,
                min: item.minValue,
                max: item.maxValue,
                step: item.maxValue <= 1 && item.maxValue >= -1 ? 0.01 : 1,
            })
        );
    }

    return {
        font,
        subtitutions: font.tables.gsub,
        variable: {
            axes: newAxes,
            instances,
        },
    };
};
