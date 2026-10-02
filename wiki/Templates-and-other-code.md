# Templates and other code

I built this project myself for CS 351. I did not copy another student's store. I did use libraries, stock photos, and an AI coding assistant. This page lists what I used, what I changed, and what I wrote.

## How I split the work (about 80% me / 20% assistant)

I used **Cursor**, an AI-assisted editor ([https://cursor.com](https://cursor.com)) [7]. I treated it like a faster autocomplete / Stack Overflow, not like a contractor who ships the assignment. Roughly **80% of the design and the code decisions are mine**. The assistant's **~20%** was boilerplate, class-name lookup, and photo downloads.

### What I specified and then kept changing myself

- Store idea: gaming gear (mice, keyboards, headsets, mousepads, controllers), name **Loadout**, cyberpunk colors (dark background, cyan `#2ef2dc`, sale pink `#ff4b93`).
- The six views, hash URLs, and a single navbar (I threw out a second row of "page buttons" the assistant added because it looked like a fake extra nav).
- Product schema in `products.json` (25 items): prices, sale prices, stock, sizes, colors, featured / new flags. I edited names and copy until the photos matched the titles.
- Cart rules: cannot add without size and color; quantity cannot go below 1; quantity cannot go above stock across every line of the same product; after add, hide Add to cart and show Back to shop / View cart.
- Account rules: required login / password / email; optional address and phone with "if you fill one address field you fill them all."
- Home order: New arrivals above Featured.
- Custom CSS in `store.css` (I kept restyling until dark cards had light text).

### What the assistant actually did (~20%)

- Set up the Vite + React 19 folder (`package.json`, `vite.config.js`, `main.jsx` mount). I would have run `npm create vite` anyway; this saved the typing.
- Suggested Bootstrap 5 class names I then kept or deleted: `navbar-expand-lg`, `collapse`, `is-invalid`, `invalid-feedback`, `pagination`, `col-lg-4`.
- Looked up Unsplash image IDs and wrote the `curl` commands to save JPEGs into `public/images/`. I still rejected photos that did not match the product (office keyboards, living-room shots) and swapped them.
- Pointed at CSS contrast bugs after I screenshotted unreadable text.
- Helped format this wiki and the IEEE reference list below. I wrote the architecture, the validation notes, and this disclosure from the assignment prompt.

I did **not** paste a finished GitHub repo and rename it. I did **not** use ChatGPT in a browser as the only author. Saying "I used ChatGPT" would be incomplete, which is why this page is specific about files and about what I rejected.

## Libraries and third-party code

I installed these with npm. I did not vendor extra UI kits.

| Package | Version in `package.json` | What I used it for | What I wrote on top |
| --- | --- | --- | --- |
| React / React DOM [1] | 19.x | Components, `useState`, `useEffect`, props | Every component in `src/` |
| Bootstrap [2] | 5.3.x | CSS grid, navbar collapse, forms, pagination | `store.css` overrides; I did not use a Bootstrap theme or a copied example store |
| Vite [3] | 8.x | Dev server and `npm run build` | `index.html` title, favicon, no router plugin |

Bootstrap JS is imported once in `main.jsx` (`bootstrap.bundle.min.js`) so the hamburger works. I did not copy Bootstrap's documentation HTML examples verbatim. The navbar markup follows the official collapse pattern (toggler + `data-bs-target`), which is the documented way to use that component [2].

There is **no** React Router, Redux, or CSS framework besides Bootstrap plus my file.

## Images

Product photos are from **Unsplash** and are used under the Unsplash License [4]. They are stored locally in `public/images/` (not hotlinked). I resized via the Unsplash `w=1000` image URL when downloading. I do not claim those photographs as my own work.

The favicon (`public/favicon.svg`) is a small hex mark used in the navbar.

## Validators

HTML and CSS were checked with the W3C Nu Html Checker [5] and the W3C CSS Validation Service [6]. See the [Validation](Validation) wiki page.

## References (IEEE)

[1] Meta Platforms, Inc., "React," v19, 2025. [Online]. Available: https://react.dev/

[2] M. Otto, J. Thornton, and Bootstrap contributors, "Bootstrap 5," v5.3, 2024. [Online]. Available: https://getbootstrap.com/docs/5.3/getting-started/introduction/

[3] VoidZero Inc. and Vite contributors, "Vite," v8, 2025. [Online]. Available: https://vite.dev/

[4] Unsplash, Inc., "Unsplash License," 2025. [Online]. Available: https://unsplash.com/license

[5] World Wide Web Consortium (W3C), "Markup Validation Service (Nu Html Checker)," 2025. [Online]. Available: https://validator.w3.org/nu/

[6] World Wide Web Consortium (W3C), "CSS Validation Service," 2025. [Online]. Available: https://jigsaw.w3.org/css-validator/

[7] Anysphere, Inc., "Cursor: The AI Code Editor," 2026. [Online]. Available: https://cursor.com/

[8] W3Schools, "HTML Validator" and "CSS Validator," 2025. [Online]. Available: https://www.w3schools.com/html/html_validate.asp and https://www.w3schools.com/css/css_validator.asp
