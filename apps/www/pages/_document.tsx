import Document, { Html, Head, Main, NextScript } from "next/document";
import { GA_TRACKING_ID } from "lib/gtag";

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link
                        rel="preload"
                        as="font"
                        type="font/woff"
                        href="fonts/Netica/Netica-Regular.woff"
                        crossOrigin="fonts/Netica/Netica-Regular.woff"
                        referrerPolicy="no-referrer"
                    />
                    <link
                        rel="preload"
                        as="font"
                        type="font/woff"
                        href="fonts/Netica/Netica-Bold.woff"
                        crossOrigin="fonts/Netica/Netica-Bold.woff"
                        referrerPolicy="no-referrer"
                    />

                    <link
                        rel="preload"
                        as="style"
                        type="text/css"
                        href="stylesheet.css"
                    />

                    <link
                        rel="stylesheet"
                        type="text/css"
                        href="stylesheet.css"
                    />

                    <link
                        rel="preload"
                        as="font"
                        type="font/ttf"
                        href="fonts/IBMPlex/IBMPlexSansVar-Roman.ttf"
                        crossOrigin="fonts/IBMPlex/IBMPlexSansVar-Roman.ttf"
                        referrerPolicy="no-referrer"
                    />
                    <link
                        rel="preload"
                        as="style"
                        type="text/css"
                        href="fonts/IBMPlex/stylesheet.css"
                    />
                    <link
                        rel="stylesheet"
                        type="text/css"
                        href="fonts/IBMPlex/stylesheet.css"
                    />

                    <link
                        rel="preload"
                        as="font"
                        type="font/ttf"
                        href="fonts/JetBrainsMono/JetBrainsMono-VariableFont_wght.ttf"
                        crossOrigin="fonts/JetBrainsMono/JetBrainsMono-VariableFont_wght.ttf"
                        referrerPolicy="no-referrer"
                    />
                    <link
                        rel="preload"
                        as="font"
                        type="font/ttf"
                        href="fonts/JetBrainsMono/JetBrainsMono-Italic-VariableFont_wght.ttf"
                        crossOrigin="fonts/JetBrainsMono/JetBrainsMono-Italic-VariableFont_wght.ttf"
                        referrerPolicy="no-referrer"
                    />

                    <link
                        rel="stylesheet"
                        type="text/css"
                        href="/fonts/JetBrainsMono/styles.css"
                    />

                    <script
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${GA_TRACKING_ID}', {
                                page_path: window.location.pathname,
                                });
                            `,
                        }}
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
