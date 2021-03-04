import NextHead from "next/head";
import { useFont } from "@pulipola/typetools";
import { Glyph } from "components/Glyph";
import { Main } from "components/Layouts";

export default function Page() {
    const { font } = useFont();
    return (
        <>
            <NextHead>
                <title>Glyphs {`| ${font ? font.name : "Loading..."}`}</title>
            </NextHead>
            <Main>
                <Glyph />
            </Main>
        </>
    );
}
