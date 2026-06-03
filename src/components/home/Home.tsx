import classes from './Home.module.css';
import {usePanoptes} from "@knaw-huc/panoptes-react";

export default function Home() {

    const { translateFn } = usePanoptes();

    return (
        <div className={classes.card}>
            <div className={classes.main}>
                <div className={classes.body}>
                    <p className={classes.institution}>{translateFn && translateFn('iisg-bypass.pages.home.institution')}</p>
                    <h1 className={classes.title}>{translateFn && translateFn('iisg-bypass.pages.home.title')}</h1>
                    <p className={classes.description}>{translateFn && translateFn('iisg-bypass.pages.home.description')}</p>
                </div>
            </div>
        </div>
    );

}