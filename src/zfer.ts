#!/usr/bin/env node

import { program, Option, Command } from 'commander';
import fs, { readFile, readFileSync } from 'fs';
import path from 'path';
const cwd = process.cwd();
const PKG_NAME = 'package.json';

const compose = (...fns: ((v: any) => any)[]) => (trigger: any) => {
  return fns.reduceRight((temp, fn) => {
    return fn(temp);
  }, trigger)
}

const toString = (binary: any) => binary.toString();
const resolveCwd = (cwd: string) => (filename: string) => path.resolve(cwd, filename);
const getPkgByFilename = compose(JSON.parse, toString, fs.readFileSync, resolveCwd);
const pkg = getPkgByFilename(PKG_NAME);

const VERSION = pkg.version;
program
  .version(VERSION)
  .option('-v, --version')

const registrySubCommand = (program: Command, subCommand: Command) => {
  program.addCommand(subCommand);
}

const zferDev = new Command('dev')
  .description('start dev server')
  .option('-t, --typescript', '是否启用ts模式')
  .action((option: Option) => {
    console.log(option)
  });

const zferBuild = new Command('build')
  .description('build')
  .option('-t, --typescript', '是否启用ts模式')
  .action((option: any) => {
    console.log(option)
  });

registrySubCommand(program, zferDev);
registrySubCommand(program, zferBuild);

program.parse(process.argv);

const options = program.opts();
