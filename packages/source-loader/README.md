# @storybook-addons/source-loader &middot; [![npm (scoped)](https://img.shields.io/npm/v/@storybook-addons/source-loader.svg)](https://www.npmjs.com/package/@storybook-addons/source-loader)

Webpack-loader for story sources at docs page.

Why not [native source-loader](https://github.com/storybookjs/storybook/tree/next/lib/source-loader)? Because them have [issue](https://github.com/storybookjs/storybook/issues/10827) with shorthand parameters.

## Install

```sh
npm i -D @storybook-addons/source-loader
```

## Usage

Add loader for webpack rules at before ts or babel loaders:

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx/,
        use: 'ts-loader',
      },
      {
        test: /\.examples\.tsx/,
        use: '@storybook-addons/source-loader',
      },
    ],
  },
}
```

### Options

A source-loader supports [prettier][prettier] for formatting source code:

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.examples\.tsx/,
        loader: '@storybook-addons/source-loader',
        options: {
          prettier: {
            printWidth: 100,
          },
        },
      },
    ],
  },
}
```

## License

Project is [MIT licensed](https://github.com/yarastqt/mercury/blob/master/LICENSE.md).

[prettier]: https://github.com/prettier/prettier
