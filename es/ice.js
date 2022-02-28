#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var PKG_NAME = 'package.json';
var lint_1 = __importDefault(require("./lint"));
var utils_1 = require("./utils");
var dev_1 = __importDefault(require("./webpack/dev"));
var build_1 = __importDefault(require("./webpack/build"));
var init_1 = __importDefault(require("./init"));
var toString = function (buffer) { return buffer.toString(); };
var resolveCwd = function (cwd) { return function (filename) { return path_1.default.resolve(cwd, filename); }; };
var getPkgByFilename = (0, utils_1.compose)(JSON.parse, toString, fs_1.default.readFileSync, resolveCwd(path_1.default.resolve(__dirname, '../')));
var pkg = getPkgByFilename(PKG_NAME);
var VERSION = pkg.version;
commander_1.program.version(VERSION).option('-v, --version');
var registrySubCommand = function (program, subCommand) {
    program.addCommand(subCommand);
};
var splitFilter = function (splitStr) {
    return function (target) { return target.split(splitStr).filter(Boolean); };
};
var devCommand = new commander_1.Command('dev')
    .description('start dev server')
    .action(dev_1.default);
var buildCommand = new commander_1.Command('build')
    .description('build')
    .action(build_1.default);
var lintCommand = new commander_1.Command('lint')
    .argument('[files...]', 'dir or file path list')
    .description('lint')
    .option('--ext <string>', 'lint后缀', splitFilter(','))
    .option('-s, --suggestion')
    .option('-f, --fix')
    .action(lint_1.default);
var initCommand = new commander_1.Command('init')
    .argument('name', 'name of project')
    .action(init_1.default);
registrySubCommand(commander_1.program, devCommand);
registrySubCommand(commander_1.program, buildCommand);
registrySubCommand(commander_1.program, lintCommand);
registrySubCommand(commander_1.program, initCommand);
commander_1.program.parse(process.argv);
