import React, {
    createContext,
    Dispatch,
    FC,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import { loadFont, loadFontFace } from "@pulipola/opentype";

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

    const loadedFontHandler = () => {
        Promise.all(
            fontList.map(async ({ url, group }) => {
                const { font, variableAxes } = await loadFont(url as string);
                const family = font.names.fullName.en;
                await loadFontFace(family, url as string);
                return new Promise<LoadedFont>(async (resolve) => {
                    resolve({
                        name: family,
                        font,
                        group,
                        variableAxes: variableAxes ? variableAxes : null,
                    });
                });
            })
        ).then((res) => {
            setLoadedFont(res);
        });
    };

    useEffect(() => {
        loadedFontHandler();
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
