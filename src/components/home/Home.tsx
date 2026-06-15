import classes from './Home.module.css';
import {useDatasets, usePanoptes} from "@knaw-huc/panoptes-react";
import arraImage from '../../assets/arra.jpeg';
import type {BypassDatasetConfiguration} from "../schema/types.ts";

export default function Home() {
    const { translateFn } = usePanoptes();
    const { data: datasets } = useDatasets<BypassDatasetConfiguration>();

    return (
        <div className={classes.page}>
            <header className={classes.header}>

            </header>

            <div className={classes.wrapper}>
                <div className={classes.hero}>
                    <div className={classes.heroCol}>
                        <h1 className={classes.pageTitle}>{translateFn && translateFn('iisg-bypass.pages.home.title')}</h1>
                        <p className={classes.intro}>{translateFn && translateFn('iisg-bypass.pages.home.description')}</p>
                        <div className={classes.cta}>
                            <a href="/datasets" className={classes.browseBtn}>
                                {translateFn && translateFn('iisg-bypass.pages.home.browseCollections')}
                            </a>
                        </div>
                    </div>

                    <dl className={classes.stats}>
                        <div className={classes.stat}>
                            <dt className={classes.statLabel}>
                                {translateFn && translateFn('iisg-bypass.pages.home.datasets')}
                            </dt>
                            <dd className={classes.statValue}>{datasets?.length ?? '—'}</dd>
                        </div>
                        {/*<div className={classes.stat}>
                            <dt className={classes.statLabel}>Items</dt>
                            <dd className={classes.statValue}>13.207</dd>
                        </div>*/}
                        <div className={classes.stat}>
                            <dt className={classes.statLabel}>
                                {translateFn && translateFn('iisg-bypass.pages.home.coverage')}
                            </dt>
                            <dd className={classes.statValue}>1800s–2020s</dd>
                        </div>
                    </dl>
                    <figure className={classes.heroImage}>
                        <img
                            src={arraImage}
                            alt="De ARRA, Automatische Relais Rekenmachine Amsterdam, in het Mathematisch Centrum"
                            className={classes.image}
                        />
                        <figcaption className={classes.caption}>
                            Meerendonk, Ben van, <em>De eerste Nederlandse programmeerbare computer : de ‘ARRA’, Automatische Relais Rekenmachine Amsterdam in het Mathematisch Centrum</em>, 1952
                        </figcaption>
                    </figure>
                </div>
            </div>
        </div>
    );

}