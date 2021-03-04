type AlignType = {
    type: "left" | "center" | "right" | "justify";
};

export const SVGAlign = ({ type }: AlignType) => {
    switch (type) {
        case "left":
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M3 4h18v2H3V4zm0 15h14v2H3v-2zm0-5h18v2H3v-2zm0-5h14v2H3V9z" />
                </svg>
            );

        case "center":
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M3 4h18v2H3V4zm2 15h14v2H5v-2zm-2-5h18v2H3v-2zm2-5h14v2H5V9z" />
                </svg>
            );

        case "right":
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M3 4h18v2H3V4zm4 15h14v2H7v-2zm-4-5h18v2H3v-2zm4-5h14v2H7V9z" />
                </svg>
            );

        case "justify":
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M3 4h18v2H3V4zm0 15h18v2H3v-2zm0-5h18v2H3v-2zm0-5h18v2H3V9z" />
                </svg>
            );

        default:
            return <></>;
    }
};
