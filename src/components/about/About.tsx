import classes from './About.module.css';
import {type DatasetConfiguration, useDatasets, usePanoptes} from "@knaw-huc/panoptes-react";

interface BypassDatasetConfiguration extends DatasetConfiguration {
    title: string;
    description: string;
}

export default function About() {
    const { data: datasets } = useDatasets<BypassDatasetConfiguration>();
    const { translateFn } = usePanoptes();

    return (
        <div className={classes.page}>
            <header className={classes.header}>
                <p className={classes.eyebrow}>{translateFn && translateFn('iisg-bypass.pages.about.institution')}</p>
                <h1 className={classes.title}>{translateFn && translateFn('iisg-bypass.pages.about.title')}</h1>
            </header>

            <div className={classes.content}>
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

                <section className={classes.section}>
                    <h2 className={classes.sectionTitle}>{translateFn && translateFn('iisg-bypass.pages.about.collections.title')}</h2>
                    <p>{translateFn && translateFn('iisg-bypass.pages.about.collections.description')}</p>
                    <ul className={classes.datasetList}>
                        {datasets.map(dataset => (
                            <li key={dataset.name} className={classes.datasetItem}>
                                {dataset.data_configuration?.title ?? '-'}
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
}
