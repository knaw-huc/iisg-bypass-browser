import {createPanoptesRoot, PanoptesRouterProvider} from "@knaw-huc/panoptes-react";
import {panoptesBlocksLibrary} from "@knaw-huc/panoptes-react-blocks";
import {createTranslate} from "./i18n/i18n.ts";
import Datasets from "./components/datasets/Datasets.tsx";
import {createRoute} from "@tanstack/react-router";
import Home from "./components/home/Home.tsx";
import About from "./components/about/About.tsx";
import Search from "./components/search/Search.tsx";
import CollectionInfo from "./components/collection/CollectionInfo.tsx";
import '@knaw-huc/panoptes-react/style.css';
import '@knaw-huc/panoptes-react-blocks/style.css';
import './css/theme.css';
import './css/index.css';
import BypassResultCard from "./components/results/BypassResultCard.tsx";

const panoptesUrl = '$VITE_PANOPTES_URL';
const panoptesIsEmbedded = '$VITE_PANOPTES_IS_EMBEDDED';
const panoptesSearchPath = '$VITE_PANOPTES_SEARCH_PATH';
const panoptesDetailPath = '$VITE_PANOPTES_DETAIL_PATH';
const panoptesDataset = '$VITE_PANOPTES_DATASET';

const getVar = (envVariable: string): string | undefined =>
    envVariable.startsWith('$VITE_')
        ? (envVariable.slice(1) in import.meta.env ? import.meta.env[envVariable.slice(1)] : undefined)
        : envVariable;

const root = createPanoptesRoot(document.getElementById('root')!, {
    url: getVar(panoptesUrl),
    isEmbedded: getVar(panoptesIsEmbedded) === 'true',
    searchPath: getVar(panoptesSearchPath),
    detailPath: getVar(panoptesDetailPath),
    dataset: getVar(panoptesDataset),
    translateFn: createTranslate(),
    blocks: panoptesBlocksLibrary,
    theme: "iisg",
    navItems: [
        {
            "label": "iisg-bypass-pages-home",
            "href": "/",
            "labelKey": "iisg-bypass.pages.home"
        },
        /*{
            "label": "iisg-bypass-pages-search",
            "href": "/search",
            "labelKey": "iisg-bypass.pages.search"
        }*/
        {
            "label": "iisg-bypass-pages-datasets",
            "href": "/datasets",
            "labelKey": "iisg-bypass.pages.datasets"
        },
        {
            "label": "iisg-bypass-pages-about",
            "href": "/about",
            "labelKey": "iisg-bypass.pages.about"
        },
        {
            "label": "{IISG}",
            "href": "https://iisg.amsterdam"
        }
    ],
    routes: (rootRoute) => [
        createRoute({
            path: '/',
            getParentRoute: () => rootRoute,
            component: Home
        }),
        createRoute({
            path: '/datasets',
            getParentRoute: () => rootRoute,
            component: Datasets
        }),
        createRoute({
            path: '/about',
            getParentRoute: () => rootRoute,
            component: About
        }),
        createRoute({
            path: '/search',
            getParentRoute: () => rootRoute,
            component: Search
        }),
        createRoute({
            path: '$dataset/collection',
            getParentRoute: () => rootRoute,
            component: CollectionInfo
        }),
    ],
    branding: 'Bypass',
    resultCardRenderer: (result, link) => <BypassResultCard {...result} link={link}/>,
});
root.render(<PanoptesRouterProvider/>);