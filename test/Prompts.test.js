'use strict';
const { stdin } = require('mock-stdin');

const prompt = require('../src/prompt');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const promptDefaults = {
  debug: true,
  source: './my-css',
  output: 'dist'
};

const keys = {
  up: '\x1B\x5B\x41',
  down: '\x1B\x5B\x42',
  enter: '\x0D',
  space: '\x20'
};

const mockUserInput = async (io) => {
  io.send(keys.enter);
  io.send(keys.enter);
  await delay(5);
  io.send(keys.enter);
};

describe('#Prompts', () => {
  let io = null;

  beforeAll(() => {
    io = stdin();
  });
  afterAll(() => {
    io.restore();
  });

  it('Sets the config to default when no prompt answers are given.', async () => {
    setTimeout(() => mockUserInput(io).then(), 1);

    const answers = await prompt();
    expect(answers).toMatchObject(promptDefaults);
  });
});
