import { ChangeEvent } from "react";

export const InputFont = () => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const files = e.target.files;
        if (!files) return;

        const single = files.length === 1;
        const multiple = files.length > 1;

        if (multiple) {
            const newFiles = Array.from(files);
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
            ).then((e) => console.log(e));
        }
        if (single) {
            // @ts-ignore
            const reader = new FileReader();
            const file = files[0];
            console.log(file);
        }
    };
    return (
        <div>
            <input
                type="file"
                aria-label="Font files"
                accept=".ttf, .otf, .woff"
                multiple
                onChange={handleChange}
            />
        </div>
    );
};
