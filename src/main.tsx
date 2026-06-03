import {createPanoptesRoot, PanoptesRouterProvider} from "@knaw-huc/panoptes-react";
import {panoptesBlocksLibrary} from "@knaw-huc/panoptes-react-blocks";
import ExportMetadataAction from "./components/actions/export-metadata/ExportMetadataAction.tsx";
import {createTranslate} from "./i18n/i18n.ts";
import Datasets from "./components/datasets/Datasets.tsx";
import {createRoute} from "@tanstack/react-router";
import Home from "./components/home/Home.tsx";
import About from "./components/about/About.tsx";
import Search from "./components/search/Search.tsx";
import '@knaw-huc/panoptes-react/style.css';
import '@knaw-huc/panoptes-react-blocks/style.css';
import './css/theme.css';
import './css/index.css';

const panoptesUrl = '$VITE_PANOPTES_URL';
const panoptesIsEmbedded = '$VITE_PANOPTES_IS_EMBEDDED';
const panoptesSearchPath = '$VITE_PANOPTES_SEARCH_PATH';
const panoptesDetailPath = '$VITE_PANOPTES_DETAIL_PATH';
const panoptesDataset = '$VITE_PANOPTES_DATASET';

const getVar = (envVariable: string): string | undefined =>
    envVariable.startsWith('$VITE_')
        ? (envVariable.slice(1) in import.meta.env ? import.meta.env[envVariable.slice(1)] : undefined)
        : envVariable;

panoptesBlocksLibrary.set('export-metadata-action-button', ExportMetadataAction);

const root = createPanoptesRoot(document.getElementById('root')!, {
    url: getVar(panoptesUrl),
    isEmbedded: getVar(panoptesIsEmbedded) === 'true',
    searchPath: getVar(panoptesSearchPath),
    detailPath: getVar(panoptesDetailPath),
    dataset: getVar(panoptesDataset),
    translateFn: createTranslate(),
    blocks: panoptesBlocksLibrary,
    navItems: [
        {
            "label": "iisg-bypass-pages-home",
            "href": "/",
            "labelKey": "iisg-bypass.pages.home"
        },
        {
            "label": "iisg-bypass-pages-search",
            "href": "/search",
            "labelKey": "iisg-bypass.pages.search"
        },
        {
            "label": "iisg-bypass-pages-datasets",
            "href": "/datasets",
            "labelKey": "iisg-bypass.pages.datasets"
        },
        {
            "label": "iisg-bypass-pages-about",
            "href": "/about",
            "labelKey": "iisg-bypass.pages.about"
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
    ],
    branding: 'Bypass'
});
root.render(<PanoptesRouterProvider/>);