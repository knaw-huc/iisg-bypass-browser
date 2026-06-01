import {describe, expect, it} from "vitest";
import mapBypassRecord from "./mapBypassRecord.ts";
import type {MetadataRecord} from "../types.ts";

const baseRecord = (overrides: Partial<MetadataRecord> = {}): MetadataRecord => ({
    filepath: "files/sample.pdf",
    contenttype: "application/pdf",
    metadata: {},
    ...overrides,
});

describe("mapBypassRecord — classification", () => {
    it("classifies image/* as a still image", () => {
        const m = mapBypassRecord(baseRecord({contenttype: "image/png"}));
        expect(m.marcType).toBe("k");
        expect(m.rda.content).toEqual(["still image", "sti"]);
    });

    it("classifies audio/* as spoken word", () => {
        const m = mapBypassRecord(baseRecord({contenttype: "audio/mpeg"}));
        expect(m.marcType).toBe("i");
        expect(m.rda.content).toEqual(["spoken word", "spw"]);
    });

    it("classifies video/* as two-dimensional moving image", () => {
        const m = mapBypassRecord(baseRecord({contenttype: "video/mp4"}));
        expect(m.marcType).toBe("g");
        expect(m.rda.content).toEqual(["two-dimensional moving image", "tdi"]);
    });

    it("classifies pdf as a document", () => {
        const m = mapBypassRecord(baseRecord({contenttype: "application/pdf"}));
        expect(m.marcType).toBe("a");
        expect(m.rda.content).toEqual(["text", "txt"]);
    });

    it("classifies msword as a document", () => {
        const m = mapBypassRecord(baseRecord({contenttype: "application/msword"}));
        expect(m.marcType).toBe("a");
    });

    it("classifies any text/* as a document", () => {
        const m = mapBypassRecord(baseRecord({contenttype: "text/plain"}));
        expect(m.marcType).toBe("a");
    });

    it("falls back to 'application' for unknown content types", () => {
        const m = mapBypassRecord(baseRecord({contenttype: "application/x-foo"}));
        expect(m.marcType).toBe("m");
        expect(m.rda.content).toEqual(["computer program", "cop"]);
    });

    it("falls back to the metadata Content-Type when rec.contenttype is missing", () => {
        const m = mapBypassRecord(baseRecord({
            contenttype: undefined,
            metadata: {"Content-Type": "image/jpeg"},
        }));
        expect(m.marcType).toBe("k");
    });
});

describe("mapBypassRecord — title", () => {
    it("uses metadata title when present", () => {
        const m = mapBypassRecord(baseRecord({metadata: {title: "Lovely Title"}}));
        expect(m.title).toBe("Lovely Title");
    });

    it("falls back to dc:title", () => {
        const m = mapBypassRecord(baseRecord({metadata: {"dc:title": "Dublin Title"}}));
        expect(m.title).toBe("Dublin Title");
    });

    it("falls back to the stripped basename of filepath", () => {
        const m = mapBypassRecord(baseRecord({filepath: "/a/b/file-name.pdf"}));
        expect(m.title).toBe("file-name");
    });
});

describe("mapBypassRecord — authors", () => {
    it("returns [] when no creator/author key is present", () => {
        const m = mapBypassRecord(baseRecord());
        expect(m.authors).toEqual([]);
    });

    it("parses creators into an array", () => {
        const m = mapBypassRecord(baseRecord({metadata: {creator: "Alice; Bob"}}));
        expect(m.authors).toEqual(["Alice", "Bob"]);
    });
});

describe("mapBypassRecord — date and year", () => {
    it("uses rec.date when set", () => {
        const m = mapBypassRecord(baseRecord({date: "2021-04-12"}));
        expect(m.date).toBe("2021-04-12");
        expect(m.year).toBe("2021");
    });

    it("falls back to metadata created/modified keys", () => {
        const m = mapBypassRecord(baseRecord({metadata: {"dcterms:created": "2019-01-01"}}));
        expect(m.date).toBe("2019-01-01");
        expect(m.year).toBe("2019");
    });

    it("leaves year undefined when no date is available", () => {
        const m = mapBypassRecord(baseRecord());
        expect(m.year).toBeUndefined();
    });
});

describe("mapBypassRecord — language", () => {
    it("defaults to 'und'", () => {
        const m = mapBypassRecord(baseRecord());
        expect(m.language).toBe("und");
    });

    it("picks language from metadata and truncates to 3 chars", () => {
        const m = mapBypassRecord(baseRecord({metadata: {language: "english"}}));
        expect(m.language).toBe("eng");
    });
});

describe("mapBypassRecord — url", () => {
    it("returns the filepath when no urlBase is provided", () => {
        const m = mapBypassRecord(baseRecord({filepath: "files/a.pdf"}));
        expect(m.url).toBe("files/a.pdf");
    });

    it("prepends urlBase, normalizing slashes", () => {
        const m = mapBypassRecord(baseRecord({filepath: "/files/a.pdf"}), {urlBase: "https://example.org/"});
        expect(m.url).toBe("https://example.org/files/a.pdf");
    });

    it("handles urlBase without trailing slash and filepath without leading slash", () => {
        const m = mapBypassRecord(baseRecord({filepath: "files/a.pdf"}), {urlBase: "https://example.org"});
        expect(m.url).toBe("https://example.org/files/a.pdf");
    });
});
