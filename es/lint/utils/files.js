"use strict";
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
exports.resolveFiles = exports.readFilesOfDir = exports.isDirectorySync = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var isDirectorySync = function (path) {
    var stats = fs_1.default.statSync(path);
    return stats.isDirectory();
};
exports.isDirectorySync = isDirectorySync;
/**
 * [读取路径下的所有文件，以绝对路径输出]
 * @param  allFiles <string[]>   [fileList收集器，默认为空]
 * @param  dirPath <string>      [文件夹绝对路径]
 * @return         <string[]>    [返回文件夹下所有的文件，绝对路径]
 */
var _read = function (allFiles, dirPath) {
    if (allFiles === void 0) { allFiles = []; }
    if (!fs_1.default.existsSync(dirPath))
        throw new Error("".concat(dirPath, " does not exist!!"));
    var stat = fs_1.default.statSync(dirPath);
    if (!stat.isDirectory())
        return [dirPath];
    var currentPath = [dirPath];
    var ls = fs_1.default.readdirSync(dirPath);
    ls.forEach(function (item) {
        var stat = fs_1.default.statSync(path_1.default.join.apply(path_1.default, __spreadArray(__spreadArray([], currentPath, false), [item], false)));
        if (stat.isDirectory()) {
            currentPath.push(item);
            _read(allFiles, path_1.default.resolve(dirPath, item));
            currentPath.pop();
        }
        else {
            allFiles.push(path_1.default.join.apply(path_1.default, __spreadArray(__spreadArray([], currentPath, false), [item], false)));
        }
    });
    return allFiles;
};
var readFilesOfDir = function (dirPath) {
    return _read([], dirPath);
};
exports.readFilesOfDir = readFilesOfDir;
var resolveFiles = function (extensions) {
    return function (filename) {
        var result = null;
        for (var i = 0; i < extensions.length; i++) {
            var _path = filename + extensions[i];
            var absPath = path_1.default.isAbsolute(_path) ? _path : path_1.default.resolve(__dirname, _path);
            var isExist = fs_1.default.existsSync(absPath);
            if (isExist) {
                result = absPath;
                break;
            }
        }
        return result;
    };
};
exports.resolveFiles = resolveFiles;
