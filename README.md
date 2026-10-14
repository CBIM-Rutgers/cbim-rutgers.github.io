# CBIM Rutgers Website

Source for the website of the **Center for Computational Biomedicine Imaging and Modeling (CBIM)** at Rutgers University, led by Prof. Dimitris Metaxas.

Live site: <https://cbim-rutgers.github.io/>

Built with [Next.js](https://nextjs.org) (App Router, static export) and [Tailwind CSS](https://tailwindcss.com), and deployed to GitHub Pages by GitHub Actions.

## Pages

| Route           | Content                                              |
| --------------- | ---------------------------------------------------- |
| `/`             | Lab overview, director profile, news and events      |
| `/members`      | Faculty, students, postdocs and alumni               |
| `/joining-us`   | Open positions, research directions, how to apply    |

## Local development

Requires Node.js 20+.

```bash
npm ci          # install dependencies
npm run dev     # start dev server at http://localhost:3000
npm run build   # production static export to ./out
npm run lint    # lint
```

To preview the production build locally:

```bash
npm run build
npx serve out
```

## Updating content

Most content is plain data, so no React knowledge is needed for routine updates.

| What                         | Where                                     |
| ---------------------------- | ----------------------------------------- |
| News and events              | `src/utils/mock-data/upcoming-events.ts`  |
| Current members              | `src/utils/mock-data/members.ts`          |
| Member photos                | `public/images/members/`                  |
| Alumni and postdocs          | `cbim_alumni.csv`                         |
| Director profile             | `src/utils/mock-data/pi.ts`               |
| Open positions / Joining Us  | `src/utils/mock-data/joining-us.ts`       |
| Publications (currently off) | `_data/cbim_papers.yaml` (see `scripts/citations/README_CBIM_CRAWL.md`) |

### Moving a member to alumni

Add a row to `cbim_alumni.csv`. Anyone listed in that file is automatically hidden from the current-members list. Rows with the position `Postdoc` appear in the Postdoc section; all other rows appear under Alumni.

### Publications page

The Publications page is currently turned off. Next.js ignores folders whose names start with `_`, so to turn it back on, rename `src/app/_publications` to `src/app/publications` and restore the entry in `src/utils/consts/routes.ts`.

## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds the static site and publishes `out/` to GitHub Pages. See [docs/DEPLOY.md](docs/DEPLOY.md) for setup and troubleshooting.
