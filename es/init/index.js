"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var init = function (name) {
    var cwd = process.cwd();
    if (fs_1.default.existsSync(path_1.default.resolve(cwd, name))) {
        throw new Error("".concat(name, " already exists, please check again..."));
    }
    console.log("clone repo to ".concat(name, "..."));
    var buffer = (0, child_process_1.execSync)('git clone git@github.com:zhangzhengsmiling/react-template.git ' + name);
    console.log(buffer.toString());
    console.log('Removing .git files...');
    fs_1.default.rmSync(path_1.default.resolve(cwd, "./".concat(name, "/.git")), {
        recursive: true
    });
    // 修改package.json
    var obj = JSON.parse(fs_1.default.readFileSync('package.json').toString());
    obj.name = name;
    fs_1.default.writeFileSync('package.json', JSON.stringify(obj, null, 2));
    try {
        console.log('installing packages...(by yarn)');
        (0, child_process_1.execSync)("cd ".concat(name, " && yarn"));
        console.log("Now you can run 'cd ".concat(name, " and run yarn dev or npm run dev'"));
        console.log('Have fun!');
    }
    catch (error) {
        console.log('there is errors when installing dependencies, please retry...');
    }
};
exports.default = init;
