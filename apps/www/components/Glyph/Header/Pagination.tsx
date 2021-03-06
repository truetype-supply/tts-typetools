import styles from "./pagination.module.scss";
import { useGlyphDisplay } from "..";

export const Pagination = () => {
    const { pagination } = useGlyphDisplay();
    const { indicators } = pagination;

    const checkPage = (string: string | number) => {
        switch (string) {
            case "prev":
                return true;
            case "next":
                return true;
            default:
                return false;
        }
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.pagination}>
                    {indicators.map(
                        ({ type, page, selected, onClick, disabled }, i) =>
                            typeof type !== "string" ? (
                                <button
                                    key={i}
                                    disabled={disabled || !checkPage(page)}
                                    onClick={
                                        !checkPage(page)
                                            ? () => ({})
                                            : () => onClick()
                                    }
                                >
                                    {!checkPage(page) ? (
                                        "..."
                                    ) : (
                                        <>
                                            {page === "next" ? (
                                                <>&rarr;</>
                                            ) : (
                                                <>&larr;</>
                                            )}
                                        </>
                                    )}
                                </button>
                            ) : (
                                <button
                                    key={i}
                                    disabled={disabled}
                                    data-active={selected}
                                    onClick={onClick}
                                >
                                    {page}
                                </button>
                            )
                    )}
                </div>
            </div>
        </>
    );
};
