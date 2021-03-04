import styles from "./input.module.scss";
import type { ChangeEvent, FormEvent } from "react";
import { useRef, useState } from "react";
import { useFont } from "@pulipola/typetools";

export const InputFont = () => {
    const refInput = useRef<HTMLInputElement>(null);
    const refInputText = useRef<HTMLInputElement>(null);
    const { addFonts } = useFont();

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const files = e.target.files;
        if (!files) return;
        const newFiles = Array.from(files);

        const readFiles = () =>
            Promise.all(
                newFiles.sort().map((file) => {
                    const reader = new FileReader();
                    return new Promise<string>((resolve, reject) => {
                        reader.onload = (e) =>
                            resolve(e.target?.result as string);
                        reader.onerror = () => reject;
                        reader.readAsDataURL(file);
                    });
                })
            );

        readFiles()
            .then((res) => addFonts(res))
            .then(() => {
                // @ts-ignore
                refInput.current.value = "";
            });
    };

    const [inputText, setInputText] = useState<string | null>(null);
    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const handleAdd = async () => {
            if (inputText) {
                addFonts([inputText]);
            }
        };
        handleAdd()
            .then(() => setInputText(null))
            .then(() => {
                if (!refInputText.current) return;
                refInputText.current.value = "";
                refInputText.current.blur();
            });
    };

    return (
        <>
            <div style={{ padding: "var(--grid-gap) 1rem" }}>
                <div>
                    <form onSubmit={submit}>
                        <input
                            ref={refInputText}
                            style={{
                                width: "100%",
                                fontFamily: "inherit",
                                fontSize: "var(--text-small)",
                                background: "none",
                                backgroundColor: "var(--accents-3)",
                                color: "var(--accents-6)",
                                border: "1px dotted var(--accents-6)",
                                height: "2rem",
                                marginBottom: "var(--grid-gap)",
                                padding: "0 var(--grid-gap)",
                                outline: "none",
                            }}
                            type="text"
                            placeholder="https://example.com/font.otf"
                            value={inputText ? inputText : ""}
                            onChange={(e) => setInputText(e.target.value)}
                        />
                    </form>
                </div>
                <input
                    ref={refInput}
                    className={styles.input}
                    type="file"
                    aria-label="Font files"
                    accept=".ttf, .otf, .woff"
                    multiple
                    onChange={handleChange}
                    style={{ width: "100%" }}
                />
            </div>
        </>
    );
};
