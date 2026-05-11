# Mr Green's Blog

Source for [mrgreen.codeberg.page](https://mrgreen.codeberg.page).

Built with [Zola](https://www.getzola.org/) 0.22.1 and the [terminimal](https://github.com/pawroman/zola-theme-terminimal) theme.

## CI / Deployment

Forgejo Actions builds and deploys on every push to `main`.

Pipeline (`.forgejo/workflows/deploy.yml`):
1. Checks out repo including submodules
2. Downloads Zola 0.22.1 and builds the site into `public/`
3. Force-pushes `public/` to the `pages` branch
4. Codeberg Pages serves from the `pages` branch

No extra secrets needed — uses the built-in `GITHUB_TOKEN`.

## Local build

```sh
zola serve
```

Output goes to `docs/` (set in `zola.toml`). The `docs/` directory is a leftover from the previous GitHub Pages setup and is not used by CI.
