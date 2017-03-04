'use strict';

const chalk = require('chalk');
const mocha = require('mocha');
const chai = require('chai');
chai.use(require('chai-fs'));

const describe = mocha.describe;
const it = mocha.it;
const expect = chai.expect;
const assert = chai.assert;
const { bold: { blue, red } } = chalk;
const path = require('path');
const config = require('./config.json');
const sampleCss = '../example/my-css/blocks.css';
const autostyles = require('../index');
const CreateGuide = require('../src/CreateGuide');
let guide = {};

describe('#CreateGuide', function () {
  before(function() {
    guide = new CreateGuide(config);
  })

  it('Test(CreateGuide) - create new guide object', function (done) {
    expect(guide).to.be.ok;
    assert.typeOf(guide, 'object', 'Guide is an object.');

    done();
  });

  it(`Test - ${config.output} directory`, function (done) {
    const folderPath = config.output;

    assert.pathExists(folderPath);
    assert.extname('dist/index.html', '.html');
    assert.isDirectory(folderPath);
    assert.notIsEmptyDirectory(folderPath);

    done();
  });

});

describe('#StyleGuide', function () {
  it('Test(StyleGuides) - create new guide object', function (done) {
    const styles = new autostyles(config);
    const guide = styles.create();

    expect(styles).to.be.ok;
    done();
  });

  it(`Test - converts css file: ${blue(sampleCss)} to object`, function (done) {
    console.log(`StyleGuides - parsed`);
    const styles = new autostyles(config);
    const guide = styles.create();

    // const css = guide.getParsedCss(sampleCss);
    // assert.typeOf(css, 'object', 'Parsed Css is an object.');
    done();
  });
});
