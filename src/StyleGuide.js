const launchBrowser = require('opn');

const CreateGuide = require('./CreateGuide');
const RenderGuide = require('./RenderGuide');
const { logMsg } = require('./helpers.js');
let startPage = '';

class StyleGuide {
  constructor(config) {
    this.config = { ...config, templates: 'templates' };
  }

  create() {
    this.Guide = new CreateGuide(this.config);

    return this.Guide;
  }

  render() {
    const { pages, menu } = this.Guide.getPages();
    this.RenderGuide = new RenderGuide({ ...this.config, pages, menu });

    startPage = this.RenderGuide.renderStartPage();
    this.RenderGuide.render();
  }
}

process.on('exit', () => {
  logMsg('Your guide was successfully created.');
  launchBrowser(startPage, {
    app: ['google chrome', 'google-chrome', 'chrome']
  });
});

module.exports = StyleGuide;
