"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = __importDefault(require("child_process"));
var execSync = child_process_1.default.execSync;
var installPackages = function (packages, options) {
    if (options === void 0) { options = []; }
    if (!packages || packages.length === 0)
        throw new Error('packages is required!');
    var script = "yarn add ".concat(packages.join(' '), " ").concat(options.join(' '));
    execSync(script, { stdio: [0, 1, 2] });
};
exports.default = installPackages;
