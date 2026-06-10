import classes from './About.module.css';
import {usePanoptes} from "@knaw-huc/panoptes-react";

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

export default function About() {
    const { translateFn } = usePanoptes();

    return (
        <div className={classes.page}>
            <header className={classes.header} />

            <div className={classes.wrapper}>
                <div className={classes.content}>
                    <h1 className={classes.pageTitle}>{translateFn && translateFn('iisg-bypass.pages.about.title')}</h1>

                    <section className={classes.section}>
                        <h2 className={classes.sectionTitle}>{translateFn && translateFn('iisg-bypass.pages.about.background.title')}</h2>
                        <p>{translateFn && translateFn('iisg-bypass.pages.about.background.p1')}</p>
                        <p>{translateFn && translateFn('iisg-bypass.pages.about.background.p2')}</p>
                    </section>

                    <section className={classes.section}>
                        <h2 className={classes.sectionTitle}>{translateFn && translateFn('iisg-bypass.pages.about.approach.title')}</h2>
                        <p>{translateFn && translateFn('iisg-bypass.pages.about.approach.p1')}</p>
                        <p>{translateFn && translateFn('iisg-bypass.pages.about.approach.p2')}</p>
                    </section>

                    <section className={classes.section} aria-labelledby="about-collections-title">
                        <h2 id="about-collections-title" className={classes.sectionTitle}>{translateFn && translateFn('iisg-bypass.pages.about.collections.title')}</h2>
                        <p>{translateFn && translateFn('iisg-bypass.pages.about.collections.description')}</p>
                        <ul className={classes.datasetList}>
                            {datasets.map(dataset => (
                                <li key={dataset.name} className={classes.datasetItem}>{dataset.name}</li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
