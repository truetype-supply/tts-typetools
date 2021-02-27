import styles from "./layout.module.scss";
import { CSSProperties, FC } from "react";

type GridProps = {
    style?: CSSProperties;
    className?: string;
    section: string;
};

export const Grid: FC<GridProps> = ({
    children,
    style,
    className,
    section,
}) => {
    return (
        <section
            className={`${className} ${styles.grid}`}
            data-section={section}
            style={{ ...style }}
        >
            {children}
        </section>
    );
};
