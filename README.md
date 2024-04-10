# prettier-plugin-tailwindcss-extra

`prettier-plugin-tailwindcss-extra` is a [prettier](https://prettier.io) plugin that uses [prettier-plugin-tailwindcss](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier) to enforce the [recommended Tailwind class order](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted) for a set of extra languages that are not yet supported by prettier. It applies no formatting to the code other than reordering the Tailwind classes found within any HTML class attributes.

This plugin is intended to be an interim solution. Languages will be dropped whenever official prettier plugins are developed.

## Extra Languages

- [x] [templ](https://templ.guide)

## Word of Caution

Although this plugin is very simple and should work as intended, I have only tested it on my own small projects. Consider yourself a beta tester. Please commit your project files to version control before running prettier with this plugin installed, at least for the first time.

## Installation

Install to project:

```sh
# npm
npm install -D prettier prettier-plugin-tailwindcss prettier-plugin-tailwindcss-extra
# pnpm
pnpm add -D prettier prettier-plugin-tailwindcss prettier-plugin-tailwindcss-extra
```

Then add to prettier plugins in `.prettierrc.json` or similar:

```json
{
  "plugins": [
    "prettier-plugin-tailwindcss-extra",
    "prettier-plugin-tailwindcss"
  ]
}
```

> **Note:** Make sure `prettier-plugin-tailwindcss` is included after `prettier-plugin-tailwindcss-extra` in the plugins array.

## Parser Configuration

You can configure prettier to use the parser from this plugin on your filetype of choice. Take a look at the docs for [setting the parser option in your prettier config](https://prettier.io/docs/en/configuration#setting-the-parserdocsenoptionshtmlparser-option) for more information. Here is an example config using the `tailwindcss-extra` parser from this plugin to format files with the extension `.ext`:

```json
{
  "plugins": [
    "prettier-plugin-tailwindcss-extra",
    "prettier-plugin-tailwindcss"
  ],
  "overrides": [
    {
      "files": "*.ext",
      "options": { "parser": "tailwindcss-extra" }
    }
  ]
}
```

## Development Commands

This project uses [pnpm](https://pnpm.io/installation) for package management.

```sh
# Install dependencies
pnpm install
# Build
pnpm build
# Run tests
pnpm test
# Run tests in watch mode
pnpm test:watch
# Lint
pnpm lint
# Format
pnpm fmt
# Check formatting
pnpm fmt:check
```
