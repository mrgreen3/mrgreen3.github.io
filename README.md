# Mr Green's Blog

Source for [mrgreen.codeberg.page](https://mrgreen.codeberg.page).

Built with [Zola](https://www.getzola.org/) 0.22.1 and the [terminimal](https://github.com/pawroman/zola-theme-terminimal) theme.

## CI / Deployment

Woodpecker CI builds and deploys on every push to `main`.

Pipeline (`.woodpecker.yml`):
1. Builds the site with `zola build --output-dir public`
2. Force-pushes `public/` to the `pages` branch
3. Codeberg Pages serves from the `pages` branch

**Required secret:** `codeberg_token` — a Codeberg access token with write access to this repo. Set it in the Woodpecker repo settings under Secrets.

## Local build

```sh
zola serve
```

Output goes to `docs/` (set in `zola.toml`). The `docs/` directory is a leftover from the previous GitHub Pages setup and is not used by CI.
