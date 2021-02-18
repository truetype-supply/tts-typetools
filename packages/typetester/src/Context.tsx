import React, {
    createContext,
    Dispatch,
    FC,
    SetStateAction,
    useContext,
    useState,
} from "react";

type TypetesterConfig = {
    fontSize: number;
    letterSpacing: number;
    lineHeight: number;
};

type TypetesterProps = {
    text: string;
    setText: Dispatch<SetStateAction<string>>;
    config: TypetesterConfig;
    setConfig: Dispatch<SetStateAction<TypetesterConfig>>;
    resetAll: () => void;
};

type ProviderTypetesterProps = {
    default?: {
        text?: string;
        config?: TypetesterConfig;
    };
};

const init: TypetesterProps = {
    text:
        "Shoreditch is a district in the East End of London, forming the southern part of London Borough of Hackney, with neighbouring parts of Tower Hamlets sometimes also precived as a part of the area.",
    setText: (val) => val,
    config: { fontSize: 48, letterSpacing: 0, lineHeight: 1 },
    setConfig: (val) => val,
    resetAll: () => ({}),
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
    const [text, setText] = useState(
        props && props.text ? props.text : init.text
    );
    const [config, setConfig] = useState<TypetesterConfig>(
        props && props.config ? props.config : init.config
    );

    const resetAll = () =>
        setConfig(props && props.config ? props.config : init.config);

    return (
        <ContextTypetester.Provider
            value={{ text, setText, config, setConfig, resetAll }}
        >
            {children}
        </ContextTypetester.Provider>
    );
};
