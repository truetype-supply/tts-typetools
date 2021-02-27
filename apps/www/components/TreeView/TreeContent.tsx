import styles from "./tree.module.scss";
import { useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";
import { useMeasure } from "@pulipola/hook";
import { useTree } from ".";

export const usePrevious = (value: any) => {
    const ref = useRef();
    useEffect(() => void (ref.current = value), [value]);
    return ref.current;
};

export const TreeContent = () => {
    const { isOpen, children } = useTree();
    const {
        ref,
        bounds: { height: refHeight },
    } = useMeasure();
    const { opacity } = useSpring({
        opacity: isOpen ? 1 : 0,
        config: { mass: 5, tension: 2000, friction: 200 },
    });

    return (
        <>
            <div
                className={styles.content}
                style={{
                    height: isOpen ? refHeight : 0,
                }}
            >
                <animated.div
                    // @ts-ignore
                    ref={ref}
                    className={styles.child}
                    style={{ opacity }}
                >
                    {children}
                </animated.div>
            </div>
        </>
    );
};
