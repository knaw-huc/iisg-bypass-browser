import type {ExchangeOptions, MappedRecord, MaterialType, MetadataRecord} from "../types.ts";
import {pick, parseAuthors, stripExt, basename, extractYear} from './exportHelpers.ts';

/**
 * Classify a record based on the detected material type. We use content-type to distinguish.
 *
 * @param contentType  the content type
 */
function classifyMaterial(contentType: string | undefined): {
    bucket: MaterialType;
    marcType: string;
    rda: MappedRecord["rda"];
} {
    const m = (contentType || "").toLowerCase();

    if (m.startsWith("image/")) {
        return {
            bucket: "image",
            marcType: "k",
            rda: {
                content: ["still image", "sti"],
                media: ["computer", "c"],
                carrier: ["online resource", "cr"]
            },
        };
    }
    if (m.startsWith("audio/")) {
        return {
            bucket: "audio",
            marcType: "i",
            rda: {
                content: ["spoken word", "spw"],
                media: ["computer", "c"],
                carrier: ["online resource", "cr"]
            },
        };
    }
    if (m.startsWith("video/")) {
        return {
            bucket: "video",
            marcType: "g",
            rda: {
                content: ["two-dimensional moving image", "tdi"],
                media: ["computer", "c"],
                carrier: ["online resource", "cr"]
            },
        };
    }

    const docMimes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.oasis.opendocument.text",
        "application/rtf",
        "application/epub+zip",
        "text/",
    ];
    if (docMimes.some((d) => m.startsWith(d))) {
        return {
            bucket: "document",
            marcType: "a",
            rda: {
                content: ["text", "txt"],
                media: ["computer", "c"],
                carrier: ["online resource", "cr"]
            },
        };
    }
    return {
        bucket: "application",
        marcType: "m",
        rda: {
            content: ["computer program", "cop"],
            media: ["computer", "c"],
            carrier: ["online resource", "cr"]
        },
    };
}

/**
 * Tries to map a Bypass record with extracted and indexed (Tika) properties
 * (ie., a Panoptes result item indexed in ElasticSearch) to an intermediate object we can use for export.
 *
 * This should actually be done by the backend. :)
 *
 * @param rec       the record data
 * @param opts      options, if any
 */
const mapBypassRecord = (rec: MetadataRecord, opts: ExchangeOptions = {}): MappedRecord => {
    const md = rec.metadata || {};
    const mime = rec.contenttype || pick(md, "Content-Type") || "application/octet-stream";
    const cls = classifyMaterial(mime);
    const title = pick(md, "title", "dc:title") || stripExt(basename(rec.filepath));
    const authors = parseAuthors(md);
    const date = rec.date || pick(md, "created", "dcterms:created", "meta:creation-date", "modified");
    const year = extractYear(date);
    const language = (pick(md, "language", "dc:language") || "und").slice(0, 3);

    const url = opts.urlBase
        ? opts.urlBase.replace(/\/+$/, "") + "/" + rec.filepath.replace(/^\/+/, "")
        : rec.filepath;

    return {
        title,
        authors,
        date,
        year,
        url,
        language,
        rda: cls.rda,
        marcType: cls.marcType,
    };
}

export default mapBypassRecord;
