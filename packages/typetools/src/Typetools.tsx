import type { Font } from "./types";
import type { Dispatch, FC, SetStateAction } from "react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ProviderVariable } from "./Variable";
import { loopFont } from "./lib/loopFont";

interface ContextTypetoolsProps {
    fonts: Font[];
    font: Font | null;
    setFont: Dispatch<SetStateAction<Font | null>>;
    addFonts: Dispatch<SetStateAction<string[]>>;
}

interface ProviderTypetoolsProps {
    fonts: string[];
}

const init: ContextTypetoolsProps = {
    fonts: [],
    font: null,
    setFont: (val) => val,
    addFonts: (val) => val,
};

const ContextTypetools = createContext<ContextTypetoolsProps>(init);
export const useFont = () => useContext(ContextTypetools);

const uniqueFonts = (list: Font[]) => {
    return list.reduce(
        (acc: Font[], val) =>
            acc.some((i) => i.name === val.name) ? acc : acc.concat(val),
        []
    );
};
export const ProviderTypetools: FC<ProviderTypetoolsProps> = ({
    children,
    fonts: fontURLs,
}) => {
    const [fonts, setFonts] = useState<Font[]>([]); // Set all Font[]
    const [font, setFont] = useState<Font | null>(null); // Selected font
    const [userFonts, addFonts] = useState<string[]>([]);

    useEffect(() => {
        loopFont("default", fontURLs).then((res) => {
            setFont(res[0]);
            setFonts((prev) => {
                const newArr: Font[] = prev.concat(res);
                return uniqueFonts(newArr);
            });
        });
    }, [fontURLs]);

    useEffect(() => {
        if (userFonts.length === 0) return;
        loopFont("user", userFonts).then((res) => {
            setFont(res[res.length - 1]);
            setFonts((prev) => {
                const newArr: Font[] = prev.concat(res);
                return uniqueFonts(newArr);
            });
        });
    }, [userFonts]);

    return (
        <ContextTypetools.Provider value={{ fonts, font, setFont, addFonts }}>
            <ProviderVariable font={font}>{children}</ProviderVariable>
        </ContextTypetools.Provider>
    );
};
