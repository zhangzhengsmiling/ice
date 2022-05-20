#!/usr/bin/env node

import { program, Command } from 'commander';
import fs from 'fs';
import path from 'path';
const PKG_NAME = 'package.json';
import lint from './lint';
import { compose } from './utils';
import start from './webpack/dev';
import build from './webpack/build';
import init from './init';
import ci from './ci';

const toString = (buffer: Buffer) => buffer.toString();
const resolveCwd = (cwd: string) => (filename: string) => path.resolve(cwd, filename);
const getPkgByFilename = compose<string, {version: string}>(
  JSON.parse,
  toString,
  fs.readFileSync,
  resolveCwd(path.resolve(__dirname, '../'))
);
const pkg = getPkgByFilename(PKG_NAME);

const VERSION = pkg.version;
program.version(VERSION).option('-v, --version');

const registrySubCommand = (program: Command, subCommand: Command) => {
  program.addCommand(subCommand);
};

const splitFilter = (splitStr: string) =>
  (target: string) => target.split(splitStr).filter(Boolean);

const devCommand = new Command('dev')
  .description('start dev server')
  .action(start);

const buildCommand = new Command('build')
  .description('build')
  .action(build);

const lintCommand = new Command('lint')
  .argument('[files...]', 'dir or file path list')
  .description('lint')
  .option('--ext <string>', 'lint后缀', splitFilter(','))
  .option('-s, --suggestion')
  .option('-f, --fix')
  .action(lint);

const initCommand = new Command('init')
  .argument('name', 'name of project')
  .action(init);

const ciCommand = new Command('ci')
  .description('ci scripts toolkit')
  .option('--husky')
  .option('--commitlint')
  .option('--commitizen')
  .option('--standard-version')
  .option('--test')
  .action(ci);

registrySubCommand(program, devCommand);
registrySubCommand(program, buildCommand);
registrySubCommand(program, lintCommand);
registrySubCommand(program, initCommand);
registrySubCommand(program, ciCommand);

program.parse(process.argv);
