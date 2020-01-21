const fs = require('fs-extra');
const path = require('path');
// const handlebars = require('handlebars');
const mustache = require('mustache');
const { logMsg } = require('./helpers.js');

const commonScript = `<script type="text/javascript" src="css/autostyles.js"></script>`;
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
class RenderGuide {
  constructor({ source, output, templates = 'templates', pages, menu }) {
    this.config = { source, output, templates };
    this.startPageTemplate = path.join(templates, 'index.html');
    this.pageTemplate = path.join(templates, 'page.html');

    Object.assign(this, { pages, menu });
  }

  renderStartPage() {
    logMsg(`4a) Create index page with ${this.menu.length} links `, this.menu);
    this.startPage = this.renderPage('', this.startPageTemplate, {
      menu: this.menu
    });

    return this.startPage;
  }

  copyFiles() {
    const { source, output } = this.config;
    const appFolder = path.resolve(__dirname, 'app');
    // Copy css folder with autostyles module css
    fs.copySync(appFolder, path.join(output, 'css'));
    // Copy css folder containing the project files
    fs.copySync(source, path.join(output, 'css'));

    logMsg('5) Copy Files to ', output);
  }
  // Write out file to specified folder
  writeFiles(filename, content) {
    fs.outputFile(filename, content, err => {
      if (err) {
        console.log('Error: ', err);
        process.exit(1);
      }
    });

    logMsg('5a) Write File', filename);
  }

  getTemplate(templateFilename) {
    const templateFile = fs.readFileSync(`${__dirname}/${templateFilename}`);
    logMsg('4b) Get Template File', templateFilename);

    return templateFile.toString('utf-8');
  }

  renderPage(pageIndex, filename, rules) {
    const { templates, output } = this.config;
    const ext = path.extname(filename);

    const file = filename
      .replace(templates, output)
      .replace(ext, `${pageIndex}.html`);

    const template = this.getTemplate(filename);
    const rendered = mustache.render(template, rules, {
      header: commonHeadTemplate,
      scripts: commonScript
    });

    this.copyFiles();
    this.writeFiles(file, rendered);
    logMsg('6) Output the rendered file ', file);
    return file;
  }

  render() {
    this.pages.forEach(page => {
      logMsg('4) Create html page for ', page.title);
      this.renderPage(page.pageNumber, this.pageTemplate, page);
    });
  }
}
module.exports = RenderGuide;
