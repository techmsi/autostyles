/* Autostyles - Main Module */
const path = require('path');
const fs = require('fs-extra');
const css = require('css');
const walk = require('simple-walk');

const CreatePage = require('./CreatePage');
const { logConfig, logMsg, separator } = require('./helpers.js');
const BLOCK_LEVEL_ELEMENTS = require('./blockLevelElements.js');

const isBlockLevel = selector => BLOCK_LEVEL_ELEMENTS.indexOf(selector) !== -1;

const mapDeclaration = ({ property, value }) => ({ property, value });

const getSelectorAndState = ([selector = '', state = null]) => ({
  selector,
  state
});

const mapRules = rules =>
  rules.map(({ selectors, declarations }, ruleIndex) => ({
    closed: ruleIndex === 0,
    blockLevel: isBlockLevel(selectors.toString()),
    declarations: declarations.map(mapDeclaration),
    ...getSelectorAndState(selectors.toString().split('.'))
  }));

class CreateGuide {
  constructor({ source, output, debug, templates = 'templates' }) {
    this.config = { source, output, debug, templates };

    separator('Autostyles Settings');
    logConfig(this.config);
  }

  getParsedCss(source) {
    separator(source);
    logMsg('\n1) Get the file from ', source);
    const file = fs.readFileSync(source, 'utf8');

    logMsg('2) Parsed Css', source);
    return file ? css.parse(file) : '';
  }

  getPages() {
    const { source } = this.config;
    const files = walk.match(source, /(\.css)$/gi) || [];
    const menu = [];

    const pages = files.map((file, pageIndex) => {
      const title = path.basename(file);
      menu.push({ title, pageIndex });

      const myCss = this.getParsedCss(file);
      const rules = mapRules(myCss.stylesheet.rules);
      logMsg('3) Retrieved # of Styles', rules.length);

      const page = new CreatePage(rules, title, pageIndex);

      return page;
    });

    return { pages, menu };
  }
}

module.exports = CreateGuide;
