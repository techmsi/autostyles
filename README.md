# autostyles
NPM module for transforming css into automatic style guides.

##Install

```bash
npm install --save-dev autostyles
```
OR

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
buildguide styles -s "./css" -o "dist" -l
```
### Command Line (Long)
```bash
buildguide styles --source "./css" --output "dist" --log
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
