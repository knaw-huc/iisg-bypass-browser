# IISG Bypass Browser

A React-based front-end for browsing IISG Bypass collections via the [Panoptes](https://github.com/knaw-huc/panoptes) search platform. Built with Vite and served as a Docker container behind nginx.

## Prerequisites

- Node.js 20+
- Docker (for containerised deployment)

## Local development

1. Copy the example environment and adjust as needed:

   ```sh
   cp .env.example.example .env.example   # or edit .env.example directly
   ```

2. Install dependencies and start the dev server:

   ```sh
   npm install
   npm run dev
   ```

The app expects a running Panoptes back-end. Point `VITE_PANOPTES_URL` at it (see [Environment variables](#environment-variables)).

## Build

```sh
npm run build   # outputs to dist/
npm run preview # locally preview the production build
```

## Environment variables

Variables are embedded in the JS bundle at build time **and** can be overridden at container start-up via `envsubst` (see [Docker](#docker)).

| Variable | Description | Example |
|---|---|----|
| `VITE_PANOPTES_URL` | Base URL of the Panoptes API |
| `VITE_PANOPTES_IS_EMBEDDED` | Run in embedded mode (`true`/`false`) |
| `VITE_PANOPTES_DATASET` | Dataset identifier |   
| `VITE_PANOPTES_SEARCH_PATH` | Path template for the search page | `/$dataset/search` |
| `VITE_PANOPTES_DETAIL_PATH` | Path template for the detail page | `/$dataset/details/$id` |
| `VITE_PANOPTES_THEME` | UI theme name   |

## Docker

The multi-stage `Dockerfile` builds the app and serves it with nginx on port 80. All `VITE_*` environment variables can be passed at runtime — `conf/entrypoint.sh` runs `envsubst` over the built JS assets before starting nginx, so no rebuild is required when configuration changes.

```sh
# Build and run locally
docker build -t iisg-bypass-browser .
docker run -p 8080:80 \
  -e VITE_PANOPTES_URL=https://panoptes.example.com \
  -e VITE_PANOPTES_DATASET=politieke-tijdschriften \
  iisg-bypass-browser
```

### docker buildx bake

A `docker-bake.hcl` file is provided for multi-platform builds targeting the `registry.diginfra.net/tsd` registry:

```sh
docker buildx bake
# Override defaults:
TAG=1.2.3 docker buildx bake
REGISTRY=my.registry.example.com TAG=main docker buildx bake
```

## Internationalisation

UI strings are managed with [i18next](https://www.i18next.com/). Translation files live in `src/i18n/locales/<lang>/common.json`. English (`en`) and Dutch (`nl`) are included by default.

## Linting

```sh
npm run lint
```
