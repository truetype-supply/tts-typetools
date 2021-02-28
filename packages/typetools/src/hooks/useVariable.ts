import type { Axes } from "../index";
import { useCallback, useEffect, useState } from "react";
import { useTypetools } from "../Typetools";

export const useVariable = () => {
    const { font } = useTypetools();
    const [axes, setInitAxes] = useState<Axes[] | null>(null);
    const [axesControl, setAxesControl] = useState<{
        [tag: string]: number;
    } | null>(null);

    const generateStyle = useCallback(() => {
        if (!axesControl) return { fontVariationSettings: "" };
        const varStyle = JSON.stringify(axesControl).replace(/[{}:]/g, " ");
        return { fontVariationSettings: varStyle };
    }, [axesControl]);

    const generateVariationStyle = () => {
        if (!axes) return { fontVariationSettings: "" };
        const mantep = axes.reduce((p, c) => ({ ...p, [c.tag]: c.value }), {});
        const varStyle = JSON.stringify(mantep).replace(/[{}:]/g, " ");
        return { fontVariationSettings: varStyle };
    };

    const VFStyle = generateStyle();

    const setAxes = (tag: string, v: number) => {
        if (!axes) return;
        if (axes.length === 0) return;
        setInitAxes((prev) => {
            const selected = prev?.find((item) => item.tag === tag) as Axes;
            selected.value = v;
            // @ts-ignore
            return [...prev];
        });
    };

    useEffect(() => {
        if (!font) return;
        const hasAxes = font.variable.axes;
        // const hasInstance = font.variable.instances;
        // console.log(hasAxes);
        if (!hasAxes) {
            setInitAxes(null);
            setAxesControl(null);
        } else {
            const axesOBJ = hasAxes.reduce(
                (obj: any, item: { tag: string; defaultValue: number }) => {
                    return Object.assign(obj, {
                        [item.tag]: item.defaultValue,
                    });
                },
                {}
            );

            setAxesControl(axesOBJ);
            setInitAxes(hasAxes);
            setAxesControl(axesOBJ);
        }
    }, [font]);

    return {
        axes,
        axesControl,
        VFStyle,
        setAxesControl,
        setAxes,
        generateVariationStyle,
    };
};
