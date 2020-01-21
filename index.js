/* Autostyles - Main Module */
const prompt = require('./src/prompt');
const StyleGuide = require('./src/StyleGuide');

module.exports = async () => {
  const config = await prompt();
  const Guide = new StyleGuide(config);

  Guide.create();
  Guide.render();
};
