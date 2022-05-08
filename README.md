<div align="center">
<h1>😃 Emoji  Picker</h1>
<p>A PWA to pick and copy emoji as text or image.</p>
</div>

[![code check](https://github.com/ygkn/emoji-picker/actions/workflows/code-check.yml/badge.svg)](https://github.com/ygkn/emoji-picker/actions/workflows/code-check.yml) [![deploy](https://github.com/ygkn/emoji-picker/actions/workflows/deploy.yml/badge.svg)](https://github.com/ygkn/emoji-picker/actions/workflows/deploy.yml)

Go to <https://ygkn.github.io/emoji-picker/>!

## Development

### Requirements

- **Node.js** - 16.x
- **Yarn** - 1.x

### Installation

This repository has some submodules. So you should use `--recursive` option when cloning or run `git submodule update --init --recursive` after cloning.

```sh
git clone --recursive https://github.com/ygkn/emoji-picker.git
# or run `git submodule update --init --recursive` after cloning
cd emoji-picker
```

Then, run `yarn install` to install dependencies.

### Run

```sh
yarn dev
```

see [package.json](package.json) for more details.
