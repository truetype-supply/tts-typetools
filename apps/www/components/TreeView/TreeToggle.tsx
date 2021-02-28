import styles from "./tree.module.scss";
import { useCallback, useState } from "react";
import { useTree } from ".";
import { SVGAction, SVGArrow } from "components/Utils/SVG";

export const TreeToggle = () => {
    const { name, setIsOpen, isOpen, actions, root } = useTree();
    const [hover, setHover] = useState(false);
    const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), [
        setIsOpen,
    ]);
    return (
        <div
            data-open={isOpen}
            data-root={root ? true : false}
            className={styles.toggle}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <button
                className={styles.button}
                data-open={isOpen}
                data-root={root ? true : false}
                onClick={toggleOpen}
            >
                <span className={styles.icon} data-open={isOpen}>
                    <SVGArrow type="expand-more" />
                </span>
                <span className={styles.label}>{name}</span>
            </button>
            {actions && (
                <button
                    className={styles.action}
                    disabled={!hover}
                    style={{ zIndex: 10 }}
                    onClick={() => actions.func()}
                    title={actions.type}
                >
                    {actions.type === "remove" ? (
                        <SVGAction type="remove" />
                    ) : (
                        "A"
                    )}
                </button>
            )}
        </div>
    );
};
