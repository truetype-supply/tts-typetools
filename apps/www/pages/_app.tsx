import "styles/global.scss";
import { useEffect } from "react";
import { AppProps } from "next/app";
import { ProviderTheme } from "@pulipola/ui";
import { ProviderTypetools, ProviderTypetester } from "@pulipola/typetools";
import * as gtag from "lib/gtag";
import { defaultFonts, texts } from "lib/constants";
import { Aside } from "components/Aside";
import { Controller } from "components/Controller";

export default function MyApp({ Component, pageProps, router }: AppProps) {
    useEffect(() => {
        const handleRouteChange = (url: string) => {
            gtag.pageview(url);
        };
        router.events.on("routeChangeComplete", handleRouteChange);
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);

    return (
        <>
            <ProviderTheme disableTransitionOnChange={true}>
                <ProviderTypetools fonts={defaultFonts}>
                    <ProviderTypetester
                        initialState={{
                            text: texts[0].item,
                            textAlign: "left",
                            letterCase: "none",
                            fontSize: 48,
                            fontOutline: false,
                            fontTracking: 0,
                            fontLeading: 1,
                        }}
                    >
                        <Aside />
                        <Controller />
                        <Component {...pageProps} />
                    </ProviderTypetester>
                </ProviderTypetools>
            </ProviderTheme>
        </>
    );
}
