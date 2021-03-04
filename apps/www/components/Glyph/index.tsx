import { CSSProperties, useEffect, useMemo, useState } from "react";
import {
    useGlyph,
    useFont,
    useVariable,
    useTypetester,
} from "@pulipola/typetools";
import { Grid } from "components/Layouts";
import { usePagination } from "lib/hooks/usePagination";

export const Glyph = () => {
    const [search, setSearch] = useState("");
    const { font } = useFont();
    const { generateVariationStyle } = useVariable();
    const { state } = useTypetester();
    const { fontOutline } = state;

    const { glyphs } = useGlyph();
    const memoizedGlyphs = useMemo(() => glyphs, [glyphs]).filter(
        ({ character, name }) => {
            const newRegex = new RegExp(search, "i");
            return character?.match(newRegex) || name.match(newRegex);
        }
    );

    const perPage = 100;
    const countPage = Math.ceil(memoizedGlyphs.length / perPage);

    const {
        currentPage,
        jump,
        prev,
        next,
        paginationData,
        maxPage,
    } = usePagination(memoizedGlyphs, perPage);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    useEffect(() => {
        if (!font) return;
        if (memoizedGlyphs.length === 0) return;
        setSearch("");
        jump(1);
    }, [font]);

    const buttonStyle: CSSProperties = {
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "currentcolor",
        fontSize: "inherit",
        // pointerEvents: "all",
        // touchAction: "auto",
        height: "2rem",
        width: "2rem",
    };

    return (
        <Grid section="Glyphs" style={{ position: "relative" }}>
            <div
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
                    }}
                >
                    {paginationData.length >= 1 && (
                        <div
                            style={{
                                backgroundColor: "var(--accents-1)",
                                borderRadius: "5rem",
                                border: "1px solid",
                                padding: "0 var(--grid-gap)",
                            }}
                        >
                            <button
                                onClick={prev}
                                style={{ ...buttonStyle }}
                                disabled={currentPage === 1}
                            >
                                &larr;
                            </button>
                            {paginationData.length >= 1 &&
                                Array(countPage)
                                    .fill(1)
                                    .map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => jump(i + 1)}
                                            style={{
                                                ...buttonStyle,
                                                color:
                                                    currentPage === i + 1
                                                        ? "var(--geist-pp-color)"
                                                        : "currentcolor",
                                            }}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
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
                <div>
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
                </div>
            </div>
            <ul
                style={{
                    padding: "0 var(--grid-gap) var(--grid-gap)",
                    margin: 0,
                    listStyle: "none",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(10rem,1fr))",
                    gridAutoRows: "minmax(10rem, 1fr)",
                    gap: "var(--grid-gap)",
                    // paddingBottom:
                    //     "calc(var(--header-height) + var(--grid-gap))",
                }}
            >
                {paginationData.length !== 0 &&
                    paginationData.map(
                        ({ character, name, unicode, html_code }, i) => (
                            <li
                                key={i}
                                style={{
                                    position: "relative",
                                    border: "1px solid",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    overflow: "hidden",
                                    ...generateVariationStyle(),
                                    color: !character ? "red" : "currentcolor",
                                    borderColor: !character
                                        ? "red !important"
                                        : "currentcolor",
                                }}
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "1rem",
                                        color: "var(--accents-6)",
                                        fontSize: "var(--text-small)",
                                    }}
                                >
                                    {name}
                                </div>
                                <div
                                    className="ngentit"
                                    data-char={`${unicode?.slice(2)}`}
                                    style={{
                                        // @ts-ignore
                                        "--feature": `"${name
                                            .split(".")
                                            .pop()
                                            ?.replace(/alt/g, "ss")}"`,
                                        fontSize: character ? "5rem" : "1rem",
                                        fontFamily: font?.name,
                                        WebkitTextStroke: fontOutline
                                            ? "0.01em"
                                            : 0,
                                        WebkitTextFillColor: fontOutline
                                            ? "transparent"
                                            : "currentColor",
                                    }}
                                >
                                    {/* {character ? character : name.charAt(0)} */}
                                    {/* {character
                                            ? character
                                            : name.split(".").shift()} */}
                                    {character ? character : "-"}
                                    {/* {character
                                        ? character
                                        : name.split(".").pop()} */}
                                </div>

                                <div
                                    style={{
                                        position: "absolute",
                                        bottom: "0.5rem",
                                        fontSize: 10,
                                        color: "var(--accents-6)",
                                    }}
                                >
                                    {unicode?.slice(2).toUpperCase()} -{" "}
                                    {html_code}
                                </div>
                            </li>
                        )
                    )}
            </ul>
        </Grid>
    );
};

// const SYMBOL_1 = [...Array(15)].map((_, y) => String.fromCharCode(y + 33));
// const SYMBOL_2 = [...Array(7)].map((_, y) => String.fromCharCode(y + 58));
// const SYMBOL_3 = [...Array(6)].map((_, y) => String.fromCharCode(y + 91));
// const SYMBOL_4 = [...Array(4)].map((_, y) => String.fromCharCode(y + 123));
// const NUMBER = [...Array(10)].map((_, y) => String.fromCharCode(y + 48));
// const LOWERCASE = [...Array(26)].map((_, y) => String.fromCharCode(y + 97));
// const UPPERCASE = [...Array(26)].map((_, y) => String.fromCharCode(y + 65));
// const kaizu = SYMBOL_1.concat(
//     SYMBOL_2,
//     SYMBOL_3,
//     SYMBOL_4,
//     NUMBER,
//     LOWERCASE,
//     UPPERCASE
// );
