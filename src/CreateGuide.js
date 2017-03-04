/* Autostyles - Main Module */

const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');
const css = require('css');
const walk = require('simple-walk');
const opn = require('opn');

let startPage = '';
const helpers = require('./helpers.js');
const RenderGuide = require('./RenderGuide.js');
const BLOCK_LEVEL_ELEMENTS = require('./blockLevelElements.js');

const { underline: { yellow }, bold: { blue, green } } = chalk;
const { log, logMsg, separator } = helpers;

class CreateGuide {
  // Accepts in arguments of files
  constructor ({ source, output, debug }) {
    this.templates = 'templates';
    this.source = source;
    this.output = output;
    this.debug = debug;

    separator('Autostyles Settings');
    log(`
    ${blue('Debug:')} ${yellow(debug)}
    ${blue('Output Folder:')} ${yellow(output)}
    ${blue('Source Folder:')} ${yellow(source)}
    `);

    this.renderGuide = new RenderGuide(this.source, this.output, this.templates);

    this.setFiles();
  }
  // Map the data to the format we would like
  _mapData (rules) {
    return rules.map(o => {
      const { selectors, declarations } = o;

      let selector = selectors.toString();
      const blockLevel = BLOCK_LEVEL_ELEMENTS.indexOf(selector) !== -1;
      let state = null;

      if (selector.indexOf('.') !== -1) {
        const value = selector.split('.');

        state = value.pop();
        selector = value.pop();
      }

      return Object.assign({},
      { selector, blockLevel, state },
      { declarations: [...declarations.map(({ property, value }) => ({ property, value }))] });
    });
  }

  setTempTemplates () {
    fs.copySync(path.resolve(__dirname, this.templates), path.join(process.cwd(), `_${this.templates}`));
  }

  // Read the css file
  getFile (source) {
    separator(source);
    logMsg('\n1) Get the file from ', source);

    return fs.readFileSync(source, 'utf8');
  }

  // Parse the CSS file
  getParsedCss (source) {
    const file = this.getFile(source);

    logMsg('2) Parsed Css', source);
    return file ? css.parse(file) : '';
  }

  getData (data) {
    const styles = this._mapData(data);

    logMsg('3) Retrieved # of Styles', styles.length);

    return styles;
  }

  setFiles () {
    const files = walk.match(this.source, /(\.css)$/gi) || [];

    const menu = files.map((file, fileIndex) => {
      const title = path.basename(file);
      const myCss = this.getParsedCss(file);
      const rules = this.getData(myCss.stylesheet.rules);
      const templateFilename = path.join(this.templates, 'page.hbs');

      logMsg('4) Create html page for ', title);
      this.renderGuide.render(fileIndex, templateFilename, { title, rules });

      return title;
    });

    // Render first page
    logMsg('4a) Create index page with links ', menu);
    startPage = this.renderGuide.render('', path.join(this.templates, 'index.hbs'), { menu });
  }
}

process.on('exit', () => {
  log(green('Your guide was successfully created.'));
  // Launch browser with guide
  opn(startPage, { app: ['google chrome', 'google-chrome', 'chrome'] });
});

module.exports = CreateGuide;
