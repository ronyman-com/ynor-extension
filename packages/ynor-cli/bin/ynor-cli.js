#!/usr/bin/env node

const { program } = require('commander');
const { version } = require('../package.json');

program
  .version(version)
  .command('serve', 'Start development server')
  .command('build', 'Build for production')
  .command('preview', 'Preview production build')
  .parse(process.argv);