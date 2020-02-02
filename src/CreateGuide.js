/* Autostyles - Main Module */
const path = require('path');
const { readFileSync } = require('fs');
const css = require('mensch');
const walk = require('simple-walk');

const CreatePage = require('./CreatePage');
const { logConfig, logMsg, separator } = require('./helpers.js');

class CreateGuide {
  constructor(config) {
    separator('Autostyles Settings');
    logConfig(config);

    Object.assign(this, { config });
  }

  getParsedCss(source) {
    separator(source);
    logMsg('\n1) Get the file from ', source);
    const file = readFileSync(source, 'utf8');

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

      const { rules } = this.getParsedCss(file).stylesheet;

      logMsg('3) Retrieved # of Styles', rules.length);
      const page = new CreatePage({ rules, title, pageIndex });

      return page;
    });

    return { pages, menu };
  }
}

module.exports = CreateGuide;
