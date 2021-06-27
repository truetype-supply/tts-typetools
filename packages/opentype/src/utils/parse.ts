import type { TableEntry, TableEntryTag } from "../types/table";

const getTag = (data: DataView, offset: number) => {
    let tag: TableEntryTag = "";
    for (let i = offset; i < offset + 4; i += 1) {
        tag += String.fromCharCode(data.getInt8(i));
    }
    return tag;
};
const getUShort = (data: DataView, offset: number) =>
    data.getUint16(offset, false);
const getULong = (data: DataView, offset: number) =>
    data.getUint32(offset, false);

const parseOpenTypeTableEntries = (data: DataView, numTables: number) => {
    const tableEntries: TableEntry[] = [];
    let p = 12;

    for (let i = 0; i < numTables; i += 1) {
        const tag = getTag(data, p);
        const checksum = getULong(data, p + 4);
        const offset = getULong(data, p + 8);
        const length = getULong(data, p + 12);
        tableEntries.push({
            tag,
            checksum,
            offset,
            length,
            compression: false,
        });
        p += 16;
    }

    return tableEntries;
};

const parseWOFFTableEntries = (data: DataView, numTables: number) => {
    const tableEntries: TableEntry[] = [];
    let p = 44; // offset to the first table directory entry.

    for (let i = 0; i < numTables; i += 1) {
        const tag = getTag(data, p);
        const offset = getULong(data, p + 4);
        const compLength = getULong(data, p + 8);
        const origLength = getULong(data, p + 12);
        let compression: "WOFF" | boolean;
        if (compLength < origLength) {
            compression = "WOFF";
        } else {
            compression = false;
        }

        tableEntries.push({
            tag,
            offset,
            compression,
            length: origLength,
            compressedLength: compLength,
        });

        p += 20;
    }

    return tableEntries;
};

export {
    getTag,
    getUShort,
    getULong,
    parseOpenTypeTableEntries,
    parseWOFFTableEntries,
};
