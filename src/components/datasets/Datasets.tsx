import classes from './Datasets.module.css';
import {type DatasetConfiguration, useDatasets, usePanoptes} from "@knaw-huc/panoptes-react";

interface BypassDatasetConfiguration extends DatasetConfiguration {
    //type: string;
    description: string;
    //item_count: string;
    //period: string;
}

export default function Datasets() {
    const { data: datasets } = useDatasets<BypassDatasetConfiguration>();
    const { translateFn } = usePanoptes();

    return (
        <div className={classes.index}>
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
    );
}