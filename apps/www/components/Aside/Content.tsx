import styles from "./aside.module.scss";
import { useFont } from "@pulipola/typetools";
import { InputFont } from "components/FontInput";
import { FontSelector } from "components/FontSelector";
import { FontData } from "./FontData";
import { ProjectInfo } from "./ProjectInfo";

export const AsideContent = () => {
    const { font } = useFont();
    return (
        <div className={styles.content}>
            <FontSelector />
            <InputFont />
            <ProjectInfo />
            <FontData font={font} />
        </div>
    );
};
