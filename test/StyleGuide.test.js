'use strict';

const defaultConfig = require('./config.json');
const chai = require('chai');
const chaiFs = require('chai-fs');
chai.use(chaiFs);

const StyleGuide = require('../src/StyleGuide');

let guide = null;

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

  it('Renders a guide directory with associated files', function() {
    guide = new StyleGuide(defaultConfig);
    const createdGuide = guide.create();
    guide.render();

    chai.assert.pathExists(defaultConfig.output);
    chai.assert.isDirectory(defaultConfig.output);
    chai.assert.notIsEmptyDirectory(defaultConfig.output);
  });
});
