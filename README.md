# Personal Homepage

A static, single-page personal website for Jaideep Tibrewala — Fintech / AI Product Leader. It presents career history, education, certifications, writing and recommendations. There is no build step, framework or backend: just an `index.html`, a `style.css` and a small `script.js` of vanilla JavaScript.

## Project structure

```
personal-website/
├── index.html      # Page markup and content
├── style.css       # All styling (design tokens, layout, animations, media queries)
├── script.js       # Behaviour (scroll-reveal, typing, counters, etc.)
└── images/
    ├── profilepic.jpg     # Hero avatar
    ├── favicon.png
    ├── podcast-cover.jpg  # Podcast card cover (600px, resized from GCS cover.jpg)
    ├── chicagobooth.png   # Education logos
    ├── wisc.jpg
    └── dilbert.gif        # Closing comic strip
```

`index.html` links `style.css` in the `<head>` and `script.js` just before
`</body>`, both via relative paths.

## Running locally

Open `index.html` directly in a browser, or serve the folder to mimic production:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Page sections

Hero → About → Skills → Projects → Experience → Education → Certifications → Writing (podcast card + Medium articles) → Resources → Recommendations → Dilbert comic → Footer/Contact.

Each section in `<main>` is a `<section id="..." class="section">`; alternate
sections use `section-alt` for the tinted background.

## Design and behaviour notes

- **Theming:** colours, fonts, radii, shadows and max width are CSS custom
  properties in `:root` at the top of `style.css`. Change the accent colour
  (`--color-accent`, with `--color-accent-2` for gradients) there to re-theme
  the site.
- **Fonts:** Inter and Lora, loaded from Google Fonts.
- **Dark mode:** light is the default. A nav toggle sets `data-theme="dark"` on `<html>`, which overrides the colour tokens (`:root[data-theme="dark"]` in `style.css`). The choice is saved in `localStorage` and applied by a tiny inline script in `<head>` before first paint. The OS theme is not followed.
- **Animations:** scroll-reveal (via `IntersectionObserver`), aurora background
  glows, a gradient/shimmer headline, a hero typing effect, a spinning avatar
  ring, counting stats (`data-count`), a floating skill-tag cloud, a scroll
  progress bar and a back-to-top button. All are pure CSS/JS with no
  dependencies.
- **Reduced motion:** a `@media (prefers-reduced-motion: reduce)` block (plus a
  matching JS guard) disables the animations — reveals show immediately, the
  typing effect shows the first phrase, and counters jump to their final value.
- **Responsive:** a mobile-first layout with media queries. Grids collapse to a
  single column on phones, the hero stacks, type scales down and the nav trims
  trailing links at narrow widths. Verified down to 375px with no horizontal
  overflow.
- **Company logos:** Experience and Certifications use Google's favicon service
  (`https://www.google.com/s2/favicons?domain=<domain>`). They fail gracefully
  (`onerror` hides the image, leaving the initial-letter fallback), but note
  they require an internet connection.

## Updating content

| To change…            | Edit… (inside `index.html`)                                           |
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
- Open Graph `og:image` uses an absolute URL. Some link-preview scrapers need the full URL, which is already set for the CS web space (see below).

## Deployment

The site is fully static (`index.html`, `style.css`, `script.js` plus images)
and all asset paths are **relative**, so it runs under any path — including a
`~user` subdirectory — with no build step.

### Primary target: UW–Madison CS web space (`pages.cs.wisc.edu/~jaideep`)

Files are served from your CS home directory's public web folder (historically
`~/public_html`; some department setups use `~/web` — check which exists).

```sh
# From this project folder, copy the site into your CS web directory over SSH.
# Replace the host with your current CS login host if different.
scp -r index.html style.css script.js images \
    jaideep@best-linux.cs.wisc.edu:~/public_html/
```

Or, if you have AFS/SSH access and want to pull straight from GitHub on the CS
machine:

```sh
ssh jaideep@best-linux.cs.wisc.edu
cd ~/public_html                     # or ~/web
git clone https://github.com/jtibrewala/personal-website.git .
# later updates:
git pull
```

Then set readable permissions so the web server can serve the files:

```sh
chmod -R o+r ~/public_html
find ~/public_html -type d -exec chmod o+x {} \;
```

Visit **https://pages.cs.wisc.edu/~jaideep/** to confirm. The `og:url`,
`og:image`, and `twitter:image` meta tags are already set to this absolute URL
so link previews (LinkedIn, WhatsApp, Twitter) resolve the profile photo.

> If you ever move to a different base URL, update those three absolute URLs in
> the `<head>` of `index.html`.

### Alternative hosts

Any static host works — GitHub Pages, Netlify, Cloudflare Pages, or S3. Publish
the folder contents as-is with `index.html` at the root, and update the three
absolute meta-tag URLs in `index.html` to match the new domain.

### Local preview

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```
