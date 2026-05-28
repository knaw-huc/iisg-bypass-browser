import type {MetadataRecord} from "../types.ts";

const first = (v: string | string[] | undefined): string | undefined => {
    if (v === undefined) {
        return undefined;
    }
    return Array.isArray(v) ? v[0] : v;
};

const pick = (md: MetadataRecord["metadata"], ...keys: string[]): string | undefined => {
    for (const k of keys) {
        const v = first(md[k]);
        if (v && v.trim()) {
            return v.trim();
        }
    }
    return undefined;
};

const padL = (s: string, n: number, c = "0"): string => (c.repeat(n) + s).slice(-n);

const basename = (p: string): string => {
    const parts = p.split(/[\\/]/);
    return parts[parts.length - 1] || p;
};

const stripExt = (name: string): string => name.replace(/\.[a-z0-9]+$/i, "");

const extractYear = (s: string | undefined): string | undefined => {
    if (!s) {
        return undefined;
    }
    const m = s.match(/\b(1[5-9]\d{2}|20\d{2}|21\d{2})\b/);
    return m ? m[1] : undefined;
};

function parseAuthors(md: MetadataRecord["metadata"]): string[] {
    const raw = pick(md, "creator", "dc:creator", "Author", "author", "meta:author");
    if (!raw) {
        return [];
    }
    const parts = raw
        .split(/\s*(?:;| and | & )\s*/)
        .map((s) => s.trim())
        .filter(Boolean);
    return Array.from(new Set(parts));
}

const downloadFile = (filename: string, content: BlobPart, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

const safeFilename = (data: Record<string, unknown>): string => {
    const title = typeof data.title === 'string' && data.title.trim() ? data.title : 'export';
    return title.replace(/[^a-z0-9-_]+/gi, '_').slice(0, 64);
}

export { pick, basename, stripExt, padL, parseAuthors, extractYear, downloadFile, safeFilename };

