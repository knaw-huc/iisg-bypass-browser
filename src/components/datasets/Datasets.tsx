import classes from './Datasets.module.css';
import {useDatasets, usePanoptes} from "@knaw-huc/panoptes-react";
import type {BypassDatasetConfiguration} from "../schema/types.ts";

export default function Datasets() {
    const { data: datasets } = useDatasets<BypassDatasetConfiguration>();
    const { translateFn } = usePanoptes();

    return (
        <div className={classes.page}>
            <header className={classes.header}>
                <div className={classes.wrapper}>
                    <h1 className={classes.pageTitle}>{translateFn && translateFn('iisg-bypass.pages.datasets.title')}</h1>
                    <p className={classes.intro}>{translateFn && translateFn('iisg-bypass.pages.datasets.description')}</p>
                </div>
            </header>
            <div className={classes.content}>
                <div className={classes.wrapper}>

                    <ul className={classes.list}>
                        {datasets.map(dataset => (
                            <li key={dataset.name} className={classes.card}>
                                <h2 className={classes.title}>
                                    {dataset.data_configuration?.title ?? '-'}
                                </h2>

                                <hr className={classes.divider} />

                                <p className={classes.description}>{dataset.data_configuration?.description ?? '-'}</p>

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
        </div>
    );
}