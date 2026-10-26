# Blueprint plan — GT-Orbital-Initiative

Add a repo-level blueprint so future Devin sessions start with the app's toolchain:

- `initialize`: `sudo npm install -g npm@11` (npm 10.8.2 on the VM crashes with an
  arborist bug when installing this app's dep tree; npm@11 verified working)
- `maintenance`: `npm install` inside `ambasat-learning-platform/`
- `knowledge`: lint / test:run / build / typecheck / dev commands, all run inside
  `ambasat-learning-platform/`

Commands verified this session: `npm install`, `npm run typecheck`, `npm run lint`,
`npm run test:run` (13 pass), `npm run build`, `npm run dev` (serves, deep routes 200).
