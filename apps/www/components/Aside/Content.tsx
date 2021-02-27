import styles from "./aside.module.scss";
import { InputFont } from "components/FontInput";
import { useTypetools } from "typetools";
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
