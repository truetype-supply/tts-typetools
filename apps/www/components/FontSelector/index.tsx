import { CSSProperties, useRef } from "react";
import { useOnClickOutside } from "@pulipola/hook";
import { useTypetools } from "@pulipola/typetools";
import { useToggle } from "lib/hooks/useToggle";

export const FontSelector = () => {
    const refParent = useRef<HTMLDivElement>(null);
    const { fonts, font, setFont } = useTypetools();
    const { show, toggle, setShow } = useToggle();
    useOnClickOutside({ target: refParent, handler: () => setShow(false) });

    const hasUserFonts =
        fonts.filter(({ group }) => group === "user").length >= 1;

    const buttonWrapperStyle = (state: boolean) => {
        return {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 1.5rem 0 0.5rem",
            backgroundColor: state ? "var(--accents-4)" : "inherit",
        };
    };

    const buttonStyle: CSSProperties = {
        background: "none",
        backgroundColor: "inherit",
        border: "none",
        height: "1.5rem",
        width: "100%",
        cursor: "pointer",
        outline: "none",
        textAlign: "left",
        color: "currentcolor",
        fontSize: "var(--text-small)",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        display: "block",
        padding: "0 0.25rem",
    };

    if (fonts.length === 0) {
        return (
            <div
                style={{
                    padding: "0 1rem",
                    height: "2rem",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                Loading fonts...
            </div>
        );
    }
    return (
        <>
            <div
                ref={refParent}
                style={{
                    padding: "0 1rem",
                    position: "relative",
                }}
            >
                <button
                    onClick={toggle}
                    style={{
                        ...buttonStyle,
                        fontFamily: font?.name,
                        fontSize: "1rem",
                        backgroundColor: "var(--accents-3)",
                        height: "2rem",
                    }}
                >
                    {font?.name}
                </button>

                <div
                    style={{
                        display: show ? "block" : "none",
                        position: "absolute",
                        width: "calc(100% - 2rem)",
                        marginTop: "var(--grid-gap)",
                        backgroundColor: "var(--accents-1)",
                        boxShadow: "var(--shadow-sticky",
                        zIndex: 10,
                        maxHeight: 300,
                        overflow: "scroll",
                        border: "1px solid",
                    }}
                >
                    <div
                        style={{
                            borderBottom: hasUserFonts
                                ? "1px solid"
                                : "0px solid",
                        }}
                    >
                        {fonts
                            .filter(({ group }) => group === "default")
                            .map((props, i) => {
                                const { name } = props;
                                return (
                                    <div
                                        key={i}
                                        style={{
                                            ...buttonWrapperStyle(
                                                font?.name === name
                                            ),
                                        }}
                                    >
                                        <button
                                            title={name}
                                            onClick={() => {
                                                setFont(props);
                                                setShow(false);
                                            }}
                                            style={{
                                                ...buttonStyle,
                                                fontFamily: name,
                                            }}
                                        >
                                            {name}
                                        </button>
                                    </div>
                                );
                            })}

                        {fonts
                            .filter(({ group }) => group === "user")
                            .map((props, i) => {
                                const { name } = props;
                                return (
                                    <div
                                        key={i}
                                        style={{
                                            ...buttonWrapperStyle(
                                                font?.name === name
                                            ),
                                        }}
                                    >
                                        <button
                                            title={name}
                                            onClick={() => {
                                                setFont(props);
                                                setShow(false);
                                            }}
                                            style={{
                                                ...buttonStyle,
                                                fontFamily: name,
                                            }}
                                        >
                                            {name}
                                        </button>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </>
    );
};
