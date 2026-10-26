# Georgia Tech Orbital Initiative

Static website hosted with GitHub Pages.

Website: https://adithyavangapandu.github.io/GT-Orbital-Initiative/

## AmbaSat Learning Platform

`ambasat-learning-platform/` is a React + TypeScript + Vite app — the interactive
course for our AmbaSat-1 MK-II build program. It builds to `/ambasat/` on the same
Pages site; see `ambasat-learning-platform/README.md` for local development
(`npm install && npm run dev`).

## Update the website

Edit `index.html`, commit the changes, and push to `main`:

```sh
git add index.html
git commit -m "Update website"
git push origin main
```

GitHub Pages publishes the root of `main` automatically. The `.nojekyll` file
keeps the HTML from being processed by Jekyll.
