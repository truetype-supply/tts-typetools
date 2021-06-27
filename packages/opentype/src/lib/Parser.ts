import { getULong } from "../utils/parse";

type OffsetType =
    | "byte"
    | "uShort"
    | "short"
    | "uLong"
    | "fixed"
    | "longDateTime"
    | "tag";

const typeOffsets = {
    byte: 1,
    uShort: 2,
    short: 2,
    uLong: 4,
    fixed: 4,
    longDateTime: 8,
    tag: 4,
};

class Parser {
    data: DataView;
    offset: number;
    relativeOffset: number;

    constructor(data: DataView, offset: number) {
        this.data = data;
        this.offset = offset;
        this.relativeOffset = 0;
    }

    parseByte() {
        const v = this.data.getUint8(this.offset + this.relativeOffset);
        this.relativeOffset += 1;
        return v;
    }
    parseChar() {
        const v = this.data.getInt8(this.offset + this.relativeOffset);
        this.relativeOffset += 1;
        return v;
    }
    parseUShort() {
        const v = this.data.getUint16(this.offset + this.relativeOffset);
        this.relativeOffset += 2;
        return v;
    }
    parseShort() {
        const v = this.data.getInt16(this.offset + this.relativeOffset);
        this.relativeOffset += 2;
        return v;
    }
    parseF2Dot14() {
        const v = this.data.getInt16(this.offset + this.relativeOffset) / 16384;
        this.relativeOffset += 2;
        return v;
    }
    parseULong() {
        const v = getULong(this.data, this.offset + this.relativeOffset);
        this.relativeOffset += 4;
        return v;
    }

    skip(type: OffsetType, amount: number) {
        if (amount === undefined) {
            amount = 1;
        }

        this.relativeOffset += typeOffsets[type] * amount;
    }

    parseCard8 = this.parseByte;
}

export { Parser };
