import { CSSProperties, FC } from "react";

type GridProps = {
    style?: CSSProperties;
};

export const Grid: FC<GridProps> = ({ children, style }) => {
    return (
        <section
            style={{
                display: "grid",
                gridTemplateColumns: "max-content 1fr",
                gap: "var(--grid-gap)",
                ...style,
            }}
        >
            {children}
        </section>
    );
};
