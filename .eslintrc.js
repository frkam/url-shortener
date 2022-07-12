const { configure, presets } = require("eslint-kit")

module.exports = configure({
  root: __dirname,
  presets: [
    presets.node(),
    presets.prettier({
      semi: false,
      singleQuote: false,
      tabWidth: 2,
      quoteProps: "consistent",
      endOfLine: "auto",
    }),
    presets.typescript(),
    presets.react({
      version: "detect",
      newJSXTransform: true,
    }),
  ],
  extend: {},
})
