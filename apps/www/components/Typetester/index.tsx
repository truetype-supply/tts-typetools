import { useVariable, useTypetester, useFont } from "@pulipola/typetools";
import { useEffect, useState } from "react";
import Editable from "react-contenteditable";
import { texts } from "lib/constants";

export const Typetester = () => {
    const { font } = useFont();
    const { generateVariationStyle } = useVariable();
    const { state, dispatch } = useTypetester();
    const {
        text,
        fontSize,
        fontLeading,
        fontTracking,
        fontOutline,
        letterCase,
        textAlign,
    } = state;

    const [newText, setNewText] = useState(text);
    useEffect(() => {
        dispatch({ type: "text", payload: newText });
    }, [newText]);

    return (
        <>
            <header
                style={{
                    position: "sticky",
                    top: "var(--header-height)",
                    height: "var(--header-height)",
                    zIndex: 10,
                }}
            >
                <select
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                >
                    {texts.map(({ key, item }, i) => (
                        <option key={i} value={item}>
                            {key}
                        </option>
                    ))}
                </select>
            </header>
            <div style={{ overflow: "hidden" }}>
                <Editable
                    html={text}
                    onChange={(e) =>
                        dispatch({ type: "text", payload: e.target.value })
                    }
                    style={{
                        padding: "1rem",
                        fontFamily: `${font?.name}, IBM Plex Sans Var Regular, sans-serif`,
                        fontSize: `${fontSize}pt`,
                        letterSpacing: `${fontTracking}em`,
                        lineHeight: `${fontLeading}em`,
                        textTransform: letterCase,
                        textAlign,
                        outline: "none",
                        WebkitTextStroke: fontOutline ? "0.01em" : 0,
                        WebkitTextFillColor: fontOutline
                            ? "transparent"
                            : "currentColor",
                        ...generateVariationStyle(),
                    }}
                />
            </div>
        </>
    );
};
