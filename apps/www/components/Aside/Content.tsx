import styles from "./aside.module.scss";
import { useFont } from "@pulipola/typetester";
import { InputFont } from "components/InputFont";

export const AsideContent = () => {
    const { fontList, selectedFont, setSelectedFont } = useFont();
    return (
        <div className={styles.content}>
            <InputFont />

            <div>
                <select
                    value={selectedFont}
                    aria-label="Font Selector"
                    onChange={(e) => setSelectedFont(e.target.value)}
                >
                    <optgroup label="Default">
                        {fontList
                            .filter(({ group }) => group === "default")
                            .map(({ name }, key) => (
                                <option key={key} value={name}>
                                    {name}
                                </option>
                            ))}
                    </optgroup>
                </select>
            </div>
        </div>
    );
};
