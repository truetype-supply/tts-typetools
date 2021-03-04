import NextHead from "next/head";
import { Typetester } from "components/Typetester";
import { Main } from "components/Layouts";

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
            <Main>
                <Typetester />
            </Main>
        </>
    );
}
