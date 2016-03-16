# autostyles
NPM module for transforming css into automatic style guides.

## Install(Privately)

```bash
npm install --save-dev autostyles
```
### Run(Privately)
 * add these lines to your `package.json`
```json
"localModulesPath": "./node_modules/.bin",
"scripts": {
    "styleguide-prompt": "$npm_package_localModulesPath/buildguide myfolder --log true",
    "styleguide": "$npm_package_localModulesPath/buildguide styles --source ./css --output dist --log true"
}
```
THEN

```bash
npm run styleguide
```

OR

## Install(Globally)
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
buildguide styles -s ./css -o dist -l true
```
### Command Line (Long)
```bash
buildguide styles --source ./css --output dist --log true
```

#### Help
```bash
buildguide styles -h
```

#### Options
```bash

  Usage: styles [options]

  Options:

    -h, --help            output usage information
    -l --log [debug]      Turns debug on
    -s --source [source]  Source folder containing css files
    -o --output [output]  Destination folder final guide files

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
