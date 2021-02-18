import { FC } from "react";
import { ProviderTheme } from "@pulipola/ui";
import { ProviderFont } from "@pulipola/typetester";
import { FONT_LIST } from "lib/constants";

export const ProviderApp: FC = ({ children }) => {
    return (
        <ProviderTheme disableTransitionOnChange={true}>
            <ProviderFont
                defaultFonts={FONT_LIST}
                defaultSelected={FONT_LIST[0].name}
            >
                {children}
            </ProviderFont>
        </ProviderTheme>
    );
};
