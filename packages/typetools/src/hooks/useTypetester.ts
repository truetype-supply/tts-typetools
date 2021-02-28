import { useCallback, useState } from "react";

export type ControllerTag =
    | "f-size"
    | "f-spacing"
    | "f-letter_spacing"
    | "f-line_height"
    | "f-leading"
    | "f-weight";

export interface Controller {
    tag: ControllerTag;
    name: string;
    defaultValue: number;
    value: number;
    min: number;
    max: number;
    step: number;
}

const defaultController: Controller[] = [
    {
        tag: "f-size",
        name: "Size",
        defaultValue: 48,
        value: 48,
        min: 12,
        max: 400,
        step: 1,
    },
    {
        tag: "f-letter_spacing",
        name: "Spacing",
        defaultValue: 0,
        value: 0,
        min: -0.15,
        max: 0.5,
        step: 0.01,
    },
    {
        tag: "f-line_height",
        name: "Height",
        defaultValue: 1,
        value: 1,
        min: 0,
        max: 2,
        step: 0.01,
    },
];

export const useTypetester = () => {
    const [text, setText] = useState<string>(
        "Shoreditch is a district in the East End of London, forming the southern part of London Borough of Hackney, with neighbouring parts of Tower Hamlets sometimes also precived as a part of the area."
    );
    const [controllers, setControllers] = useState<Controller[]>(
        defaultController
    );

    const setController = useCallback(
        (tag: ControllerTag, v: number) => {
            setControllers((prev) => {
                const selected = prev.find(
                    (item) => item.tag === tag
                ) as Controller;

                selected.value = v;
                return [...prev];
            });
        },
        [controllers]
    );
    const getValue = (tag: ControllerTag) =>
        controllers.find((item) => item.tag === tag);

    const values = {
        fontSize: getValue("f-size")?.value,
        lineHeight: getValue("f-line_height")?.value,
        letterSpacing: getValue("f-letter_spacing")?.value,
    };
    return { text, setText, controllers, setController, values };
};
