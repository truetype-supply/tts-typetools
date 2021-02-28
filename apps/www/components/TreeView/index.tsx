import styles from "./tree.module.scss";
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useMemo,
    useState,
} from "react";
import { TreeToggle } from "./TreeToggle";
import { TreeContent } from "./TreeContent";

interface AppTreeProps {
    root?: boolean;
    defaultOpen?: boolean;
    name: string | ReactNode;
    children?: ReactNode;
    actions?: {
        type: "remove" | "open";
        func: Function;
    };
}

interface TreeContextProps extends AppTreeProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ContextTree = createContext<TreeContextProps>({
    isOpen: false,
    setIsOpen: (val) => val,
    name: "Index",
});
export const useTree = () => useContext(ContextTree);
export const TreeView = ({
    defaultOpen = false,
    name,
    root,
    children,
    actions,
}: AppTreeProps) => {
    const [open, setIsOpen] = useState(defaultOpen);
    const isOpen = useMemo(() => open, [open]);

    return (
        <ContextTree.Provider
            value={{
                isOpen,
                setIsOpen,
                name,
                root,
                defaultOpen,
                children,
                actions,
            }}
        >
            <div className={styles.container}>
                <TreeToggle />
                <TreeContent />
            </div>
        </ContextTree.Provider>
    );
};
