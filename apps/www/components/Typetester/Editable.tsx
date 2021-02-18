import Editable from "react-contenteditable";
import { useCallback } from "react";
import { useTypetester, useFont } from "@pulipola/typetester";
import { useVariableFont } from "@pulipola/opentype";

export const TypetesterEditable = () => {
    const { text, setText, config } = useTypetester();
    const { selectedFont } = useFont();
    const { VFConfig } = useVariableFont();

    const fVariableStyle = useCallback(() => {
        if (!VFConfig) return {};
        const varStyle = JSON.stringify(VFConfig).replace(/[{}:]/g, "");
        return { fontVariationSettings: varStyle };
    }, [VFConfig]);

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                outline: "none",
                hyphens: "auto",

                overflow: "hidden",
                // padding: "1rem",
                borderLeft: "1px solid var(--accents-4)",
                borderBottom: "1px solid var(--accents-4)",
                backgroundColor: "var(--accents-3)",
                fontFamily: `"${selectedFont}", sans-serif`,
            }}
        >
            <Editable
                html={text}
                onChange={(e) => setText(e.target.value)}
                spellCheck={false}
                style={{
                    position: "sticky",
                    top: 0,
                    fontSize: config.fontSize,
                    letterSpacing: `${config.letterSpacing}em`,
                    lineHeight: `${config.lineHeight}em`,
                    padding: "1rem",
                    hyphens: "auto",
                    outline: "none",
                    // border: "1px solid var(--accents-4)",
                    ...fVariableStyle(),
                }}
            />
        </div>
    );
};
