# autostyles
NPM module for transforming css into automatic style guides.

[![js-semistandard-style](https://cdn.rawgit.com/flet/semistandard/master/badge.svg)](https://github.com/Flet/semistandard)

## Install (Privately)

```bash
npm install --save-dev autostyles
```
### Run (Privately)
 * add these lines to your package.json

```json
"localModulesPath": "./node_modules/.bin",
"scripts": {
  "styleguide": "$npm_package_localModulesPath/buildguide",
}
```

THEN

```bash
npm run styleguide --log myfolder --source ./css --output dist
```

OR

## Install (Globally)
```bash
npm install autostyles -g
```

## Usage
### Command Line (No options)
```bash
buildguide myfolder
```
You will be prompted for the source & desitnation folders. This information will be used to generate your style guide.

### Command Line (Short)
```bash
buildguide -s ./css -o dist -l styles myfolder
```
### Command Line (Long)
```bash
buildguide --source ./css --output dist --log styles myfolder
```

#### Help
```bash
buildguide styles -h
```

#### Options
```bash
Usage: buildguide [options] [command] <dir>

  Commands:
    styles      Create style guide.
    help [cmd]  display help for [cmd]

  Options:
    -h, --help            output usage information
    -l --log              Turns debug on
    -s --source <source>  Source folder containing css files
    -o --output <output>  Destination folder final guide files
```

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
