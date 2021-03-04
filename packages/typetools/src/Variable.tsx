import type { Axes, Font } from "./types";
import type { Dispatch, FC, SetStateAction } from "react";
import React, { createContext, useContext, useEffect, useState } from "react";

type AxesControl = {
    [tag: string]: number;
};

interface ContextVariableProps {
    axes: Axes[] | null;
    axesControl: AxesControl | null;
    setAxesControl: Dispatch<SetStateAction<AxesControl | null>>;
    generateVariationStyle: () => {
        fontVariationSettings: string;
    };
    setAxes: (tag: string, val: number) => void;
}

const ContextVariable = createContext<ContextVariableProps>({
    axes: null,
    axesControl: null,
    setAxesControl: (val) => val,
    generateVariationStyle: () => ({ fontVariationSettings: "" }),
    setAxes: () => ({}),
});
export const useVariable = () => useContext(ContextVariable);

export const ProviderVariable: FC<{ font: Font | null }> = ({
    children,
    font,
}) => {
    const [axes, setInitAxes] = useState<Axes[] | null>(null);
    const [axesControl, setAxesControl] = useState<{
        [tag: string]: number;
    } | null>(null);

    const generateVariationStyle = () => {
        if (!axes) return { fontVariationSettings: "" };
        const mantep = axes.reduce((p, c) => ({ ...p, [c.tag]: c.value }), {});
        const varStyle = JSON.stringify(mantep).replace(/[{}:]/g, " ");
        return { fontVariationSettings: varStyle };
    };

    const setAxes = (tag: string, v: number) => {
        if (!axes) return;
        if (axes.length === 0) return;
        setInitAxes((prev) => {
            const selected = prev?.find((item) => item.tag === tag) as Axes;
            selected.value = v;
            return [...prev];
        });
    };

    useEffect(() => {
        if (!font) return;
        const hasAxes = font.variable.axes;
        // const hasInstance = font.variable.instances;
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

    return (
        <ContextVariable.Provider
            value={{
                axes,
                axesControl,
                setAxesControl,
                setAxes,
                generateVariationStyle,
            }}
        >
            {children}
        </ContextVariable.Provider>
    );
};
