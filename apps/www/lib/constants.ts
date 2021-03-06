type TextKey = "all" | "paragraph" | "alphabet" | "number" | "symbol";

const SYMBOL_1 = [...Array(15)].map((_, y) => String.fromCharCode(y + 33));
const SYMBOL_2 = [...Array(7)].map((_, y) => String.fromCharCode(y + 58));
const SYMBOL_3 = [...Array(6)].map((_, y) => String.fromCharCode(y + 91));
const SYMBOL_4 = [...Array(4)].map((_, y) => String.fromCharCode(y + 123));
const symbols = SYMBOL_1.concat(SYMBOL_2, SYMBOL_3, SYMBOL_4).join(" ");

const LOWERCASE = [...Array(26)].map((_, y) => String.fromCharCode(y + 97));
const UPPERCASE = [...Array(26)].map((_, y) => String.fromCharCode(y + 65));
const alphabets = LOWERCASE.concat(UPPERCASE).join("");
const paragraph =
    "Shoreditch is a district in the East End of London, forming the southern part of London Borough of Hackney, with neighbouring parts of Tower Hamlets sometimes also precived as a part of the area.";
const numbers = [...Array(10)]
    .map((_, y) => String.fromCharCode(y + 48))
    .join(" ");

export const texts: { key: TextKey; item: string }[] = [
    { key: "paragraph", item: paragraph },
    { key: "alphabet", item: alphabets },
    { key: "number", item: numbers },
    { key: "symbol", item: symbols },
];

export const defaultFonts = [
    "/fonts/IBMPlex/IBMPlexSansVar-Roman.ttf",
    "/fonts/IBMPlex/IBMPlexSansVar-Italic.ttf",
    "/fonts/Inter/Inter.var.ttf",
    "/fonts/Inter/InterDisplay.var.ttf",
    "/fonts/Cairo/CairoGX.ttf",
    "/fonts/GrenzeGotisch/GrenzeGotisch-VariableFont_wght.ttf",
];
