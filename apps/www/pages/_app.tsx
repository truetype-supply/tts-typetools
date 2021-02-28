import "styles/global.scss";
import { useEffect } from "react";
import { AppProps } from "next/app";
import * as gtag from "lib/gtag";
import { ProviderApp } from "lib/context";
import { Aside } from "components/Aside";

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
            <ProviderApp>
                <Aside />
                <Component {...pageProps} />
            </ProviderApp>
        </>
    );
}
