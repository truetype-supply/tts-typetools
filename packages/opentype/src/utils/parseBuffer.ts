import type { TableEntry } from "../types/table";
import Font from "../lib/Font";
import {
    getTag,
    getUShort,
    parseOpenTypeTableEntries,
    parseWOFFTableEntries,
} from "./parse";
import { loopTable } from "./loopTable";

export default function parseBuffer(buffer: ArrayBuffer, opt: any) {
    opt = opt === undefined || opt === null ? {} : opt;
    let indexToLocFormat: any,
        ltagTable: any,
        numTables: number,
        tableEntries: Array<TableEntry>;

    const font = new Font({ empty: true });
    const data = new DataView(buffer, 0);
    const signature = getTag(data, 0);

    // All checker that includes `String.fromCharCode(0, 1, 0, 0)`
    // it's mean to a `Single Space String` || " "
    // try `console.log(String.fromCharCode(0, 1, 0, 0))`
    if (
        signature === String.fromCharCode(0, 1, 0, 0) ||
        signature === "true" ||
        signature === "typ1"
    ) {
        font.outlinesFormat = "truetype";
        numTables = getUShort(data, 4);
        tableEntries = parseOpenTypeTableEntries(data, numTables);
    } else if (signature === "OTTO") {
        font.outlinesFormat = "cff";
        numTables = getUShort(data, 4);
        tableEntries = parseOpenTypeTableEntries(data, numTables);
    } else if (signature === "wOFF") {
        const flavor = getTag(data, 4);
        if (flavor === String.fromCharCode(0, 1, 0, 0)) {
            font.outlinesFormat = "truetype";
        } else if (flavor === "OTTO") {
            font.outlinesFormat = "cff";
        } else {
            throw new Error("Unsupported OpenType flavor " + signature);
        }

        numTables = getUShort(data, 12);
        tableEntries = parseWOFFTableEntries(data, numTables);
    } else {
        throw new Error("Unsupported OpenType signature " + signature);
    }

    const { nameTableEntry } = loopTable(data, font, tableEntries, numTables);

    return font;
}
export { parseBuffer };
