/* Autostyles - Main Module */
const CreateGuide = require('./src/CreateGuide');

class StyleGuide {
  constructor (config) {
    this.config = config;
  }
  create() {
    const Guide = new CreateGuide(this.config);
    return Guide;
  }
}
module.exports = StyleGuide;
