import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link
                        rel="preload"
                        as="font"
                        type="font/ttf"
                        href="/fonts/JetBrainsMono/JetBrainsMono-VariableFont_wght.ttf"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        as="font"
                        type="font/ttf"
                        href="/fonts/JetBrainsMono/JetBrainsMono-Italic-VariableFont_wght.ttf"
                        crossOrigin=""
                    />

                    <link
                        rel="stylesheet"
                        type="text/css"
                        href="/fonts/JetBrainsMono/styles.css"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
