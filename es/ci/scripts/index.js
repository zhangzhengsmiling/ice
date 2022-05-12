"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.standardVersion = exports.commitlint = exports.husky = exports.commitizen = void 0;
var commitizen_1 = require("./commitizen");
Object.defineProperty(exports, "commitizen", { enumerable: true, get: function () { return __importDefault(commitizen_1).default; } });
var husky_1 = require("./husky");
Object.defineProperty(exports, "husky", { enumerable: true, get: function () { return __importDefault(husky_1).default; } });
var commitlint_1 = require("./commitlint");
Object.defineProperty(exports, "commitlint", { enumerable: true, get: function () { return __importDefault(commitlint_1).default; } });
var standard_version_1 = require("./standard-version");
Object.defineProperty(exports, "standardVersion", { enumerable: true, get: function () { return __importDefault(standard_version_1).default; } });
