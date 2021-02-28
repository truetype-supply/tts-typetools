import { TreeView } from "components/TreeView";
import packageJson from "../../package.json";

export const ProjectInfo = () => {
    return (
        <>
            <TreeView root name="About">
                <p
                    style={{
                        fontSize: "var(--text-small)",
                        margin: 0,
                        padding: "0.5rem 1rem",
                    }}
                >
                    This project is open source. You can find on{" "}
                    <a
                        href={packageJson.repository.url}
                        target="_blank"
                        rel="noopener"
                    >
                        GitHub
                    </a>
                    .
                </p>
            </TreeView>
        </>
    );
};
