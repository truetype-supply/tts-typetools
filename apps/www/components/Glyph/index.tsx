import { useMemo } from "react";
import { useGlyph, useTypetools, useVariable } from "typetools";
import { Grid } from "components/Layouts";
import { TypetesterController } from "components/Typetester/Controller";

export const Glyph = () => {
    const { font } = useTypetools();
    const { axes, setAxes, generateVariationStyle } = useVariable();
    const { glyphs } = useGlyph();
    const memoizedGlyphs = useMemo(() => glyphs, [glyphs]);

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

    return (
        <Grid section="Glyphs">
            <TypetesterController variable={axes} setVariable={setAxes} />

            <div
                style={{
                    borderLeft: "1px solid",
                    borderBottom: "1px solid",
                    backgroundColor: "var(--accents-1)",
                }}
            >
                <div
                    className="app-header"
                    style={{
                        position: "sticky",
                        top: 0,
                        backgroundColor: "inherit",
                        zIndex: 10,
                    }}
                >
                    <div>Glyphs</div>
                    <div>{memoizedGlyphs.length}</div>
                </div>
                <ul
                    style={{
                        padding: "var(--grid-gap)",
                        margin: 0,
                        listStyle: "none",
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit,minmax(10rem,1fr))",
                        gap: "var(--grid-gap)",
                    }}
                >
                    {memoizedGlyphs.length !== 0 &&
                        memoizedGlyphs.map(
                            ({ character, name, unicode, html_code }, i) => (
                                <li
                                    key={i}
                                    style={{
                                        position: "relative",
                                        border: "1px solid",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: 200,
                                        overflow: "hidden",
                                        ...generateVariationStyle(),
                                        color: !character
                                            ? "red"
                                            : "currentcolor",
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
                                            // // @ts-ignore
                                            // "--feature": `"${name
                                            //     .slice(2)
                                            //     .replace(/alt/g, "ss")}"`,
                                            fontSize: character
                                                ? "4rem"
                                                : "1rem",
                                            fontFamily: font?.name,
                                            // fontVariantAlternates: `"${name
                                            //     .slice(2)
                                            //     .replace(/alt/g, "ss")}"`,
                                            // minHeight: 100,
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
            </div>
        </Grid>
    );
};
