'use strict';

const { bold } = require('kleur');
const path = require('path');
const defaultConfig = require('./config.json');
const sampleCss = '../example/my-css/blocks.css';
const chai = require('chai');
const chaiFs = require('chai-fs');
chai.use(chaiFs);

const StyleGuide = require('../src/StyleGuide');
const CreateGuide = require('../src/CreateGuide');
const CreatePage = require('../src/CreatePage');

let guide = null;
let createdPages = null;

describe('#StyleGuide', function() {
  it('Sets the config for new StyleGuide', function() {
    guide = new StyleGuide(defaultConfig);

    expect(guide).toBeDefined();
    expect(guide).toHaveProperty('config');
  });
  it('Creates new StyleGuide object', function() {
    guide = new StyleGuide(defaultConfig);
    const createdGuide = guide.create();

    expect(typeof createdGuide).toBe('object');
  });

  it('Renders a guide', function() {
    guide = new StyleGuide(defaultConfig);
    const createdGuide = guide.create();
    guide.render();

    chai.assert.pathExists(defaultConfig.output);
    chai.assert.isDirectory(defaultConfig.output);
    chai.assert.notIsEmptyDirectory(defaultConfig.output);
  });
});

describe('#CreateGuide', function() {
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

  it(`Rule contains 'blockLevel' property`, function() {
    const [firstRule] = createdPages.pages[0].rules;

    expect(firstRule).toHaveProperty('blockLevel');
  });

  it(`Parses css file: ${bold().blue(sampleCss)} to object`, function() {
    guide = new CreateGuide(defaultConfig);
    const absoluteFilePath = path.resolve(__dirname, sampleCss);
    const parsedCss = guide.getParsedCss(absoluteFilePath);

    expect(parsedCss).toHaveProperty('stylesheet');
  });
});
