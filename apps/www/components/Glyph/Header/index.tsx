import type { CSSProperties } from "react";
import { useGlyphDisplay } from "..";

export const Header = () => {
    const { search, setSearch, pagination } = useGlyphDisplay();
    const { data, currentPage, maxPage, indicators, next, prev } = pagination;

    const buttonStyle: CSSProperties = {
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "currentcolor",
        fontSize: "inherit",
        height: "2rem",
        width: "2rem",
    };
    return (
        <header
            style={{
                position: "sticky",
                top: "var(--header-height)",
                height: "var(--header-height)",
                zIndex: 10,
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "var(--grid-gap)",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 var(--grid-gap)",
            }}
        >
            <div>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Glyphs"
                    style={{
                        backgroundColor: "var(--accents-1)",
                        borderRadius: "5rem",
                        border: "1px solid",
                        height: "2rem",
                        fontFamily: "inherit",
                        fontSize: "inherit",
                        padding: "0 0.75rem",
                        outline: "none",
                        color: "currentcolor",
                    }}
                />
            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "nowrap",
                }}
            >
                {data.length >= 1 && (
                    <div
                        style={{
                            backgroundColor: "var(--accents-1)",
                            borderRadius: "5rem",
                            border: "1px solid",
                            padding: "0 var(--grid-gap)",
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "nowrap",
                        }}
                    >
                        <button
                            onClick={prev}
                            style={{ ...buttonStyle }}
                            disabled={currentPage === 1}
                        >
                            &larr;
                        </button>
                        {indicators.length >= 1 &&
                            indicators.map(
                                ({ onClick, pageIndex, activaPage }) => (
                                    <button
                                        key={pageIndex}
                                        onClick={onClick}
                                        style={{
                                            ...buttonStyle,
                                            color: activaPage
                                                ? "var(--geist-pp-color)"
                                                : "currentcolor",
                                        }}
                                    >
                                        {pageIndex}
                                    </button>
                                )
                            )}
                        <button
                            onClick={next}
                            style={{ ...buttonStyle }}
                            disabled={currentPage === maxPage}
                        >
                            &rarr;
                        </button>
                    </div>
                )}
            </div>
            {/* <div>
                <span
                    style={{
                        backgroundColor: "var(--accents-1)",
                        borderRadius: "5rem",
                        border: "1px solid",
                        height: "2rem",
                        padding: "0 0.75rem",
                        display: "inline-flex",
                        alignItems: "center",
                        float: "right",
                    }}
                >
                    About {memoizedGlyphs.length} results
                </span>
            </div> */}
        </header>
    );
};
