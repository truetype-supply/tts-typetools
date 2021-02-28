import NextHead from "next/head";
import { Typetester } from "components/Typetester";
import { Glyph } from "components/Glyph";

export default function Page() {
    return (
        <>
            <NextHead>
                <title>Typetools by Pulipola</title>
                <meta
                    name="description"
                    // @TODO should be improve soon
                    content="Typetools is a bla bla bla..."
                />
            </NextHead>

            <main
                style={{
                    color: "var(--accents-16)",
                    display: "grid",
                    gap: "var(--grid-gap)",
                }}
            >
                <Typetester />
                <Glyph />
            </main>
        </>
    );
}
