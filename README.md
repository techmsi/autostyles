# autostyles

NPM module for transforming css into automatic style guides.

[![js-semistandard-style](https://cdn.rawgit.com/flet/semistandard/master/badge.svg)](https://github.com/Flet/semistandard)

## Install (Privately)

```bash
npm install --save-dev autostyles
```

### Run (Privately)

- add these lines to your package.json

```json
"localModulesPath": "./node_modules/.bin",
"scripts": {
  "styleguide": "$npm_package_localModulesPath/buildguide",
}
```

THEN

```bash
npm run styleguide
```

OR

## Install (Globally)

```bash
npm install autostyles -g
```

## Usage (Globally)

```bash
buildguide
```

You will be prompted for the source & desitnation folders. This information will be used to generate your style guide.

- ✔ Turn debug on to get log info? **yes**
- ✔ Source folder **./my-css** `Source folder containing css files`
- ✔ Destination folder **dist** `Destination folder final guide files`

# Examples

The css files located inside the `/css` folder

```
  /css
    |-- sample.css
    |-- sample2.css
```

are transformed into

```
/dist
  |-- index.html
  |-- page0.html
  |-- page1.html
  |-- css
        |-- autostyles.css
        |-- autostyles.js
        |-- sample.css
        |-- sample2.css
```
