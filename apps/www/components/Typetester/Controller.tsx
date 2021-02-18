import styles from "./controller.module.scss";
import { ChangeEvent, useMemo } from "react";
import { useTypetester } from "@pulipola/typetester";
import { useVariableFont } from "@pulipola/opentype";

const generateBasicConfig = () => {
    const { config, setConfig, reset } = useTypetester();
    const objArr = Object.entries(config);

    return objArr.map(([key, value]) => {
        switch (key) {
            case "fontSize":
                return {
                    label: "Size",
                    key,
                    value,
                    min: 12,
                    max: 200,
                    step: 1,
                    // @ts-ignore
                    onDoubleClick: () => reset(key),
                    onChange: (e: ChangeEvent<HTMLInputElement>) => {
                        setConfig((prev) => {
                            prev[key] = e.target.valueAsNumber;
                            return { ...prev };
                        });
                    },
                };
            case "letterSpacing":
                return {
                    label: "Spacing",
                    key,
                    value,
                    min: -0.25,
                    max: 1,
                    step: 0.01,
                    onDoubleClick: () => reset(key),
                    onChange: (e: ChangeEvent<HTMLInputElement>) => {
                        setConfig((prev) => {
                            prev[key] = e.target.valueAsNumber;
                            return { ...prev };
                        });
                    },
                };
            case "lineHeight":
                return {
                    label: "Height",
                    key,
                    value,
                    min: 0,
                    max: 2,
                    step: 0.01,
                    onDoubleClick: () => reset(key),
                    onChange: (e: ChangeEvent<HTMLInputElement>) => {
                        setConfig((prev) => {
                            prev[key] = e.target.valueAsNumber;
                            return { ...prev };
                        });
                    },
                };

            default:
                return {
                    key,
                    value,
                    min: 0,
                    max: 10,
                    step: 1,
                    onDoubleClick: () => {},
                    onChange: (e: ChangeEvent<HTMLInputElement>) => {
                        console.log(e.target.valueAsNumber);
                    },
                };
        }
    });
};

export const TypetesterController = () => {
    const { VFAxis, VFConfig, setVFConfig } = useVariableFont();
    const axisMap = useMemo(() => VFAxis, [VFAxis]);
    const rest = generateBasicConfig();
    return (
        <div className={styles.container}>
            <div className={styles.sticky}>
                <header className={styles.header}>Config</header>
                <div className={styles.config}>
                    {rest.map(
                        (
                            {
                                label,
                                key,
                                value,
                                min,
                                max,
                                step,
                                onChange,
                                onDoubleClick,
                            },
                            i
                        ) => {
                            return (
                                <label key={i} className={styles.input}>
                                    <section className={styles.section}>
                                        <span>{label}</span>
                                        <output>{value}</output>
                                    </section>
                                    <input
                                        type="range"
                                        name={key}
                                        min={min}
                                        max={max}
                                        step={step}
                                        value={value}
                                        onChange={onChange}
                                        onDoubleClick={onDoubleClick}
                                    />
                                </label>
                            );
                        }
                    )}
                </div>

                {axisMap ? (
                    <div className={styles.config}>
                        {axisMap.map((item, key) => {
                            const {
                                tag,
                                minValue,
                                maxValue,
                                defaultValue,
                            } = item;
                            return (
                                <label
                                    key={key}
                                    className={styles.input}
                                    data-change={VFConfig[tag] !== defaultValue}
                                >
                                    <section className={styles.section}>
                                        <span>{item.tag}</span>
                                        <output>
                                            {VFConfig[tag].toFixed(0)}
                                        </output>
                                    </section>
                                    <input
                                        type="range"
                                        step={0.01}
                                        min={minValue}
                                        max={maxValue}
                                        value={VFConfig[tag] || defaultValue}
                                        style={{ width: "100%", margin: 0 }}
                                        onDoubleClick={() => {
                                            setVFConfig((prev: any) => ({
                                                ...prev,
                                                [tag]: defaultValue,
                                            }));
                                        }}
                                        onChange={(e) =>
                                            setVFConfig((prev: any) => ({
                                                ...prev,
                                                [tag]: e.target.valueAsNumber,
                                            }))
                                        }
                                    />
                                </label>
                            );
                        })}
                    </div>
                ) : (
                    <div>No Varable Axes</div>
                )}
            </div>
        </div>
    );
};
