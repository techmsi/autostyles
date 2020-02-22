const { removeSync } = require('fs-extra');

const CreateGuide = require('./CreateGuide');
const RenderGuide = require('./RenderGuide');

class StyleGuide {
  constructor (config) {
    this.config = {
      ...config,
      templates: 'templates'
    };
  }

  create () {
    this.Guide = new CreateGuide(this.config);

    return this.Guide;
  }

  clean (folderToRemove) {
    removeSync(folderToRemove);
  }

  render () {
    this.clean(this.config.output);

    const { pages, menu } = this.Guide.getPages();
    this.RenderGuide = new RenderGuide({ config: this.config, pages, menu });

    this.RenderGuide.renderStartPage();
    this.RenderGuide.render();
  }
}

module.exports = StyleGuide;
