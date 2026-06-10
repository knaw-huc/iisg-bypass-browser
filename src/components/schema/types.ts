import type {DatasetConfiguration} from "@knaw-huc/panoptes-react";

export interface BypassDatasetConfiguration extends DatasetConfiguration {
    title: string;
    description: string;
}