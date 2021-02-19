import { ProviderTypetester } from "@pulipola/typetester";
import { ProviderVariable } from "@pulipola/opentype";
import { useFont } from "@pulipola/typetester";
import { Grid } from "components/Layouts";
import { TypetesterController } from "./Controller";
import { TypetesterEditable } from "./Editable";

const TypetesterContent = () => {
    return (
        <Grid style={{ minHeight: "75vh" }}>
            <TypetesterController />
            <TypetesterEditable />
        </Grid>
    );
};

export const Typetester = () => {
    const { selectedFont, loadedFont } = useFont();
    const text =
        "Shoreditch is a district in the East End of London, forming the southern part of London Borough of Hackney, with neighbouring parts of Tower Hamlets sometimes also precived as a part of the area.";

    const initSize = text.length >= 100 ? 48 : 100;
    return (
        <>
            <ProviderTypetester
                default={{
                    text,
                    config: {
                        fontSize: initSize,
                        letterSpacing: 0,
                        lineHeight: 1,
                    },
                }}
            >
                <ProviderVariable
                    loadedFont={loadedFont}
                    selectedFont={selectedFont}
                >
                    <TypetesterContent />
                </ProviderVariable>
            </ProviderTypetester>
        </>
    );
};
