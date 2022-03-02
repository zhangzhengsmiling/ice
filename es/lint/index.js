"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var eslint_1 = require("eslint");
var utils_1 = require("./utils");
var console_1 = require("./logger/console");
var chalk_1 = __importDefault(require("chalk"));
var readFilesOfDir = utils_1.files.readFilesOfDir;
var verify = function (lints, suggestion) {
    if (suggestion === void 0) { suggestion = false; }
    lints.forEach((0, console_1.displayLintMessage)({ showSuggestion: suggestion }));
};
var dropPrefixPath = function (prefix) {
    return function (path) {
        return path.replace(prefix + '/', '');
    };
};
var resolvePrefix = function (prefix) {
    return function (_path) {
        // 判断路径是否为绝对路径
        if (_path.startsWith('/'))
            return _path;
        return path_1.default.join(prefix, _path);
    };
};
var combineArray = function (arr1, arr2) {
    return __spreadArray(__spreadArray([], arr1, true), arr2, true);
};
var ofExtensions = function (extensions) {
    return function (path) {
        if (extensions.length === 0)
            return true;
        return extensions.some(function (ext) {
            return new RegExp(ext + '$').test(path);
        });
    };
};
var lint = function (filePaths, option) { return __awaiter(void 0, void 0, void 0, function () {
    var currentWorkPath, suggestion, fix, _a, ext, lintFiles, options, lint, formatter, filesLint;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (filePaths.length === 0)
                    return [2 /*return*/, console.log(chalk_1.default.yellow('do nothing!!'))];
                currentWorkPath = process.cwd();
                suggestion = option.suggestion, fix = option.fix, _a = option.ext, ext = _a === void 0 ? [] : _a;
                lintFiles = filePaths
                    .map(resolvePrefix(currentWorkPath))
                    .map(readFilesOfDir)
                    .reduce(combineArray, [])
                    .map(dropPrefixPath(currentWorkPath))
                    .filter(function (path) { return !/.eslintrc/.test(path); })
                    .filter(ofExtensions(ext))
                    .map(resolvePrefix(currentWorkPath));
                options = {
                    overrideConfigFile: path_1.default.join(__dirname, './.eslintrc.js'),
                    useEslintrc: false,
                    fix: fix,
                };
                lint = new eslint_1.ESLint(options);
                return [4 /*yield*/, lint.loadFormatter()];
            case 1:
                formatter = _b.sent();
                filesLint = lintFiles.map(function (lintFile) {
                    return lint.lintFiles(lintFile);
                });
                Promise.all(filesLint)
                    .then(function (resLints) {
                    resLints.forEach(function (lints) { return __awaiter(void 0, void 0, void 0, function () {
                        var msg;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!!fix) return [3 /*break*/, 1];
                                    verify(lints, suggestion);
                                    return [3 /*break*/, 3];
                                case 1: return [4 /*yield*/, eslint_1.ESLint.outputFixes(lints)];
                                case 2:
                                    _a.sent();
                                    msg = formatter.format(lints);
                                    if (msg)
                                        console.log(msg);
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                });
                return [2 /*return*/];
        }
    });
}); };
exports.default = lint;
