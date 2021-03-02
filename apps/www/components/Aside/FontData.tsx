import { Font } from "@pulipola/typetools";
import { TreeView } from "components/TreeView";

type FontDataProps = {
    font?: Font | null;
};

type TableProps = {
    font: any;
};

const TableFont = ({ font }: TableProps) => {
    const {
        fontFamily,
        copyright,
        version,
        manufacturer,
        // manufacturerURL,
        postScriptName,
        description,
        designer,
        // designerURL,
        fontSubfamily,
        fullName,
        trademark,
        license,
        // licenseURL,
    } = font;
    return (
        <div
            style={{
                width: "100%",
                overflow: "hidden",
                padding: "0.5rem 1rem",
            }}
        >
            <p
                style={{
                    margin: "0",
                    padding: "0 0 1rem 0",
                    fontSize: "var(--text-small)",
                }}
            >
                Informations below is automatically generated based on the font
                file's.
            </p>
            <table data-table="font-data">
                <tbody>
                    <tr>
                        <th>Version</th>
                        <td>{version.en}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td>{fullName.en}</td>
                    </tr>
                    <tr>
                        <th>Family</th>
                        <td>{fontFamily.en}</td>
                    </tr>
                    <tr>
                        <th>Sub Family</th>
                        <td>{fontSubfamily.en}</td>
                    </tr>
                    <tr>
                        <th>Post Script</th>
                        <td>{postScriptName?.en}</td>
                    </tr>
                    <tr>
                        <th>Designer</th>
                        <td>{designer?.en}</td>
                    </tr>
                    <tr>
                        <th>Manufacture</th>
                        <td>{manufacturer ? manufacturer.en : "-"}</td>
                    </tr>
                    <tr>
                        <th>Trademark</th>
                        <td>{trademark ? trademark.en : "-"}</td>
                    </tr>
                    <tr>
                        <th>Copyright</th>
                        <td>{copyright ? copyright.en : "-"}</td>
                    </tr>
                    <tr>
                        <th>License</th>
                        <td>{license ? license.en : "-"}</td>
                    </tr>

                    <tr>
                        <th>Description</th>
                        <td>{description ? description.en : "-"}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export const FontData = ({ font }: FontDataProps) => {
    return (
        <>
            <TreeView root defaultOpen name="Font Info">
                {!font ? (
                    <div
                        style={{
                            padding: "1rem",
                            fontSize: "var(--text-small)",
                        }}
                    >
                        Loading...
                    </div>
                ) : (
                    <TableFont font={font.opentype.names} />
                )}
            </TreeView>
        </>
    );
};
