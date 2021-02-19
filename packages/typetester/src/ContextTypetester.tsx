import React, {
    createContext,
    Dispatch,
    FC,
    SetStateAction,
    useContext,
    useState,
} from "react";

export type ConfigKey = "fontSize" | "letterSpacing" | "lineHeight";

export type TypetesterConfig = {
    fontSize: number;
    letterSpacing: number;
    lineHeight: number;
};

type DefaultValue = {
    text: string;
    config: TypetesterConfig;
};

type ProviderTypetesterProps = {
    default: {
        text: string;
        config: TypetesterConfig;
    };
};

type TypetesterProps = {
    text: string;
    setText: Dispatch<SetStateAction<string>>;
    config: TypetesterConfig;
    setConfig: Dispatch<SetStateAction<TypetesterConfig>>;
    resetAll: () => void;
    reset: (key: ConfigKey) => void;
    deafaultValue: DefaultValue;
};

const defaultConfig = { fontSize: 48, letterSpacing: 0.0, lineHeight: 1 };

// This just initial property to prevent typescript error
const init: TypetesterProps = {
    text:
        "Shoreditch is a district in the East End of London, forming the southern part of London Borough of Hackney, with neighbouring parts of Tower Hamlets sometimes also precived as a part of the area.",
    setText: (val) => val,
    config: defaultConfig,
    setConfig: (val) => val,
    resetAll: () => ({}),
    reset: () => ({}),
    deafaultValue: {
        text: "",
        config: defaultConfig,
    },
};

const ContextTypetester = createContext<TypetesterProps>(init);
/**
 * This is a react context hook that returns `text`, `setText()`, `config`, `setConfig()`, `resetAll()`
 * @property text `string` Text field for text area / editable content
 * @function setText() Setter for text field
 * @property config
 */
export const useTypetester = () => useContext(ContextTypetester);

/**
 * ProviderTypetester
 * @param default TypetesterConfig
 */
export const ProviderTypetester: FC<ProviderTypetesterProps> = ({
    children,
    default: props,
}) => {
    const [text, setText] = useState(props.text);
    const [config, setConfig] = useState<TypetesterConfig>(props.config);

    const resetAll = () =>
        setConfig(props && props.config ? props.config : init.config);

    const reset = (key: ConfigKey) => {
        // Check if config value same as initial config value
        if (props.config[key] === config[key]) return;
        const { fontSize, letterSpacing, lineHeight } = props.config;
        switch (key) {
            case "fontSize":
                setConfig((prev) => {
                    prev.fontSize = fontSize;
                    return { ...prev };
                });
                break;

            case "letterSpacing":
                setConfig((prev) => {
                    prev.letterSpacing = letterSpacing;
                    return { ...prev };
                });
                break;

            case "lineHeight":
                setConfig((prev) => {
                    prev.lineHeight = lineHeight;
                    return { ...prev };
                });
                break;

            default:
                throw new Error("Requires config key");
        }

        return;
    };

    return (
        <ContextTypetester.Provider
            value={{
                text,
                setText,
                config,
                setConfig,
                resetAll,
                reset,
                deafaultValue: props,
            }}
        >
            {children}
        </ContextTypetester.Provider>
    );
};
