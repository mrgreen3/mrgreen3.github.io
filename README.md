# Mr Green's Blog

Source for [mrgreen.blog](https://mrgreen.blog).

Built with [Zola](https://www.getzola.org/) 0.19.2 and the [terminimal](https://github.com/pawroman/zola-theme-terminimal) theme.

## CI / Deployment

GitHub Actions builds and deploys on every push to `main`.

Pipeline (`.github/workflows/deploy.yml`):
1. Checks out repo including submodules
2. Downloads Zola 0.19.2 and builds the site into `public/`
3. Deploys to GitHub Pages via `actions/deploy-pages`

## Local build

```sh
zola serve
```
