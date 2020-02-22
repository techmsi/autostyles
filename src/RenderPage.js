const { readFileSync } = require('fs');
const { outputFile } = require('fs-extra');

const path = require('path');
const mustache = require('mustache');
const { logMsg } = require('./helpers.js');

const commonScript =
  '<script type="text/javascript" src="css/autostyles.js"></script>';
const commonHeadTemplate = `
  <meta charset="UTF-8">
  <title>Automatic Style Guide {{#title}}- {{title}} {{/title}}</title>
  <meta author="Sophie" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="google" content="notranslate">
  <meta http-equiv="Content-Language" content="en">
  <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="css/autostyles.css">
`;

class RenderPage {
  constructor ({ config, page }) {
    this.pageTemplate = path.join(config.templates, 'page.html');
    this.startPageTemplate = path.join(config.templates, 'index.html');

    this.pageParts = {
      header: commonHeadTemplate,
      scripts: commonScript
    };

    Object.assign(this, { config, page });
  }

  writePageFile (filename, content) {
    outputFile(filename, content, err => {
      if (err) {
        console.log('Error: ', err);
        process.exit(1);
      }
    });

    logMsg('5) Write File', filename);
  }

  getTemplate (templateFilename) {
    const templateFile = readFileSync(`${__dirname}/${templateFilename}`);
    logMsg('4b) Get Template File', templateFilename);

    return templateFile.toString('utf-8');
  }

  render () {
    const { templates, output } = this.config;
    const { pageIndex = '', menu = null } = this.page;
    const { pageTemplate, startPageTemplate, pageParts } = this;

    const data = this.page;
    const chosenTemplate = menu ? startPageTemplate : pageTemplate;

    const ext = path.extname(chosenTemplate);

    const file = chosenTemplate
      .replace(templates, output)
      .replace(ext, `${pageIndex}.html`);

    const rendered = mustache.render(
      this.getTemplate(chosenTemplate),
      data,
      pageParts
    );

    this.writePageFile(file, rendered);
    logMsg('6) Output the rendered file ', file);

    return { file };
  }
}

module.exports = RenderPage;
