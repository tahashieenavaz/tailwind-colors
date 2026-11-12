A lightweight, dependency-free collection of CSS color utilities based on the classic [Tailwind CSS](https://tailwindcss.com/) palette. Use Tailwind-style colors without installing the full framework.

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
<input class="accent-purple-500 caret-purple-700" type="checkbox">
<svg class="fill-blue-500 stroke-blue-800"><!-- ... --></svg>
```

Classes follow this pattern:

`{utility}-{color}-{shade}`

Available colors are `blue`, `gray`, `green`, `indigo`, `pink`, `purple`, `red`, and `yellow`. Each color includes shades from `50` through `900`.

## Utilities

| Category | Prefixes |
| --- | --- |
| Surfaces and text | `bg`, `text`, `decoration`, `outline` |
| Borders | `border`, `border-x`, `border-y`, `border-s`, `border-e`, `border-bs`, `border-be`, `border-t`, `border-r`, `border-b`, `border-l`, `divide` |
| Forms | `accent`, `caret`, `placeholder` |
| SVG | `fill`, `stroke` |
| Gradients | `from`, `via`, `to` |
| Shadows and rings | `shadow`, `inset-shadow`, `text-shadow`, `ring`, `inset-ring`, `ring-offset` |
| Scrollbars | `scrollbar-thumb`, `scrollbar-track` |

Gradient, shadow, and ring colors use Tailwind-compatible CSS custom properties and should be paired with the corresponding gradient or effect styles.

## Stylesheets

- `stylesheets/master.min.css` — all utilities, minified for production
- `stylesheets/master.css` — all utilities in readable form
- `stylesheets/{color}.css` — utilities for a single color palette

To load only one palette, replace `master.min.css` in the CDN URL with a color stylesheet such as `blue.css`.

## Development

Regenerate every stylesheet after changing the palette or utilities:

```sh
node scripts/generate-css.mjs
```
