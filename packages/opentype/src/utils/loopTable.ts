import type { TableEntry } from "../types/table";
import Font from "../lib/Font";
import { parseCmapTable, parsePostTable } from "../tables";
import { uncompressTable } from "./uncompressTable";

export const loopTable = (
    data: DataView,
    font: Font,
    tableEntries: TableEntry[],
    numTables: number
) => {
    let cffTableEntry: TableEntry,
        fvarTableEntry: TableEntry,
        glyfTableEntry: TableEntry,
        gdefTableEntry: TableEntry,
        gposTableEntry: TableEntry,
        gsubTableEntry: TableEntry,
        hmtxTableEntry: TableEntry,
        kernTableEntry: TableEntry,
        locaTableEntry: TableEntry,
        nameTableEntry: TableEntry,
        metaTableEntry: TableEntry;
    let p: any;

    for (let i = 0; i < numTables; i += 1) {
        const tableEntry = tableEntries[i];
        let table: { data: DataView; offset: number };

        switch (tableEntry.tag) {
            case "cmap":
                table = uncompressTable(data, tableEntry);
                font.tables.cmap = parseCmapTable(data, table.offset);
                break;
            case "cvt":
                break;
            case "fvar":
                fvarTableEntry = tableEntry;
                break;
            case "fpgm":
                break;
            case "head":
                break;
            case "hhea":
                break;
            case "hmtx":
                hmtxTableEntry = tableEntry;
                break;
            case "ltag":
                break;
            case "maxp":
                break;
            case "name":
                nameTableEntry = tableEntry;
                break;
            case "OS/2":
                break;
            case "post":
                table = uncompressTable(data, tableEntry);
                font.tables.post = parsePostTable(table.data, table.offset);
                break;
            case "prep":
                break;
            case "glyf":
                glyfTableEntry = tableEntry;
                break;
            case "loca":
                locaTableEntry = tableEntry;
                break;
            case "CFF":
                cffTableEntry = tableEntry;
                break;
            case "kern":
                kernTableEntry = tableEntry;
                break;
            case "GDEF":
                gdefTableEntry = tableEntry;
                break;
            case "GPOS":
                gposTableEntry = tableEntry;
                break;
            case "GSUB":
                gsubTableEntry = tableEntry;
                break;
            case "meta":
                metaTableEntry = tableEntry;
                break;
            default:
                break;
        }
    }

    return {
        cffTableEntry,
        fvarTableEntry,
        glyfTableEntry,
        gdefTableEntry,
        gposTableEntry,
        gsubTableEntry,
        hmtxTableEntry,
        kernTableEntry,
        locaTableEntry,
        nameTableEntry,
        metaTableEntry,
    };
};
