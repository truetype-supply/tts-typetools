import styles from "./controller.module.scss";
import { CSSProperties, useMemo } from "react";
import { Controller, ControllerTag, Axes } from "@pulipola/typetools";
import { Slider } from "components/Utils/Slider";
// import { event } from "lib/gtag";
interface TypetesterControllerProps {
    basic?: Controller[];
    setBasic?: (tag: ControllerTag, v: number) => void;
    variable?: Axes[] | null;
    setVariable?: (tag: string, v: number) => void;
}

export const TypetesterController = (props: TypetesterControllerProps) => {
    const { basic, setBasic, variable, setVariable } = props;

    const memoizedBasic = useMemo(() => basic, [basic]);
    const memoizedVariable = useMemo(() => variable, [variable]);

    const headerStyle: CSSProperties = {
        position: "sticky",
        top: 0,
        backgroundColor: "inherit",
    };

    return (
        <div
            className={styles.container}
            style={{ backgroundColor: "var(--accents-1)" }}
        >
            <div
                className={styles.sticky}
                style={{ backgroundColor: "inherit" }}
            >
                {memoizedBasic && setBasic && (
                    <div style={{ backgroundColor: "inherit" }}>
                        <header className="app-header" style={headerStyle}>
                            Controller
                        </header>

                        <div className={styles.config}>
                            {memoizedBasic.map((props) => {
                                const {
                                    tag,
                                    name,
                                    min,
                                    max,
                                    step,
                                    value,
                                    defaultValue,
                                } = props;
                                return (
                                    <Slider
                                        name={name}
                                        min={min}
                                        max={max}
                                        step={step}
                                        value={value}
                                        defaultValue={defaultValue}
                                        key={tag}
                                        onChange={(v) => setBasic(tag, v)}
                                        onDoubleClick={(v) => setBasic(tag, v)}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}

                {memoizedVariable &&
                    setVariable &&
                    memoizedVariable.length !== 0 && (
                        <div style={{ backgroundColor: "inherit" }}>
                            <header className="app-header" style={headerStyle}>
                                Variable
                            </header>
                            <div className={styles.config}>
                                {memoizedVariable.map((props) => {
                                    const {
                                        tag,
                                        name,
                                        min,
                                        max,
                                        step,
                                        value,
                                        defaultValue,
                                    } = props;
                                    return (
                                        <Slider
                                            key={tag}
                                            name={name}
                                            min={min}
                                            max={max}
                                            step={step}
                                            defaultValue={defaultValue}
                                            value={value}
                                            onDoubleClick={() =>
                                                setVariable(tag, defaultValue)
                                            }
                                            onChange={(e) =>
                                                setVariable(tag, e)
                                            }
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
};

// onBlur={(e) => {
//     event({
//         category: "Controller",
//         action: `controller_basic`,
//         label: `${e.type}_${label}_${selectedFont}`,
//         value,
//     });
// }}
