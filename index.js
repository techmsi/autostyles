/* Autostyles - Main Module */
const prompt = require('./src/prompt');
const StyleGuide = require('./src/StyleGuide');
const { logMsg } = require('./src/helpers.js');

module.exports = async () => {
  const config = await prompt();
  const Guide = new StyleGuide(config);

  Guide.create();
  Guide.render();
};

process.on('exit', () => {
  logMsg('Your guide was successfully created.');
});
