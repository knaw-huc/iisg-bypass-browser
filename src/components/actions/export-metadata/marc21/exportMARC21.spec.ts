import {describe, expect, it} from "vitest";
import toMARC21Record from "./exportMARC21.ts";
import type {MappedRecord} from "../types.ts";

const mapped = (overrides: Partial<MappedRecord> = {}): MappedRecord => ({
    title: "A Title",
    authors: [],
    url: "https://example.org/file.pdf",
    language: "eng",
    rda: {
        content: ["text", "txt"],
        media: ["computer", "c"],
        carrier: ["online resource", "cr"],
    },
    marcType: "a",
    ...overrides,
});

const lines = (s: string) => s.split("\n");
const lineStarting = (s: string, prefix: string) =>
    lines(s).find((l) => l.startsWith(prefix));

describe("toMARC21Record — leader", () => {
    it("starts with an LDR line encoding the material type", () => {
        const out = toMARC21Record(mapped({marcType: "k"}));
        const ldr = lineStarting(out, "LDR ");
        expect(ldr).toBeDefined();
        expect(ldr).toBe("LDR 00000nkm a2200000 a 4500");
    });
});

describe("toMARC21Record — control fields", () => {
    it("emits a 005 timestamp with a .0 suffix", () => {
        const out = toMARC21Record(mapped());
        const f005 = lineStarting(out, "005 ");
        expect(f005).toBeDefined();
        expect(f005).toMatch(/^005\s+\d{14}\.0$/);
    });

    it("emits 008 with dateType 's' and the year when a year is present", () => {
        const out = toMARC21Record(mapped({year: "2021"}));
        const f008 = lineStarting(out, "008 ");
        expect(f008).toBeDefined();
        expect(f008!.includes("s2021")).toBe(true);
        expect(f008!.includes("eng")).toBe(true);
    });

    it("emits 008 with dateType 'n' when no year is present", () => {
        const out = toMARC21Record(mapped());
        const f008 = lineStarting(out, "008 ");
        expect(f008).toBeDefined();
        // line is "008" + 5 spaces + 6-char entered date; dateType follows at index 14
        expect(f008!.slice(14, 15)).toBe("n");
    });

    it("uses 'und' in 008 when language is undefined", () => {
        const out = toMARC21Record(mapped({language: "und"}));
        const f008 = lineStarting(out, "008 ");
        expect(f008!.includes("und")).toBe(true);
    });
});

describe("toMARC21Record — 040 cataloging source", () => {
    it("omits $a/$c when no orgCode is supplied, keeping $b (language) and $e rda", () => {
        const out = toMARC21Record(mapped());
        const f040 = lineStarting(out, "040 ");
        expect(f040).toBeDefined();
        expect(f040).not.toContain("$a");
        expect(f040).not.toContain("$c");
        expect(f040).toContain("$b eng");
        expect(f040).toContain("$e rda");
    });

    it("emits $a and $c when orgCode is supplied", () => {
        const out = toMARC21Record(mapped(), {orgCode: "NL-AmISG"});
        const f040 = lineStarting(out, "040 ");
        expect(f040).toContain("$a NL-AmISG");
        expect(f040).toContain("$c NL-AmISG");
    });

    it("passes 'und' through to $b when language is unknown", () => {
        const out = toMARC21Record(mapped({language: "und"}));
        const f040 = lineStarting(out, "040 ");
        expect(f040).toContain("$b und");
    });
});

describe("toMARC21Record — title and publication", () => {
    it("emits 245 with the title followed by a period", () => {
        const out = toMARC21Record(mapped({title: "Hello"}));
        const f245 = lineStarting(out, "245 ");
        expect(f245).toBeDefined();
        expect(f245).toContain("$a Hello.");
    });

    it("omits 264 entirely when no place/repository/year is present", () => {
        const out = toMARC21Record(mapped());
        expect(lineStarting(out, "264 ")).toBeUndefined();
    });

    it("emits 264 with subfields in $a $b $c order when all are set", () => {
        const out = toMARC21Record(
            mapped({year: "2021"}),
            {place: "Amsterdam", repository: "IISG"},
        );
        const f264 = lineStarting(out, "264 ");
        expect(f264).toBeDefined();
        expect(f264).toContain("$a Amsterdam :");
        expect(f264).toContain("$b IISG,");
        expect(f264).toContain("$c 2021.");
    });

    it("emits 264 with only $c when only the year is known", () => {
        const out = toMARC21Record(mapped({year: "1999"}));
        const f264 = lineStarting(out, "264 ");
        expect(f264).toBeDefined();
        expect(f264).toContain("$c 1999.");
        expect(f264).not.toContain("$a");
        expect(f264).not.toContain("$b");
    });
});

describe("toMARC21Record — RDA fields", () => {
    it("emits 336/337/338 with content/media/carrier values", () => {
        const out = toMARC21Record(mapped());
        const f336 = lineStarting(out, "336 ");
        const f337 = lineStarting(out, "337 ");
        const f338 = lineStarting(out, "338 ");

        expect(f336).toContain("$a text");
        expect(f336).toContain("$b txt");
        expect(f336).toContain("$2 rdacontent");

        expect(f337).toContain("$a computer");
        expect(f337).toContain("$b c");
        expect(f337).toContain("$2 rdamedia");

        expect(f338).toContain("$a online resource");
        expect(f338).toContain("$b cr");
        expect(f338).toContain("$2 rdacarrier");
    });
});

describe("toMARC21Record — indicators", () => {
    it("renders blank indicators as '#'", () => {
        const out = toMARC21Record(mapped());
        const f040 = lineStarting(out, "040 ");
        expect(f040!.startsWith("040 ##")).toBe(true);
    });

    it("renders non-blank indicators verbatim", () => {
        const out = toMARC21Record(mapped({title: "T"}));
        const f245 = lineStarting(out, "245 ");
        expect(f245!.startsWith("245 00")).toBe(true);
    });
});
