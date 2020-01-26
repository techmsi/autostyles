const { prompt } = require('inquirer');

const getConfigMenu = [
  {
    type: 'confirm',
    name: 'debug',
    default: true,
    message: 'Turn debug on to get log info?'
  },
  {
    type: 'text',
    name: 'source',
    default: './my-css',
    message: 'Source folder'
  },
  {
    type: 'text',
    name: 'output',
    default: 'dist',
    message: 'Destination folder'
  }
];

module.exports = async () => {
  const configurationFields = await prompt(getConfigMenu);

  return configurationFields;
};
