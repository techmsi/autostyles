/* Autostyles - Main Module */
const { readFileSync } = require('fs');
const css = require('mensch');
const walk = require('directory-tree');

const CreatePage = require('./CreatePage');
const { logConfig, logMsg, separator } = require('./helpers.js');
const getFilePaths = ({ children }) =>
  children.map(({ name, path }, pageIndex) => ({
    title: name,
    pagePath: path,
    pageIndex
  }));

class CreateGuide {
  constructor (config) {
    separator('Autostyles Settings');
    logConfig(config);

    const allCssFiles = walk(config.source, { extensions: /\.css/ }) || [];
    const cssFiles = getFilePaths(allCssFiles);

    Object.assign(this, { config, cssFiles, menu: cssFiles });
  }

  getParsedCss (source) {
    separator(source);
    logMsg('\n1) Get the file from ', source);
    const file = readFileSync(source, 'utf8');

    logMsg('2) Parsed Css', source);
    return file ? css.parse(file) : '';
  }

  getPages () {
    const { cssFiles } = this;

    const pages = cssFiles.map(({ title, pagePath, pageIndex }) => {
      const { rules } = this.getParsedCss(pagePath).stylesheet;

      logMsg('3) Retrieved # of Styles', rules.length);
      const page = new CreatePage({ rules, title, pageIndex });

      return page;
    });

    return { pages, menu: this.menu };
  }
}

module.exports = CreateGuide;
