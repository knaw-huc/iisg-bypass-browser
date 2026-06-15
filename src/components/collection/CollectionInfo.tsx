import {useLocation, useParams} from "@tanstack/react-router";
import classes from './CollectionInfo.module.css';
import {useDatasets, usePanoptes} from "@knaw-huc/panoptes-react";
import type {BypassDataset, BypassDatasetConfiguration} from "../schema/types.ts";

export default function CollectionInfo() {
    const {dataset} = useParams({strict: false});
    const stateMetadata = useLocation({select: (location) => location.state.datasetMetadata});
    const {data} = useDatasets<BypassDatasetConfiguration>();
    const datasets = data as BypassDataset[];
    const {translateFn} = usePanoptes();
    const datasetMetadata =
        stateMetadata ?? datasets.find(d => d.name === dataset)?.metadata;

    return (
        <div className={classes.page}>
            <div className={classes.wrapper}>
                <div className={classes.tabsRow}>
                    <h1 className={classes.pageTitle}>{translateFn && translateFn('iisg-bypass.pages.aboutDataset')}</h1>
                    <nav className={classes.tabs}>
                        <a href={`/${dataset}/search`} className={classes.tab}>
                            {translateFn && translateFn('iisg-bypass.collectionInfo.tab.searchResult')}
                        </a>
                        <span className={`${classes.tab} ${classes.tabActive}`}>
                            {translateFn && translateFn('iisg-bypass.collectionInfo.tab.dataset')}
                        </span>
                    </nav>
                </div>

                <div className={classes.card}>
                    <h2 className={classes.cardTitle}>{datasetMetadata?.title}</h2>
                    <hr className={classes.divider}/>

                    <div className={classes.grid}>
                        <div className={classes.full}>
                            <p className={classes.label}>
                                {translateFn && translateFn('iisg-bypass.collectionInfo.archiveCreator')}
                            </p>
                            <p className={classes.value}>
                                {datasetMetadata?.creator ?? '—'}
                            </p>
                        </div>

                        <div className={classes.full}>
                            <p className={classes.label}>
                                {translateFn && translateFn('iisg-bypass.collectionInfo.summary')}
                            </p>
                            <p className={classes.value}>
                                {datasetMetadata?.abstract ?? '—'}
                            </p>
                        </div>

                        <div>
                            <p className={classes.label}>
                                {translateFn && translateFn('iisg-bypass.collectionInfo.period')}
                            </p>
                            <p className={classes.value}>
                                {datasetMetadata?.date ?? '—'}
                            </p>
                        </div>

                        <div>
                            <p className={classes.label}>
                                {translateFn && translateFn('iisg-bypass.collectionInfo.size')}
                            </p>

                            <div className={classes.value}>
                                <ul className={classes.extent}>
                                    <li key={'extent'}>{datasetMetadata?.extent ?? '—'}</li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <p className={classes.label}>
                                {translateFn && translateFn('iisg-bypass.collectionInfo.access')}
                            </p>
                            <p className={classes.value}>
                                {datasetMetadata?.access ?? '—'}
                            </p>
                        </div>

                        <div>
                            <p className={classes.label}>
                                {translateFn && translateFn('iisg-bypass.collectionInfo.digitalAvailability')}
                            </p>
                            <p className={classes.value}>
                                {datasetMetadata?.digital_availability ?? '—'}
                            </p>
                        </div>

                        <div>
                            <p className={classes.label}>
                                {translateFn && translateFn('iisg-bypass.collectionInfo.languageOfMaterial')}
                            </p>
                            <p className={classes.value}>
                                {datasetMetadata?.language ?? '—'}
                            </p>
                        </div>

                        <div>
                            <p className={classes.label}>
                                {translateFn && translateFn('iisg-bypass.collectionInfo.collectionNumber')}
                            </p>
                            <p className={classes.value}>
                                {datasetMetadata?.collection_no ?? '—'}
                            </p>
                        </div>

                        <div>
                            <p className={classes.label}>
                                {translateFn && translateFn('iisg-bypass.collectionInfo.storageLocation')}
                            </p>
                            <p className={classes.value}>
                                {datasetMetadata?.repository ?? '—'}
                            </p>
                        </div>

                        <div>
                            <p className={classes.label}>
                                {translateFn && translateFn('iisg-bypass.collectionInfo.permanentLink')}
                            </p>
                            <p className={classes.value}>
                                <a className={classes.permanentLink}
                                   href={datasetMetadata?.permanent_link}>
                                    {datasetMetadata?.permanent_link}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
