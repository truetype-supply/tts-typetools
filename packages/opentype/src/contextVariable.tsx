import React, {
    createContext,
    Dispatch,
    FC,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";

type VFAxis = any[] | null;
type VFConfig = any | null;

type ContextVariableFontProps = {
    VFConfig: VFConfig;
    setVFConfig: Dispatch<SetStateAction<VFConfig>>;
    VFAxis: VFAxis;
    setVFAxis: Dispatch<SetStateAction<VFAxis>>;
};

const init: ContextVariableFontProps = {
    VFConfig: null,
    setVFConfig: (val) => val,
    VFAxis: null,
    setVFAxis: (val) => val,
};

const ContextVariableFont = createContext<ContextVariableFontProps>(init);
export const useVariableFont = () => useContext(ContextVariableFont);

export const ProviderVariable: FC<{
    loadedFont: any[];
    selectedFont: string;
}> = ({ children, loadedFont, selectedFont }) => {
    const [VFConfig, setVFConfig] = useState<VFConfig>(null);
    const [VFAxis, setVFAxis] = useState<VFAxis>(null);

    useEffect(() => {
        if (loadedFont.length >= 1) {
            const filtered = loadedFont.find(
                ({ name }) => name === selectedFont
            );
            const hasAxes = filtered.variableAxes;
            if (hasAxes) {
                const axesOBJ = hasAxes.reduce(
                    (obj: any, item: { tag: any; defaultValue: any }) => {
                        return Object.assign(obj, {
                            [item.tag]: item.defaultValue,
                        });
                    },
                    {}
                );
                setVFConfig(axesOBJ);
                setVFAxis(hasAxes);
            }
        }
    }, [loadedFont, selectedFont]);

    return (
        <ContextVariableFont.Provider
            value={{ VFAxis, VFConfig, setVFAxis, setVFConfig }}
        >
            {children}
        </ContextVariableFont.Provider>
    );
};
