# hlin01.github.io

Personal website for Hender Lin: applied AI scientist working on agentic systems and applied research.

The site is a single-page Jekyll build using the [al-folio](https://github.com/alshedivat/al-folio) v1 runtime, with a small site-specific style layer. It is deployed to GitHub Pages from the `master` branch.

## Local development

Use the Bundler version recorded in `Gemfile.lock` (currently 4.0.6). If its files are missing from an existing installation, restore it with `gem pristine bundler --version 4.0.6`; for a new installation, use `gem install bundler --version 4.0.6`.

Install the site's gems locally so compiled dependencies do not depend on the global gem installation:

```bash
bundle config set --local path vendor/bundle
bundle install
bundle exec jekyll serve
```

Then open `http://127.0.0.1:4000/`.

## Checks

```bash
npm ci
npm run lint:prettier
bundle exec al-folio upgrade audit --no-fail
bundle exec jekyll build
```

The public content lives in `_pages/about.md`; site styling lives in `_sass/_site.scss`.
