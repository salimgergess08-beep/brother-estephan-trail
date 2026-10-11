# The Lira Diaries

A GEHS midterm website by Salim Gergess, exploring Lebanese monetary history through real banknotes and everyday purchasing power.

## Run and edit independently

Open `index.html` in a browser, or use VS Code Live Server. No installation, API key or database is required. The unbuilt version uses source-hosted images.

- `index.html`: page sections, sources and attribution.
- `styles.css`: colors, layout, mobile and presentation styles.
- `script.js`: the `eras` array contains all six chapter texts, images and story bubbles. Edit these objects to update a chapter. Change `selected=3` to choose the opening chapter.
- `build.py`: optional Python 3 build; copies the website to `dist` and caches source images where possible.

The Present button starts at chapter one. Use the next/previous buttons or left/right arrow keys. Escape exits presentation mode. Note enlargement also supports Escape.

## GitHub and Render

This project is isolated in the `lebanese-money` folder on the `gehs-lebanese-money` branch of `salimgergess08-beep/brother-estephan-trail`. The existing main branch and its original website are unaffected. The connector did not offer repository creation.

Render Static Site configuration:
- Branch: `gehs-lebanese-money`
- Build command: `python3 lebanese-money/build.py`
- Publish directory: `lebanese-money/dist`
- Automatic deploys: enabled. Commit changes to this branch to publish an update.

## Content integrity

The exhibition covers historical context before 1918 through a January 2023 purchasing-power snapshot. It is not a live economic dashboard. Banknote captions distinguish the story period from the actual issue shown. BDL catalogue thumbnails without a verified year are labeled representative designs.

The early-2000s LL1,000 manouche-and-juice example is explicitly illustrative and is not asserted as a documented national price. The basket calculator uses LL1,000 (upper end of a single bakery's reported pre-crisis LL750–1,000 range) and LL40,000 (midpoint of a reported Beirut LL30,000–50,000 range in January 2023). Neither is a national average. Outputs are whole items and leftover cash, with no exchange-rate extrapolation.

Sources and image credits are visible on the website. Modern currency photographs are educational references from BDL, not independently licensed commercial stock. Wikimedia image file pages provide their respective notices. The build caches photographs if the source is accessible; source URLs remain fallback locations. Google Fonts is optional: system fonts work without it.
