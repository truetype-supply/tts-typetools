import { useVariable, useTypetester, useFont } from "@pulipola/typetools";
import { useGlyphDisplay } from "..";

export const List = () => {
    const { font } = useFont();
    const { generateVariationStyle } = useVariable();
    const { state } = useTypetester();
    const { fontOutline } = state;

    const {
        pagination: { data },
    } = useGlyphDisplay();

    if (!font) {
        return <>Loading...</>;
    }
    if (data.length === 0) {
        return <>No result found...</>;
    }

    return (
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
            {data.length !== 0 &&
                data.map(({ character, name, unicode, html_code }, i) => (
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
                                fontSize: character ? "4rem" : "1rem",
                                fontFamily: font.name,
                                WebkitTextStroke: fontOutline ? "0.01em" : 0,
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
                            {unicode?.slice(2).toUpperCase()} - {html_code}
                        </div>
                    </li>
                ))}
        </ul>
    );
};
