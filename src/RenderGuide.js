const fs = require('fs-extra');
const path = require('path');
const handlebars = require('handlebars');
const helpers = require('./helpers.js');

const { logMsg } = helpers;

class RenderGuide {
  constructor (source, output, templates) {
    this.source = source;
    this.output = output;
    this.templates = templates;
  }
  copyFiles () {
    // Copy css folder with autostyles module css
    fs.copySync(path.resolve(__dirname, 'app'), path.join(this.output, 'css'));
    // Copy css folder containing the project files
    fs.copySync(this.source, path.join(this.output, 'css'));

    logMsg('5) Copy Files to ', this.output);
  }
  // Write out file to specified folder
  writeFiles (filename, content) {
    fs.outputFile(filename, content, err => {
      if (err) {
        console.log('Error: ', err);
        process.exit(1);
      }
    });

    logMsg('5a) Write File', filename);
  }
  _compileTemplate (filename) {
    const template = fs.readFileSync(`${__dirname}/${filename}`);

    logMsg('4b) Compile Template', filename);

    return handlebars.compile(template.toString('utf-8'));
  }
  // Output rendered file
  render (index, filename, data) {
    const file = filename.replace(this.templates, this.output).replace('.hbs', `${index}.html`);
    const template = this._compileTemplate(filename);
    const rendered = template(data);

    this.copyFiles();
    this.writeFiles(file, rendered);
    logMsg('6) Output the rendered file ', file);
    return file;
  }
}
module.exports = RenderGuide;
