#!/usr/bin/env node
const { spawn } = require('child_process');
const args = process.argv.slice(2);
const subset = args[0] || 'all';

const map = {
  all: 'src/tests/*.bdd.spec.ts',
  events: 'src/tests/events.bdd.spec.ts',
  survey: 'src/tests/survey.bdd.spec.ts',
  calculator: 'src/tests/calculator.bdd.spec.ts'
};

const pattern = map[subset] || map['all'];
console.log(`Running checks: ${subset} -> ${pattern}`);

const cmd = spawn('npx', ['playwright', 'test', pattern, '--reporter=list'], { stdio: 'inherit' });
cmd.on('close', (code) => process.exit(code));
