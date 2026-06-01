import {describe, expect, it} from "vitest";
import type {MappedRecord} from "../types.ts";
import toRIS from "./exportRIS.ts";

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

describe("toRIS", () => {
    it("always emits TY GEN and an ER terminator", () => {
        const out = toRIS(mapped());
        expect(out).toContain("TY  - GEN\n");
        expect(out.endsWith("ER  - \n")).toBe(true);
    });

    it("emits TI with the title", () => {
        const out = toRIS(mapped({title: "Hello World"}));
        expect(out).toContain("TI  - Hello World\n");
    });

    it("emits UR with the url", () => {
        const out = toRIS(mapped({url: "https://example.org/doc.pdf"}));
        expect(out).toContain("UR  - https://example.org/doc.pdf\n");
    });

    it("emits PB only when opts.repository is provided", () => {
        expect(toRIS(mapped())).not.toContain("PB  -");
        const out = toRIS(mapped(), {repository: "ACME Library"});
        expect(out).toContain("PB  - ACME Library\n");
    });

    it("formats DA as YYYY/MM/DD from an ISO date", () => {
        const out = toRIS(mapped({date: "2021-04-12"}));
        expect(out).toContain("DA  - 2021/04/12\n");
    });

    it("truncates DA to the date portion of an ISO datetime", () => {
        const out = toRIS(mapped({date: "2021-04-12T08:30:00Z"}));
        expect(out).toContain("DA  - 2021/04/12\n");
    });

    it("omits DA when no date is present", () => {
        expect(toRIS(mapped())).not.toContain("DA  -");
    });

    it("emits one AU line per author", () => {
        const out = toRIS(mapped({authors: ["Alice", "Bob"]}));
        expect(out).toContain("AU  - Alice\n");
        expect(out).toContain("AU  - Bob\n");
    });

    it("skips empty/whitespace fields", () => {
        const out = toRIS(mapped({title: "   "}));
        expect(out).not.toContain("TI  -");
    });
});
