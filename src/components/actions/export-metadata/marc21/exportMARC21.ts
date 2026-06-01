import type {ControlField, DataField, ExchangeOptions, MappedRecord, Subfield} from "../types.ts";
import {padL} from "../mapping/exportHelpers.ts";

const sf = (code: string, value: string): Subfield => ({ code, value });
const df = (tag: string, ind1: string, ind2: string, subfields: Subfield[]): DataField =>
    ({ tag, ind1, ind2, subfields });

const build008 = (m: MappedRecord): string => {
    const now = new Date();
    const yy = String(now.getUTCFullYear()).slice(-2);
    const mm = padL(String(now.getUTCMonth() + 1), 2);
    const dd = padL(String(now.getUTCDate()), 2);
    const entered = `${yy}${mm}${dd}`;

    const dateType = m.year ? "s" : "n";
    const date1 = m.year ? padL(m.year, 4) : "    ";
    const date2 = "    ";
    const place = "xx ";                  // 15-17
    const matSpecific = " ".repeat(17);   // 18-34
    const lang = (m.language || "und").padEnd(3).slice(0, 3); // 35-37
    const modified = " ";                 // 38
    const source = "d";                   // 39

    return entered + dateType + date1 + date2 + place + matSpecific + lang + modified + source;
}

const build005 = (): string => {
    const d = new Date();
    const y = d.getUTCFullYear();
    const mo = padL(String(d.getUTCMonth() + 1), 2);
    const da = padL(String(d.getUTCDate()), 2);
    const h = padL(String(d.getUTCHours()), 2);
    const mi = padL(String(d.getUTCMinutes()), 2);
    const s = padL(String(d.getUTCSeconds()), 2);
    return `${y}${mo}${da}${h}${mi}${s}.0`;
}

export const buildLeader = (m: MappedRecord): string => {
    return "00000n" + m.marcType + "m a2200000 a 4500";
}

const buildInd = (c: string): string => (c === " " ? "#" : c);

export const buildFields = (m: MappedRecord, opts: ExchangeOptions): {
    control: ControlField[];
    data: DataField[];
} => {
    const control: ControlField[] = [
        { tag: "005", value: build005() },
        { tag: "008", value: build008(m) },
    ];

    const data: DataField[] = [];

    // 040 — cataloging source
    const orgCode = opts.orgCode || "";
    const langCode = m.language && m.language !== "und" ? m.language : "und";
    const sub040: Subfield[] = [];
    if (orgCode) {
        sub040.push(sf("a", orgCode));
    }
    sub040.push(sf("b", langCode));
    sub040.push(sf("e", "rda"));
    if (orgCode) {
        sub040.push(sf("c", orgCode));
    }
    data.push(df("040", " ", " ", sub040));

    // 245 — title; no main entry → ind1=0
    data.push(df("245", "0", "0", [sf("a", m.title + ".")]));

    // 264 _1 — publication statement (only if any value present)
    const sub264: Subfield[] = [];
    if (opts.place) {
        sub264.push(sf("a", opts.place + " :"));
    }
    if (opts.repository) {
        sub264.push(sf("b", opts.repository + ","));
    }
    if (m.year) {
        sub264.push(sf("c", m.year + "."));
    }
    if (sub264.length > 0) {
        data.push(df("264", " ", "1", sub264));
    }

    // 336 / 337 / 338 — RDA content / media / carrier
    data.push(df("336", " ", " ", [
        sf("a", m.rda.content[0]), sf("b", m.rda.content[1]), sf("2", "rdacontent"),
    ]));
    data.push(df("337", " ", " ", [
        sf("a", m.rda.media[0]), sf("b", m.rda.media[1]), sf("2", "rdamedia"),
    ]));
    data.push(df("338", " ", " ", [
        sf("a", m.rda.carrier[0]), sf("b", m.rda.carrier[1]), sf("2", "rdacarrier"),
    ]));

    return { control, data };
}

const toMARC21Record = (m: MappedRecord, opts: ExchangeOptions = {}): string => {
    const { control, data } = buildFields(m, opts);
    const lines: string[] = [];

    lines.push(`LDR ${buildLeader(m)}`);
    for (const cf of control) {
        lines.push(`${cf.tag}     ${cf.value}`);
    }
    for (const f of data) {
        const ind = buildInd(f.ind1) + buildInd(f.ind2);
        const subs = f.subfields.map((s) => `$${s.code} ${s.value}`).join(" ");
        lines.push(`${f.tag} ${ind}  ${subs}`);
    }
    return lines.join("\n");
}

export default toMARC21Record;