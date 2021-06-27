import type { TableEntry } from "../types/table";
import inflate from "tiny-inflate";

export const uncompressTable = (data: DataView, tableEntry: TableEntry) => {
    if (tableEntry.compression === "WOFF") {
        const inBuffer = new Uint8Array(
            data.buffer,
            tableEntry.offset + 2,
            tableEntry.compressedLength - 2
        );
        const outBuffer = new Uint8Array(tableEntry.length);
        inflate(inBuffer, outBuffer);

        if (outBuffer.byteLength !== tableEntry.length) {
            throw new Error(
                `Decompression error: ${tableEntry.tag} decompressed length doesn't match recorded length`
            );
        }

        const view = new DataView(outBuffer.buffer, 0);
        return { data: view, offset: 0 };
    } else {
        return { data, offset: tableEntry.offset };
    }
};
