import { writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const palettes = {
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },
  green: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
  },
  yellow: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },
  indigo: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
  },
  red: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
  },
  purple: {
    50: "#f5f3ff",
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed",
    700: "#6d28d9",
    800: "#5b21b6",
    900: "#4c1d95",
  },
  pink: {
    50: "#fdf2f8",
    100: "#fce7f3",
    200: "#fbcfe8",
    300: "#f9a8d4",
    400: "#f472b6",
    500: "#ec4899",
    600: "#db2777",
    700: "#be185d",
    800: "#9d174d",
    900: "#831843",
  },
};

const propertyUtility = (prefix, property) => ({
  prefix,
  declarations: (hex) => [[property, hex]],
});

const variableUtility = (prefix, property) => ({
  prefix,
  declarations: (hex) => [[property, hex]],
});

const utilities = [
  propertyUtility("bg", "background-color"),
  propertyUtility("text", "color"),
  propertyUtility("decoration", "text-decoration-color"),
  propertyUtility("border", "border-color"),
  propertyUtility("border-x", "border-inline-color"),
  propertyUtility("border-y", "border-block-color"),
  propertyUtility("border-s", "border-inline-start-color"),
  propertyUtility("border-e", "border-inline-end-color"),
  propertyUtility("border-bs", "border-block-start-color"),
  propertyUtility("border-be", "border-block-end-color"),
  propertyUtility("border-t", "border-top-color"),
  propertyUtility("border-r", "border-right-color"),
  propertyUtility("border-b", "border-bottom-color"),
  propertyUtility("border-l", "border-left-color"),
  propertyUtility("outline", "outline-color"),
  propertyUtility("accent", "accent-color"),
  propertyUtility("caret", "caret-color"),
  propertyUtility("fill", "fill"),
  propertyUtility("stroke", "stroke"),
  {
    prefix: "placeholder",
    selector: (className) => `.${className}::placeholder`,
    declarations: (hex) => [["color", hex]],
  },
  {
    prefix: "divide",
    selector: (className) =>
      `.${className} > :not([hidden]) ~ :not([hidden])`,
    declarations: (hex) => [["border-color", hex]],
  },
  {
    prefix: "from",
    declarations: (hex) => [
      ["--tw-gradient-from", hex],
      [
        "--tw-gradient-stops",
        `var(--tw-gradient-from), var(--tw-gradient-to, ${transparent(hex)})`,
      ],
    ],
  },
  {
    prefix: "via",
    declarations: (hex) => [
      [
        "--tw-gradient-stops",
        `var(--tw-gradient-from), ${hex}, var(--tw-gradient-to, ${transparent(hex)})`,
      ],
    ],
  },
  variableUtility("to", "--tw-gradient-to"),
  variableUtility("shadow", "--tw-shadow-color"),
  variableUtility("inset-shadow", "--tw-inset-shadow-color"),
  variableUtility("text-shadow", "--tw-text-shadow-color"),
  variableUtility("ring", "--tw-ring-color"),
  variableUtility("inset-ring", "--tw-inset-ring-color"),
  variableUtility("ring-offset", "--tw-ring-offset-color"),
  {
    prefix: "scrollbar-thumb",
    declarations: (hex) => [
      ["--tw-scrollbar-thumb", hex],
      [
        "scrollbar-color",
        "var(--tw-scrollbar-thumb) var(--tw-scrollbar-track, transparent)",
      ],
    ],
  },
  {
    prefix: "scrollbar-track",
    declarations: (hex) => [
      ["--tw-scrollbar-track", hex],
      [
        "scrollbar-color",
        "var(--tw-scrollbar-thumb, transparent) var(--tw-scrollbar-track)",
      ],
    ],
  },
];

function transparent(hex) {
  const value = Number.parseInt(hex.slice(1), 16);
  const red = value >> 16;
  const green = (value >> 8) & 255;
  const blue = value & 255;

  return `rgba(${red}, ${green}, ${blue}, 0)`;
}

function createRules(colorNames) {
  return utilities.flatMap((utility) =>
    colorNames.flatMap((colorName) =>
      Object.entries(palettes[colorName]).map(([shade, hex]) => {
        const className = `${utility.prefix}-${colorName}-${shade}`;

        return {
          selector: utility.selector?.(className) ?? `.${className}`,
          declarations: utility.declarations(hex),
        };
      }),
    ),
  );
}

function format(rules) {
  return `${rules
    .map(
      ({ selector, declarations }) =>
        `${selector} {\n${declarations
          .map(([property, value]) => `  ${property}: ${value};`)
          .join("\n")}\n}`,
    )
    .join("\n")}\n`;
}

function minify(rules) {
  return `${rules
    .map(
      ({ selector, declarations }) =>
        `${selector}{${declarations
          .map(([property, value]) => `${property}:${value}`)
          .join(";")}}`,
    )
    .join("")}\n`;
}

for (const colorName of Object.keys(palettes)) {
  await writeFile(
    resolve(projectRoot, `stylesheets/${colorName}.css`),
    format(createRules([colorName])),
  );
}

const masterRules = createRules(Object.keys(palettes));

await Promise.all([
  writeFile(resolve(projectRoot, "stylesheets/master.css"), format(masterRules)),
  writeFile(
    resolve(projectRoot, "stylesheets/master.min.css"),
    minify(masterRules),
  ),
]);
