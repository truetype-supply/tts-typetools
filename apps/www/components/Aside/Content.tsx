import styles from "./aside.module.scss";
import { useTypetools } from "@pulipola/typetools";
import { InputFont } from "components/FontInput";
import { FontData } from "./FontData";
import { ProjectInfo } from "./ProjectInfo";
import { FontSelector } from "components/FontSelector";

export const AsideContent = () => {
    const { font } = useTypetools();
    return (
        <div className={styles.content}>
            <FontSelector />
            <InputFont />
            <ProjectInfo />
            <FontData font={font} />
        </div>
    );
};
