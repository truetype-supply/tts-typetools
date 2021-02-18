import Editable from "react-contenteditable";
import { useTypetester, ProviderTypetester } from "@pulipola/typetester";
import { Grid } from "components/Layouts";

const TypetesterContent = () => {
    const { text, setText, config, setConfig, resetAll } = useTypetester();
    return (
        <Grid style={{ minHeight: "75vh" }}>
            <div
                style={{
                    borderRight: "1px solid var(--accents-4)",
                    borderLeft: "1px solid var(--accents-4)",
                    borderBottom: "1px solid var(--accents-4)",
                    width: "var(--aside-width)",
                    backgroundColor: "var(--accents-3)",
                }}
            >
                <div
                    style={{
                        position: "sticky",
                        top: 0,
                        display: "flex",
                        flexDirection: "column",
                        // padding: "1rem",
                    }}
                >
                    <header
                        style={{
                            borderBottom: "1px solid var(--accents-4)",
                            padding: "1rem",
                        }}
                    >
                        Config
                    </header>
                    <div style={{ padding: "1rem" }}>
                        <button onClick={resetAll}>Reset All</button>
                        <input
                            type="range"
                            min={12}
                            max={200}
                            step={1}
                            value={config.fontSize}
                            onChange={(e) =>
                                setConfig((prev) => {
                                    return {
                                        ...prev,
                                        fontSize: e.target.valueAsNumber,
                                    };
                                })
                            }
                        />
                        <input
                            type="range"
                            min={-0.5}
                            max={1}
                            step={0.01}
                            value={config.letterSpacing}
                            onChange={(e) =>
                                setConfig((prev) => {
                                    return {
                                        ...prev,
                                        letterSpacing: e.target.valueAsNumber,
                                    };
                                })
                            }
                        />
                        <input
                            type="range"
                            min={0.5}
                            max={2}
                            step={0.01}
                            value={config.lineHeight}
                            onChange={(e) =>
                                setConfig((prev) => {
                                    return {
                                        ...prev,
                                        lineHeight: e.target.valueAsNumber,
                                    };
                                })
                            }
                        />
                    </div>
                </div>
            </div>

            <div
                style={{
                    position: "relative",
                    width: "100%",
                    outline: "none",
                    overflow: "hidden",
                    padding: "1rem",
                    borderLeft: "1px solid var(--accents-4)",
                    borderBottom: "1px solid var(--accents-4)",
                    backgroundColor: "var(--accents-3)",
                }}
            >
                <Editable
                    html={text}
                    onChange={(e) => setText(e.target.value)}
                    spellCheck={false}
                    style={{
                        fontSize: config.fontSize,
                        letterSpacing: `${config.letterSpacing}rem`,
                        lineHeight: config.lineHeight,
                        // padding: "1rem",
                        // border: "1px solid var(--accents-4)",
                        overflow: "hidden",
                    }}
                />
            </div>
        </Grid>
    );
};

export const Typetester = () => {
    return (
        <>
            <ProviderTypetester>
                <TypetesterContent />
            </ProviderTypetester>
        </>
    );
};
