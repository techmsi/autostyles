const BLOCK_LEVEL_ELEMENTS = require('./blockLevelElements.js');

const isBlockLevel = selector => BLOCK_LEVEL_ELEMENTS.indexOf(selector) !== -1;
const mapDeclaration = ({ name, value }) => ({ property: name, value });
const getSelectorAndState = ([selector = '', state = null]) => ({
  selector,
  state
});

class CreatePage {
  constructor(page) {
    Object.assign(this, {
      ...page,
      rules: this.mapRules(page.rules)
    });
  }

  mapRules(rules) {
    return rules.map(({ selectors, declarations }, ruleIndex) => ({
      closed: ruleIndex === 0,
      blockLevel: isBlockLevel(selectors.toString()),
      declarations: declarations.map(mapDeclaration),
      ...getSelectorAndState(selectors.toString().split('.'))
    }));
  }
}

module.exports = CreatePage;
