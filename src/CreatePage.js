const BLOCK_LEVEL_ELEMENTS = require('./blockLevelElements.js');

const placeholderText = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo debitis ipsum qui nesciunt sapiente explicabo quod laboriosam sed maxime voluptas at amet ducimus eligendi, et labore dolore, nihil natus expedita.`;
const isBlockLevel = selector => BLOCK_LEVEL_ELEMENTS.indexOf(selector) !== -1;

const mapDeclaration = ({ name, value }) => ({ property: name, value });

const getSelectorAndState = ([selector = '', state = null]) => ({
  selector,
  state
});

class CreatePage {
  constructor(rules, title, pageNumber) {
    this.rules = this.mapRules(rules);
    this.title = title;
    this.pageNumber = pageNumber;
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
