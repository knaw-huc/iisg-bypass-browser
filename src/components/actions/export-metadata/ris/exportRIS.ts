import type {ExchangeOptions, MappedRecord} from "../types.ts";

const ris = (tag: string, value: string | undefined): string =>
    value && value.trim() ? `${tag.padEnd(2, " ")}  - ${value.trim()}\n` : "";

const toRIS = (m: MappedRecord, opts: ExchangeOptions = {}): string => {
    let out = "";
    out += ris("TY", "GEN");
    out += ris("TI", m.title);
    out += ris("PB", opts.repository);
    if (m.date) {
        out += ris("DA", m.date.slice(0, 10).replace(/-/g, "/"));
    }
    out += ris("UR", m.url);
    for (const a of m.authors) {
        out += ris("AU", a);
    }
    out += "ER  - \n";
    return out;
}

export default toRIS;