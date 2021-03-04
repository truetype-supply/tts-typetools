import styles from "./controller.module.scss";
import { useVariable, useTypetester } from "@pulipola/typetools";
import { Slider } from "components/Utils/Slider";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

export const Controller = () => {
    const { pathname } = useRouter();
    const [disable, setDisable] = useState(false);
    const { state, dispatch, initialState } = useTypetester();
    const { axes, setAxes } = useVariable();

    const memoizedAxes = useMemo(() => axes, [axes]);

    useEffect(() => {
        if (pathname === "/") return;
        setDisable(true);
        return () => setDisable(false);
    }, [pathname]);

    return (
        <>
            <section className={styles.container}>
                <nav className={styles.sticky}>
                    <div
                        className="app-header"
                        style={{
                            position: "sticky",
                            top: 0,
                            zIndex: 10,
                            backgroundColor: "var(--accents-2)",
                        }}
                    >
                        Controller
                    </div>
                    <div className={styles.controller}>
                        <div>
                            <button
                                // disabled={disable}
                                onClick={() =>
                                    dispatch({
                                        type: "fontOutline",
                                        payload: true,
                                    })
                                }
                            >
                                Outline
                            </button>
                            <button
                                disabled={disable}
                                onClick={() =>
                                    dispatch({
                                        type: "resetAll",
                                        payload: true,
                                    })
                                }
                            >
                                Reset All
                            </button>
                        </div>

                        <Slider
                            disable={disable}
                            name="Size"
                            min={8}
                            max={400}
                            step={1}
                            value={state.fontSize}
                            defaultValue={initialState.fontSize}
                            onChange={(e) =>
                                dispatch({ type: "fontSize", payload: e })
                            }
                            onDoubleClick={() =>
                                dispatch({
                                    type: "fontSize",
                                    payload: initialState.fontSize,
                                })
                            }
                        />
                        <Slider
                            disable={disable}
                            name="Tracking"
                            min={-0.15}
                            max={0.5}
                            step={0.01}
                            value={state.fontTracking}
                            defaultValue={initialState.fontTracking}
                            onChange={(e) =>
                                dispatch({ type: "fontTracking", payload: e })
                            }
                            onDoubleClick={() =>
                                dispatch({
                                    type: "fontTracking",
                                    payload: initialState.fontTracking,
                                })
                            }
                        />
                        <Slider
                            disable={disable}
                            name="Leading"
                            min={0.5}
                            max={2}
                            step={0.01}
                            value={state.fontLeading}
                            defaultValue={initialState.fontLeading}
                            onChange={(e) =>
                                dispatch({ type: "fontLeading", payload: e })
                            }
                            onDoubleClick={() =>
                                dispatch({
                                    type: "fontLeading",
                                    payload: initialState.fontLeading,
                                })
                            }
                        />

                        {memoizedAxes &&
                            memoizedAxes.length >= 1 &&
                            memoizedAxes.map(
                                (
                                    {
                                        tag,
                                        name,
                                        min,
                                        max,
                                        step,
                                        value,
                                        defaultValue,
                                    },
                                    i
                                ) => (
                                    <Slider
                                        key={i}
                                        tag={tag}
                                        name={name}
                                        min={min}
                                        max={max}
                                        step={step}
                                        value={value}
                                        defaultValue={defaultValue}
                                        onChange={(e) => setAxes(tag, e)}
                                        onDoubleClick={() =>
                                            setAxes(tag, defaultValue)
                                        }
                                    />
                                )
                            )}
                    </div>
                </nav>
            </section>
        </>
    );
};
