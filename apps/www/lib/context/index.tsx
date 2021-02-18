import { FC } from "react";
import { ProviderTheme } from "@pulipola/ui";

export const ProviderApp: FC = ({ children }) => {
    return (
        <ProviderTheme disableTransitionOnChange={true}>
            {children}
        </ProviderTheme>
    );
};
