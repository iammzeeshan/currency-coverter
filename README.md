# Currency Converter

A React currency converter built with Vite.

## Live Demo

[Play it here](https://iammzeeshan.github.io/currency-converter/) <!-- enable via Settings → Pages → Source: main branch, if not already done -->

## Run locally

```sh
npm install
npm run dev
```

Open the localhost URL printed by Vite (usually `http://localhost:5173`). Do not open the root `index.html` directly or with VS Code Live Preview: it is a Vite source entry and needs Vite to transform the React modules.

To preview a production build locally:

```sh
npm run build
npm run preview
```

## GitHub Pages

The GitHub Actions workflow builds the app and publishes the generated `dist` folder whenever a commit is pushed to `main`. In the repository's **Settings → Pages**, set **Build and deployment → Source** to **GitHub Actions**. The Vite base path is configured for this repository's `currency-coverter` URL.
