import {describe, expect, it} from "vitest";
import {
    basename,
    extractYear,
    padL,
    parseAuthors,
    pick,
    safeFilename,
    stripExt,
} from "./exportHelpers.ts";

describe("pick", () => {
    it("returns the first matching non-empty value", () => {
        expect(pick({a: "alpha", b: "beta"}, "a", "b")).toBe("alpha");
    });

    it("falls through empty/whitespace values to the next key", () => {
        expect(pick({a: "   ", b: "beta"}, "a", "b")).toBe("beta");
    });

    it("returns the first element of a string[]", () => {
        expect(pick({a: ["first", "second"]}, "a")).toBe("first");
    });

    it("trims the returned value", () => {
        expect(pick({a: "  hello  "}, "a")).toBe("hello");
    });

    it("returns undefined when no key matches", () => {
        expect(pick({a: "x"}, "b", "c")).toBeUndefined();
    });

    it("skips undefined values", () => {
        expect(pick({a: undefined, b: "found"}, "a", "b")).toBe("found");
    });
});

describe("basename", () => {
    it("extracts from a posix path", () => {
        expect(basename("/foo/bar/baz.txt")).toBe("baz.txt");
    });

    it("extracts from a windows path", () => {
        expect(basename("C:\\foo\\bar\\baz.txt")).toBe("baz.txt");
    });

    it("handles mixed separators", () => {
        expect(basename("foo/bar\\baz.txt")).toBe("baz.txt");
    });

    it("returns the input when no separator is present", () => {
        expect(basename("just-a-name.pdf")).toBe("just-a-name.pdf");
    });

    it("falls back to the full path when ending with a separator", () => {
        expect(basename("/foo/bar/")).toBe("/foo/bar/");
    });
});

describe("stripExt", () => {
    it("removes a common extension", () => {
        expect(stripExt("doc.pdf")).toBe("doc");
    });

    it("is case-insensitive", () => {
        expect(stripExt("IMAGE.JPG")).toBe("IMAGE");
    });

    it("does nothing when there's no extension", () => {
        expect(stripExt("README")).toBe("README");
    });

    it("only strips the final extension", () => {
        expect(stripExt("archive.tar.gz")).toBe("archive.tar");
    });
});

describe("padL", () => {
    it("left-pads with '0' by default", () => {
        expect(padL("7", 3)).toBe("007");
    });

    it("supports a custom pad character", () => {
        expect(padL("x", 4, "-")).toBe("---x");
    });

    it("returns the last n chars when input is too long", () => {
        expect(padL("abcdef", 3)).toBe("def");
    });

    it("returns the input unchanged when already at length", () => {
        expect(padL("abc", 3)).toBe("abc");
    });
});

describe("parseAuthors", () => {
    it("returns [] when no author field exists", () => {
        expect(parseAuthors({})).toEqual([]);
    });

    it("splits on semicolons", () => {
        expect(parseAuthors({creator: "Alice; Bob; Carol"})).toEqual(["Alice", "Bob", "Carol"]);
    });

    it("splits on ' and ' and ' & '", () => {
        expect(parseAuthors({creator: "Alice and Bob & Carol"})).toEqual(["Alice", "Bob", "Carol"]);
    });

    it("deduplicates repeated authors", () => {
        expect(parseAuthors({creator: "Alice; Bob; Alice"})).toEqual(["Alice", "Bob"]);
    });

    it("checks multiple author keys in order", () => {
        expect(parseAuthors({Author: "Alice"})).toEqual(["Alice"]);
        expect(parseAuthors({"meta:author": "Bob"})).toEqual(["Bob"]);
    });
});

describe("extractYear", () => {
    it("extracts a year embedded in an ISO date", () => {
        expect(extractYear("2021-04-12")).toBe("2021");
    });

    it("extracts a 4-digit year from free text", () => {
        expect(extractYear("Published in 1987 somewhere")).toBe("1987");
    });

    it("returns undefined when input is undefined", () => {
        expect(extractYear(undefined)).toBeUndefined();
    });

    it("returns undefined when no plausible year is present", () => {
        expect(extractYear("no year here")).toBeUndefined();
    });

    it("ignores years outside the 1500–2199 range", () => {
        expect(extractYear("year 1492")).toBeUndefined();
        expect(extractYear("year 2200")).toBeUndefined();
    });
});

describe("safeFilename", () => {
    it("uses the data title when present", () => {
        expect(safeFilename({title: "My File"})).toBe("My_File");
    });

    it("falls back to 'export' when title is missing or empty", () => {
        expect(safeFilename({})).toBe("export");
        expect(safeFilename({title: "   "})).toBe("export");
    });

    it("falls back when title is not a string", () => {
        expect(safeFilename({title: 42})).toBe("export");
    });

    it("strips unsafe characters", () => {
        expect(safeFilename({title: "a/b\\c:d*e?"})).toBe("a_b_c_d_e_");
    });

    it("truncates to 64 characters", () => {
        const longTitle = "a".repeat(200);
        expect(safeFilename({title: longTitle})).toHaveLength(64);
    });
});
