import { useFont } from "@pulipola/typetester";
import { InputFont } from "components/InputFont";

export const AsideContent = () => {
    const { fontList, selectedFont, setSelectedFont } = useFont();
    return (
        <div
            style={{
                height: "100%",
                borderBottom: "1px solid var(--accents-4)",
                padding: "1rem",
            }}
        >
            <InputFont />

            <div>
                <select
                    value={selectedFont}
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
