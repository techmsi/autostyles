'use strict';

const { bold } = require('../src/helpers');
const path = require('path');
const defaultConfig = require('./config.json');
const sampleCss = '../example/my-css/blocks.css';
const fullSampleCSSFilePath = path.resolve(__dirname, sampleCss);

const CreateGuide = require('../src/CreateGuide');
const CreatePage = require('../src/CreatePage');

let guide = null;
let createdPages = null;
let firstRule = null;

describe('#CreateGuide Pages', function() {
  beforeEach(() => {
    guide = new CreateGuide(defaultConfig);
    createdPages = guide.getPages();
  });

  it(`Gets pages & menu`, function() {
    expect(createdPages).toHaveProperty('pages');
    expect(createdPages).toHaveProperty('menu');
  });

  it(`Page is an instance of CreatePage`, function() {
    const [firstPage] = createdPages.pages;

    expect(firstPage).toBeInstanceOf(CreatePage);
    expect(firstPage).toHaveProperty('rules');
  });

  it(`Parses css file: ${bold.blue(sampleCss)} to object`, function() {
    guide = new CreateGuide(defaultConfig);
    const parsedCss = guide.getParsedCss(fullSampleCSSFilePath);

    expect(parsedCss).toHaveProperty('stylesheet');
    expect(parsedCss.stylesheet).toHaveProperty('rules');
  });
});

describe('#CreateGuide Rules', function() {
  beforeEach(() => {
    guide = new CreateGuide(defaultConfig);
    createdPages = guide.getPages();
    firstRule = createdPages.pages[0].rules[0];
  });

  it(`Rule contains 'declarations' property`, function() {
    expect(firstRule).toHaveProperty('declarations');
  });

  it(`Declaration contains ${bold.yellow('property')} property`, function() {
    const [firstDeclaration] = firstRule.declarations;

    expect(firstDeclaration.property).toBeDefined();
    expect(firstDeclaration).toHaveProperty('property');
  });

  it(`Declaration contains ${bold.yellow('value')} property`, function() {
    const [firstDeclaration] = firstRule.declarations;

    expect(firstDeclaration.value).toBeDefined();
    expect(firstDeclaration).toHaveProperty('value');
  });
});
