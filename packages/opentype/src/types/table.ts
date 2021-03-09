export type TableEntryTag =
    | string
    | "cmap"
    | "cvt"
    | "fvar"
    | "fpgm"
    | "head"
    | "hhea"
    | "hmtx"
    | "ltag"
    | "maxp"
    | "name"
    | "OS/2"
    | "post"
    | "prep"
    | "glyf"
    | "loca"
    | "CFF"
    | "kern"
    | "GDEF"
    | "GPOS"
    | "GSUB"
    | "meta";

export type TableEntry = {
    tag: TableEntryTag;
    checksum?: number;
    compressedLength?: number;
    offset: number;
    length: number;
    compression: "WOFF" | boolean;
};
