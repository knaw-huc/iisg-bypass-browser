import classes from './Datasets.module.css';
import {usePanoptes} from "@knaw-huc/panoptes-react";

//interface BypassDatasetConfiguration extends DatasetConfiguration {
//    description: string;
//}

const datasets = [
    {
        "name": "05-07-10-mapping",
        "data_type": "elasticsearch",
        "data_configuration": {
            "id_property": "",
            "base_url": "",
            "description": "Test mapping 05-07-10",
            "s3_endpoint": "https://minio-api.bypass.dev.diginfra.org",
            "s3_key_id": "minio",
            "s3_secret": "miniominio"
        }
    },
    {
        "name": "05-07-11-mapping",
        "data_type": "elasticsearch",
        "data_configuration": {
            "id_property": "",
            "base_url": "",
            "description": "Test mapping 05-07-11"
        }
    },
    {
        "name": "05-07-12-mapping",
        "data_type": "elasticsearch",
        "data_configuration": {
            "id_property": "",
            "base_url": "",
            "description": "Test mapping 05-07-12",
            "s3_key_id": "key",
            "s3_secret": "secret",
            "s3_endpoint": "Endpoint"
        }
    },
    {
        "name": "papa-zuid",
        "data_type": "elasticsearch",
        "data_configuration": {
            "id_property": "",
            "base_url": "",
            "description": "Participating Artists Press Agency (PAPA) in Amsterdam stadsdeel Zuid",
            "s3_endpoint": "https://minio-api.bypass.dev.diginfra.org",
            "s3_key_id": "minio",
            "s3_secret": "miniominio"
        }
    },
    {
        "name": "pothoven",
        "data_type": "elasticsearch",
        "data_configuration": {
            "id_property": "",
            "base_url": "",
            "description": "Pieter Paul Pothoven"
        }
    },
    {
        "name": "papa-zuidoost",
        "data_type": "elasticsearch",
        "data_configuration": {
            "id_property": "",
            "base_url": "",
            "description": "Participating Artists Press Agency (PAPA) in Amsterdam stadsdeel Zuidoost"
        }
    },
    {
        "name": "fnv-vrouw",
        "data_type": "elasticsearch",
        "data_configuration": {
            "id_property": "",
            "base_url": "",
            "description": "FNV Vrouw"
        }
    },
    {
        "name": "bypass-all",
        "data_type": "elasticsearch",
        "data_configuration": {
            "id_property": "",
            "base_url": "",
            "description": "Bypass collections"
        }
    }
];

export default function Datasets() {
    const { translateFn } = usePanoptes();

    return (
        <div className={classes.page}>
            <header className={classes.header}>
                <p className={classes.eyebrow}>{translateFn && translateFn('iisg-bypass.pages.datasets.institution')}</p>
                <h1 className={classes.pageTitle}>{translateFn && translateFn('iisg-bypass.pages.datasets.title')}</h1>
            </header>

            <div className={classes.content}>
                <p className={classes.intro}>{translateFn && translateFn('iisg-bypass.pages.datasets.description')}</p>
                <ul className={classes.list}>
                {datasets.map(dataset => (
                    <li key={dataset.name} className={classes.card}>
                        <h2 className={classes.title}>{dataset.name}</h2>

                        <hr className={classes.divider} />

                        {dataset.data_configuration.description && (
                            <p className={classes.description}>{dataset.data_configuration.description}</p>
                        )}

                        {/*<div className={classes.meta}>
                            {dataset.data_configuration.item_count && (
                                <div className={classes.metaItem}>
                                    <span className={classes.metaLabel}>Items</span>
                                    <span className={classes.metaValue}>{dataset.data_configuration.item_count} Files</span>
                                </div>
                            )}
                            {dataset.data_configuration.period && (
                                <div className={classes.metaItem}>
                                    <span className={classes.metaLabel}>Period</span>
                                    <span className={classes.metaValue}>{dataset.data_configuration.period}</span>
                                </div>
                            )}
                        </div>*/}

                        <div className={classes.actions}>
                            <a href={`${dataset.name}/search`}
                               className={classes.btn}>
                                {translateFn && translateFn('iisg-bypass.searchDataset')}
                            </a>
                            {/*<a href={dataset.data_configuration.home_url}
                               className={classes.btn}>
                                {translateFn && translateFn('iisg-bypass.moreInfo')}
                            </a>*/}
                        </div>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    );
}