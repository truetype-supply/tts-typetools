import "styles/global.scss";
import { AppProps } from "next/app";
import { ProviderApp } from "lib/context";
import { Aside } from "components/Aside";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <ProviderApp>
                <Aside />
                <Component {...pageProps} />
            </ProviderApp>
        </>
    );
}
