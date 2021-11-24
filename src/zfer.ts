#!/usr/bin/env node

import { program, Option, Command } from 'commander';
import fs from 'fs';
import path from 'path';
const cwd = process.cwd();
const PKG_NAME = 'package.json';
import lint from './lint';
import { compose } from './utils';

const toString = (buffer: Buffer) => buffer.toString();
const resolveCwd = (cwd: string) => (filename: string) => path.resolve(cwd, filename);
const getPkgByFilename = compose<string, {version: string}>(JSON.parse, toString, fs.readFileSync, resolveCwd(cwd));
const pkg = getPkgByFilename(PKG_NAME);

const VERSION = pkg.version;
program.version(VERSION).option('-v, --version');

const registrySubCommand = (program: Command, subCommand: Command) => {
  program.addCommand(subCommand);
};

const splitFilter = (splitStr: string) =>
  (target: string) => target.split(splitStr).filter(Boolean);

const zferDev = new Command('dev')
  .description('start dev server')
  .option('-t, --typescript', '是否启用ts模式')
  .action((option: Option) => {
    console.log(option);
  });

interface IZferBuildOptions {
  typesctipt?: boolean
}
const zferBuild = new Command('build')
  .description('build')
  .option('-t, --typescript', '是否启用ts模式')
  .action((option: IZferBuildOptions) => {
    console.log(option);
  });

const zferLint = new Command('lint')
  .argument('[files...]', 'dir or file path list')
  .description('lint')
  .option('--ext <string>', 'lint后缀', splitFilter(','))
  .option('-s, --suggestion')
  .option('-f, --fix')
  .action(lint);

registrySubCommand(program, zferDev);
registrySubCommand(program, zferBuild);
registrySubCommand(program, zferLint);

program.parse(process.argv);
