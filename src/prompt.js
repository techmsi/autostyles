const prompts = require('prompts');

const getConfigMenu = [
  {
    type: 'confirm',
    name: 'debug',
    initial: true,
    message: 'Turn debug on to get log info?'
  },
  {
    type: 'text',
    name: 'source',
    initial: './example/my-css',
    message: 'Source folder'
  },
  {
    type: 'text',
    name: 'output',
    initial: 'dist',
    message: 'Destination folder'
  }
];

module.exports = async () => {
  const configurationFields = await prompts(getConfigMenu);

  return configurationFields;
};
