const { copySync } = require('fs-extra');

const path = require('path');
const { logMsg } = require('./helpers.js');

const RenderPage = require('./RenderPage');

class RenderGuide {
  constructor({ config, pages, menu }) {
    const appFolder = path.resolve(__dirname, 'app');

    this.folders = {
      appFolder,
      stylesFolder: path.join(config.output, 'css')
    };

    Object.assign(this, { config, pages, menu });
  }

  renderStartPage() {
    logMsg(`4a) Create index page with ${this.menu.length} links `, this.menu);
    this.startPage = this.renderPage({ menu: this.menu });

    return this.startPage;
  }

  copyFiles() {
    const { appFolder, stylesFolder } = this.folders;
    const { source, output } = this.config;

    // Copy css folder containing the project files
    copySync(appFolder, stylesFolder);
    copySync(source, stylesFolder);

    logMsg('5) Copy Files to ', output);
  }

  renderPage(page) {
    logMsg('4) Create html page for ', page.title);

    const renderedPage = new RenderPage({
      config: this.config,
      page
    });

    const { file } = renderedPage.render();
    return file;
  }

  render() {
    this.copyFiles();
    this.pages.forEach(page => {
      this.renderPage(page);
    });
  }
}

module.exports = RenderGuide;
