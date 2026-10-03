# Personal Homepage

A static, single-page personal website for Jaideep Tibrewala — Fintech Product Leader. It presents career history, education, certifications, writing and recommendations. There is no build step, framework or backend: just HTML, CSS and a few lines of vanilla JavaScript.

## Project structure

```
personal-homepage/
├── index.html      # All page content and the inline JS
├── style.css       # All styling (design tokens, layout, components, responsive rules)
├── images/
│   ├── profilepic.jpg     # Hero avatar
│   ├── favicon.png
│   ├── chicagobooth.png   # Education logos
│   ├── wisc.jpg
│   └── dilbert.gif        # Closing comic strip
└── .claude/        # Claude Code settings for this project
```

## Running locally

Open `index.html` directly in a browser, or serve the folder to mimic production:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Page sections

Hero → About → Experience → Education → Certifications → Writing → Recommendations → Dilbert comic → Footer/Contact.

Each section in `<main>` is a `<section id="..." class="section collapsible-section">`; alternate sections use `section-alt` for the tinted background.

## Design and behaviour notes

- **Theming:** colours, fonts, radii, shadows and max width are CSS custom properties in `:root` at the top of `style.css`. Change the accent colour (`--color-accent`) there to re-theme the site.
- **Fonts:** Inter and Lora, loaded from Google Fonts.
- **Collapsible sections:** a small inline script at the bottom of `index.html` toggles `data-open` on a section when its title is clicked. This only applies at viewport widths of 768px or less; on desktop all sections are always expanded. Initial state is set with `data-open="true|false"` in the HTML.
- **Company logos:** Experience and Certifications use `https://logo.clearbit.com/<domain>` images. They fail gracefully (`onerror` hides the image, leaving the initial letter or fallback text), but note that these require an internet connection and Clearbit's logo service may be unreliable.
- **Responsive:** layout adapts for mobile via media queries in `style.css`.

## Updating content

| To change…            | Edit…                                                                 |
| --------------------- | --------------------------------------------------------------------- |
| A job                 | Add or edit a `.timeline-item` block in `#experience`                 |
| Education             | `.edu-card` blocks in `#education`                                    |
| A certification       | `.cert-card` blocks in `#certifications`                              |
| An article            | `.article-card` links in `#writing`                                   |
| A recommendation      | `.testimonial-card` blocks in `#recommendations`                      |
| Contact/social links  | Both the hero (`.hero-social`) and the footer (`.footer-right`)       |

Contact details and social links appear in two places (hero and footer), so update both.

## Notes

- The nav hides trailing links at narrower widths via `.nav-links li:nth-child(n+N)` rules in `style.css`; adjust these if you add or reorder nav items.
- Open Graph `og:image` uses a relative path. Some link-preview scrapers need an absolute URL, so change it to the full URL once the site is deployed.

## Deployment

Because the site is fully static, it can be hosted anywhere that serves files — GitHub Pages, Netlify, Cloudflare Pages, S3, or any web server. Publish the folder contents as-is, with `index.html` at the root.
