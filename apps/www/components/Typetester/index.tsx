import editStyle from "./editable.module.scss";
import Editable from "react-contenteditable";
import { useTypetester, useVariable, useTypetools } from "typetools";
import { Grid } from "components/Layouts";
import { TypetesterController } from "./Controller";

export const Typetester = () => {
    const { font } = useTypetools();
    const {
        values,
        controllers,
        setController,
        text,
        setText,
    } = useTypetester();
    const { axes, setAxes, generateVariationStyle } = useVariable();
    return (
        <Grid section="Typetester" style={{ minHeight: "100vh" }}>
            <TypetesterController
                basic={controllers}
                setBasic={setController}
                variable={axes}
                setVariable={setAxes}
            />

            <div
                className={editStyle.container}
                style={{
                    fontFamily: `"${font?.name}", "IBM Plex Sans Var Regular", sans-serif`,
                }}
            >
                <div
                    className={editStyle.sticky}
                    style={{ width: "100%", backgroundColor: "inherit" }}
                >
                    <header
                        className="app-header"
                        style={{
                            position: "sticky",
                            top: 0,
                            // backgroundColor: "var(--accents-3)",
                            backgroundColor: "inherit",
                            zIndex: 10,
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <span>{font ? font.name : "Loading..."}</span>
                    </header>
                    <Editable
                        html={text}
                        onChange={(e) => setText(e.target.value)}
                        style={{
                            outline: "none",
                            padding: "1rem",
                            fontSize: `${values.fontSize}px`,
                            letterSpacing: `${values.letterSpacing}em`,
                            lineHeight: `${values.lineHeight}em`,
                            ...generateVariationStyle(),
                        }}
                    />
                </div>
            </div>
        </Grid>
    );
};
