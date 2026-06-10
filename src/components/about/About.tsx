import classes from './About.module.css';
import {useDatasets, usePanoptes} from "@knaw-huc/panoptes-react";
import type {BypassDatasetConfiguration} from "../schema/types.ts";

export default function About() {
    const { data: datasets } = useDatasets<BypassDatasetConfiguration>();
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
                                <li key={dataset.name} className={classes.datasetItem}>
                                    <span className={classes.datasetTitle}>{dataset.data_configuration?.title ?? '-'}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
