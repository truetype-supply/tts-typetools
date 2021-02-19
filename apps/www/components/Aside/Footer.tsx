import { useTheme } from "@pulipola/ui";
import packageJson from "../../package.json";

export const AsideFooter = () => {
    const { themes, theme, setTheme } = useTheme();
    return (
        <footer
            style={{
                padding: "0rem 1rem",
                height: "var(--footer-height)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "var(--text-small)",
            }}
        >
            <span>V.{packageJson.version}</span>
            <span>
                <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                >
                    {themes.map((item, i) => (
                        <option key={i} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </span>
        </footer>
    );
};
