import type {DatasetConfiguration} from "@knaw-huc/panoptes-react";

export interface BypassDatasetConfiguration extends DatasetConfiguration {
    title: string;
    description: string;
}

export interface BypassDatasetMetadata {
    collection_no: string;
    title: string;
    creator: string;
    date: string;
    extent: string;
    language: string;
    abstract: string;
    scopecontent: string;
    access: string;
    use_restrict: string;
    digital_availability: string;
    repository: string;
    permanent_link: string;
    oai_datestamp: string;
    source_url: string;
}

// The dataset list carries a top-level `metadata` block alongside
// `data_configuration`, which the package's Dataset type doesn't include.
export interface BypassDataset {
    name: string;
    data_type: string;
    data_configuration: BypassDatasetConfiguration;
    metadata: BypassDatasetMetadata;
}

// Carry the selected dataset metadata through navigation state so the
// collection screen can render it without re-fetching.
declare module '@tanstack/history' {
    interface HistoryState {
        datasetMetadata?: BypassDatasetMetadata;
    }
}
