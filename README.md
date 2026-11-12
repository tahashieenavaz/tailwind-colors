# Tailwind Colors

A lightweight, dependency-free collection of CSS color utilities inspired by the [Tailwind CSS](https://tailwindcss.com/) color palette. Use Tailwind-style text, background, and border colors without installing the full framework.

## Usage

Add the complete minified stylesheet to your HTML:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/tahashieenavaz/tailwind-colors@main/stylesheets/master.min.css"
>
```

Then apply the utility classes to your elements:

```html
<p class="text-indigo-700">Indigo text</p>
<div class="bg-blue-100 text-blue-900">Blue background</div>
```

Classes follow this pattern:

```text
{text|bg|border}-{color}-{shade}
```

Available colors are `blue`, `gray`, `green`, `indigo`, `pink`, `purple`, `red`, and `yellow`. Each color includes shades from `50` through `900`.

## Stylesheets

- `stylesheets/master.min.css` — all utilities, minified for production
- `stylesheets/master.css` — all utilities in readable form
- `stylesheets/{color}.css` — utilities for a single color palette

To load only one palette, replace `master.min.css` in the CDN URL with a color stylesheet such as `blue.css`.
