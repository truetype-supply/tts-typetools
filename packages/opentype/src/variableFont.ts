export interface IFontTable {
    [name: string]: any;
}
export interface IFontInfo {
    url?: string;
    names: any;
    tables: IFontTable;
    ascender: number;
    descender: number;
    encoding: any;
    glyphNames: any;
    glyphs: any;
    kerningPairs: any;
    numGlyphs: number;
    numberOfHMetrics: number;
    outlinesFormat: string;
    substitution: any;
    unitsPerEm: number;
}

export default class VariableFont implements IFontInfo {
    ascender: number = 0;
    descender: number = 0;
    encoding: any = {};
    glyphNames: any = {};
    glyphs: any = {};
    kerningPairs: any = {};
    numGlyphs: number = 0;
    numberOfHMetrics: number = 0;
    outlinesFormat: string = "truetype";
    substitution: any = {};
    unitsPerEm: number = 0;
    names: any = {};
    url: string = "";
    // @ts-ignore
    tables: IFontTable;
    hinting: any;

    constructor(public openTypeFont: IFontInfo) {
        // console.log("Copying properties...");
        Object.assign(this, openTypeFont);
        (this as any).prototype = openTypeFont;
        // @ts-ignore
        if (this.tables) {
            var fvar = this.tables["fvar"];
            if (fvar && fvar.axes && fvar.axes.length > 0) {
                // @ts-ignore
                var sortedInstances = fvar.instances.sort(function (a, b) {
                    var condition = 0;
                    var tags = Object.keys(a.coordinates);
                    var i = 0;
                    while (condition == 0 && i < tags.length) {
                        condition =
                            a.coordinates[tags[i]] > b.coordinates[tags[i]]
                                ? 1
                                : b.coordinates[tags[i]] >
                                  a.coordinates[tags[i]]
                                ? -1
                                : 0;
                        i++;
                    }
                    return condition;
                });
            }
            if (this.names.fontFamily == null) {
                this.names.fontFamily = this.names.postScriptName;
            }
        }
    }

    getFvarTable() {
        return this.tables["fvar"];
    }

    getAxes() {
        var fvar = this.getFvarTable();
        if (fvar) {
            return fvar.axes;
        }
        return null;
    }

    getAxesCount() {
        var fvar = this.getFvarTable();
        if (fvar) {
            if (fvar.axes && fvar.axes.length > 0) {
                return fvar.axes.length;
            }
        }
        return 0;
    }

    getAxis(i: number) {
        var fvar = this.getFvarTable();
        if (fvar) {
            return fvar.axes[i];
        }
        return null;
    }

    getAxisName(i: number) {
        var fvar = this.getFvarTable();
        if (fvar) {
            return fvar.axes[i].name.en;
        }
        return null;
    }

    getInstances() {
        var fvar = this.getFvarTable();
        if (fvar) {
            return fvar.instances;
        }
        return null;
    }

    getInstancesCount() {
        var fvar = this.getFvarTable();
        if (fvar) {
            if (fvar.instances && fvar.instances.length > 0) {
                return fvar.instances.length;
            }
        }
        return 0;
    }

    getInstanceName(i: number) {
        var fvar = this.getFvarTable();
        if (fvar) {
            return fvar.instances[i].name.en;
        }
        return null;
    }

    getNamedInstance(i: number) {
        var fvar = this.getFvarTable();
        if (fvar) {
            return fvar.instances[i];
        }
        return null;
    }

    getNamedInstanceSetting(i: number) {
        var fvar = this.getFvarTable();
        if (fvar) {
            var settings = [];
            var values = fvar.instances[i].coordinates;
            for (var i = 0; i < fvar.axes.length; i++) {
                settings.push(
                    "'" +
                        fvar.axes[i].tag +
                        "' " +
                        values[fvar.axes[i].tag].toString()
                );
            }
            return settings.join();
        }
        return null;
    }
}
