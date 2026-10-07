# Brother Estephan Trail

Responsive HTML, CSS and vanilla JavaScript website based on **Brother Estephan Trail — by Thomas Matar**, supplied by the project owner.

## Run
Open `public/index.html` directly, use VS Code Live Server, or run:

```sh
python3 -m http.server 8000 --directory public
```

Visit http://localhost:8000. No packages, keys, build step, or database required.

## Features
- Responsive layout and mobile navigation
- All 23 stops listed in the source, filterable by category
- Original trail map with an accessible native dialog image viewer
- Photo gallery, expandable restoration zones and walking checklist
- Reduced-motion support, keyboard controls and descriptive image alternatives

## Render
Create a Static Site from this repository. Build command: `echo 'Static site ready'`. Publish directory: `public`. `render.yaml` also supports the Blueprint workflow. Use the default branch and enable automatic deployments.

## Content and assets
Text, photographs and map are adapted/extracted from the supplied Thomas Matar presentation. Attribution is preserved on the website. No additional image license or third-party permission is asserted. The elevation is a range, not elevation gain. Zone times concern clearing work, not hike duration. The listed restoration work is a project description, not verified current completion. The map is a source overview, not georeferenced navigation. Village map link does not identify a verified trailhead. Checklist state lasts for the current page session. No booking, donation, or messaging backend is implied.

## Structure
`public/index.html`, `public/styles.css`, `public/script.js`, `public/assets/`; deployment configuration in `render.yaml`.
