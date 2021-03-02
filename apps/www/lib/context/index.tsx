import { FC } from "react";
import { ProviderTypetools } from "@pulipola/typetools";
import { ProviderTheme } from "@pulipola/ui";

const defaultFonts = [
    "/fonts/IBMPlex/IBMPlexSansVar-Roman.ttf",
    "/fonts/IBMPlex/IBMPlexSansVar-Italic.ttf",
    "/fonts/Cairo/CairoGX.ttf",
    // "/fonts/Roboto/RobotoDelta-VF.ttf",
    // "/fonts/SansitaSwashed/SansitaSwashed-VariableFont_wght.ttf",
    "/fonts/GrenzeGotisch/GrenzeGotisch-VariableFont_wght.ttf",
    // "https://files.cargocollective.com/716465/Alliance-NeueMedium.otf",
    // "https://files.cargocollective.com/716465/Blimone-ExtraBold.otf",
];

export const ProviderApp: FC = ({ children }) => {
    return (
        <ProviderTheme disableTransitionOnChange={true}>
            <ProviderTypetools fonts={defaultFonts}>
                {children}
            </ProviderTypetools>
        </ProviderTheme>
    );
};
