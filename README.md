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

The site is fully static (HTML, CSS, images, a few lines of inline JS) and all
asset paths are **relative**, so it runs under any path — including a `~user`
subdirectory — with no build step.

### Primary target: UW–Madison CS web space (`pages.cs.wisc.edu/~jaideep`)

Files are served from your CS home directory's public web folder (historically
`~/public_html`; some department setups use `~/web` — check which exists).

```sh
# From this project folder, copy the site into your CS web directory over SSH.
# Replace the host with your current CS login host if different.
scp -r index.html style.css images \
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
