# AGENTS.md — @shopgate-project/advent-calendar

Guidance for AI agents (and humans) working in this repository.

## What this is

A **Shopgate Connect PWA extension** (PWA 7, `theme-ios11`) that adds an advent calendar
page at **`/advent-calendar`**. Merchants link to it from widgets or deep links.

- Before 1 December the page shows a countdown (`ComingSoon`).
- From 1 to 24 December it shows a grid of 24 doors. Past days are greyed out, future
  days show a toast, today's door flips and opens a reward sheet (title, image, HTML
  content, optional button link).
- Everything (rewards per day, texts, images, styles, messages) comes from the
  extension's admin configuration — see `README.md` and `extension-config.json`.

Frontend-only — **no backend pipelines or steps**.

## Layout / structure

Extension files live at the **repo root**:

```
extension-config.json        # manifest: route portal (app.routes) + subscriber, admin configs
frontend/
  pages/AdventCalendar/      # route component for /advent-calendar
  components/Calendar/       # grid + Active/Expired/FutureDayCell
  components/FlippingCard/   # react-spring flip animation (today's door)
  components/Clickable/      # role="button" wrapper, keyboard accessible
  components/RewardSheet/    # SheetDrawer with the day's reward
  components/ComingSoon/     # countdown before December
  components/Snowfall/       # optional falling snow
  helpers.js                 # date logic (window.Engage.date overrides "now" for testing)
  subscriptions.js           # hides the tab bar on the calendar route
  package.json, .eslintrc
```

Portals for customisation: `ps.advent-calendar.reward-sheet` and
`ps.advent-calendar.reward-sheet.content`.

## Conventions

- **Scope / naming:** id `@shopgate-project/advent-calendar` (repo `ext-advent-calendar`).
  Branches map to Jira tickets; prefix commits with the ticket id (`CURB-1234 ...`).
  PR titles and descriptions in **English**.
- **Never commit** the SDK-generated `frontend/config.json` (gitignored).
- **Dependencies:** no `peerDependencies` — every live shop runs PWA ≥ 7.21 and the code
  only uses engage APIs available there. Add an open-ended `"@shopgate/engage": ">=x.y.z"`
  peer only if a change needs a newer engage version. Never add peers on libraries the
  PWA provides (`react`, `prop-types`, `glamor`, …): the theme deployment checks peers and
  fails on closed ranges.
- **Lint:** `cd frontend && npm install && npm run lint` (`@shopgate/eslint-config` 7,
  ESLint 8). JSON is imported as a default import with `.json` extension
  (`import config from '../../config.json'`).
- Styling uses **glamor** (deprecated since PWA 7.32 but still supported). Moving to
  `makeStyles` from `@shopgate/engage/styles` would require a `>=7.32.0` peer.
- Version is kept in sync in `extension-config.json`, `frontend/package.json` and
  `CHANGELOG.md`.

## Dev / verify

Attach the extension in the Shopgate Connect SDK workspace and start the frontend:

```sh
sgconnect extension attach @shopgate-project-advent-calendar
sgconnect frontend start --theme theme-ios11 --host 127.0.0.1 --port 8080
```

- Open `http://localhost:8080/advent-calendar`.
- To test December outside December, set `window.Engage = { date: new Date('2026-12-05T10:00:00') }`
  in the console and re-render the page (e.g. navigate away and back).
- Fill `calendar` in the extension config (or the local `frontend/config.json`) to get
  rewards; without entries every day shows "no reward".
- Stop dev servers gracefully with SIGINT (Ctrl+C).
