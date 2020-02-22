/* Autostyles - Main Module */
const prompt = require('./prompt');
const StyleGuide = require('./StyleGuide');
const { logMsg } = require('./helpers.js');

module.exports = async () => {
  const config = await prompt();
  const Guide = new StyleGuide(config);

  Guide.create();
  Guide.render();
};

process.on('exit', () => {
  logMsg('Your guide was successfully created.');
});
