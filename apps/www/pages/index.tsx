import NextHead from "next/head";
import { Typetester } from "components/Typetester";
import { Grid } from "components/Layouts";

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

            <main>
                <Typetester />
                <Grid
                    style={{
                        minHeight: "100vh",
                    }}
                >
                    <div
                        style={{
                            borderRight: "1px solid var(--accents-4)",
                            borderLeft: "1px solid var(--accents-4)",
                            width: "var(--aside-width)",
                            backgroundColor: "var(--accents-3)",
                        }}
                    />
                    <div
                        style={{
                            borderLeft: "1px solid var(--accents-4)",
                            backgroundColor: "var(--accents-3)",
                        }}
                    >
                        Glyph Display
                    </div>
                </Grid>
            </main>
        </>
    );
}
