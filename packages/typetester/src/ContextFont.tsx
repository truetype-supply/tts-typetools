import React, {
    createContext,
    Dispatch,
    FC,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import { installFont } from "./lib/installFont";

export type FontGroup = "default" | "user";
export type FontType = {
    group: FontGroup;
    name: string;
    url?: string;
};

export type LoadedFont = {
    name: string;
    group: FontGroup;
    font: any;
    variableAxes: any | null;
};

export type ContextFontProps = {
    fontList: FontType[];
    setFontList: Dispatch<SetStateAction<FontType[]>>;
    selectedFont: string;
    setSelectedFont: Dispatch<SetStateAction<string>>;
    loadedFont: LoadedFont[];
};

const init: ContextFontProps = {
    fontList: [],
    setFontList: (val) => val,
    selectedFont: "",
    setSelectedFont: (val) => val,
    loadedFont: [],
};

const ContextFont = createContext<ContextFontProps>(init);
export const useFont = () => useContext(ContextFont);

export type ProviderFontProps = {
    defaultFonts: FontType[];
    defaultSelected: string;
};
export const ProviderFont: FC<ProviderFontProps> = ({
    children,
    defaultFonts,
    defaultSelected,
}) => {
    const [fontList, setFontList] = useState<FontType[]>(defaultFonts);
    const [selectedFont, setSelectedFont] = useState<string>(defaultSelected);
    const [loadedFont, setLoadedFont] = useState<LoadedFont[]>([]);

    useEffect(() => {
        installFont(fontList).then((res) => setLoadedFont(res));
    }, [fontList]);

    return (
        <ContextFont.Provider
            value={{
                fontList,
                selectedFont,
                setFontList,
                setSelectedFont,
                loadedFont,
            }}
        >
            {children}
        </ContextFont.Provider>
    );
};
