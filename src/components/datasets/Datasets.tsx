import classes from './Datasets.module.css';
import {type DatasetConfiguration, useDatasets, usePanoptes} from "@knaw-huc/panoptes-react";

interface BypassDatasetConfiguration extends DatasetConfiguration {
    title: string;
    description: string;
}

export default function Datasets() {
    const { data: datasets } = useDatasets<BypassDatasetConfiguration>();
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
                        <h2 className={classes.title}>
                            {dataset.data_configuration?.title ?? '-'}
                        </h2>

                        <hr className={classes.divider} />

                        {dataset.data_configuration.description && (
                            <p className={classes.description}>{dataset.data_configuration?.description ?? '-'}</p>
                        )}

                        <div className={classes.actions}>
                            <a href={`${dataset.name}/search`}
                               className={classes.btn}>
                                {translateFn && translateFn('iisg-bypass.searchDataset')}
                            </a>
                        </div>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    );
}