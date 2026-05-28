export interface MetadataRecord {
    filepath: string;
    contenttype?: string;
    date?: string;
    content?: string | null;
    metadata: Record<string, string | string[] | undefined>;
}

export type MaterialType = "document" | "image" | "audio" | "video" | "application";

export interface MappedRecord {
    title: string;
    authors: string[];
    date?: string;          // ISO date
    year?: string;
    url: string;
    language: string;       // ISO 639-2/B 3-letter, 'und' if unknown
    rda: { content: [string, string]; media: [string, string]; carrier: [string, string] };
    marcType: string;       // Leader/06
}

export interface ExchangeOptions {
    /** Repository / publisher name (RIS PB, MARC 264 $b). */
    repository?: string;
    /** Place of publication (MARC 264 $a). */
    place?: string;
    /** Cataloging agency MARC code (040 $a / $c). */
    orgCode?: string;
    /** Base URL prefix to turn filepath into a resolvable URL. */
    urlBase?: string;
}

export interface Subfield {
    code: string; value: string;
}

export interface DataField {
    tag: string;
    ind1: string;
    ind2: string;
    subfields: Subfield[];
}

export interface ControlField {
    tag: string;
    value: string;
}

export const RIS = 'ris';
export const MARC21 = 'marc21';
export const MARC21_ISO = 'marc21-iso';

export const MIME_TYPE_RIS = 'application/x-research-info-systems';
export const MIME_TYPE_MARC21 = 'application/marc';

// MARC21 ISO2709 delimiters
export const MARC21_ISO_FT = 0x1E; // field terminator
export const MARC21_ISO_RT = 0x1D; // record terminator
export const MARC21_ISO_SF = 0x1F; // subfield delimiter