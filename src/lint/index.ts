import { compose } from './../utils/compose';
import path from 'path';
import { ESLint } from 'eslint';
import { files } from './utils';
import { displayLintMessage } from './logger/console';
import chalk from 'chalk';

const { readFilesOfDir } = files;

const EXTENSIONS_ESLINT_RC = ['.json', '.js'];
interface IIceLintOption {
  suggestion?: boolean;
  fix?: boolean;
  ext?: string[];
}

const neg = (b: (Promise<boolean>)): Promise<boolean> => {
  return b.then(b => !b);
};

const asyncFilter = <T>(array: T[], predict: (t: T) => Promise<boolean>) => {
  return Promise.all(array.map(predict))
    .then(results => array.filter((_, idx) => results[idx]));
};

const verify = (lints: ESLint.LintResult[], suggestion = false) => {
  lints.forEach(displayLintMessage({ showSuggestion: suggestion }));
};

const dropPrefixPath = (prefix: string) => {
  return (path: string) => {
    return path.replace(prefix + '/', '');
  };
};

const resolvePrefix = (prefix: string) => {
  return (_path: string) => {
    // 判断路径是否为绝对路径
    if(_path.startsWith('/')) return _path;
    return path.join(prefix, _path);
  };
};

const combineArray = <T>(arr1: T[], arr2: T[]) => {
  return [...arr1, ...arr2];
};

const ofExtensions = (extensions: string[]) => {
  return (path: string) => {
    if (extensions.length === 0) return true;
    return extensions.some(ext => {
      return new RegExp(ext + '$').test(path);
    });
  };
};

const lint = async (filePaths: string[], option: IIceLintOption) => {
  if(filePaths.length === 0) return console.log(chalk.yellow('do nothing!!'));
  const currentWorkPath = process.cwd();
  const { suggestion, fix, ext = [] } = option;

  const _lintFiles = filePaths
    .map(resolvePrefix(currentWorkPath))
    .map(readFilesOfDir)
    .reduce(combineArray, [])
    .map(dropPrefixPath(currentWorkPath))
    .filter(path => !/.eslintrc/.test(path))
    .filter(ofExtensions(ext))
    .map(resolvePrefix(currentWorkPath));

  const eslintRcFile = files.resolveFiles(EXTENSIONS_ESLINT_RC)(path.resolve(currentWorkPath, '.eslintrc'));
  const overrideConfigFile = eslintRcFile ? eslintRcFile : path.resolve(__dirname, '.eslintrc.js');

  const options = {
    overrideConfigFile,
    useEslintrc: false,
    fix,
  };
  const lint = new ESLint(options);

  const lintFiles = await asyncFilter(_lintFiles, compose(neg, lint.isPathIgnored.bind(lint)));
  const formatter = await lint.loadFormatter();
  const filesLint = lintFiles.map((lintFile) => {
    return lint.lintFiles(lintFile);
  });

  Promise.all(filesLint)
    .then(resLints => {
      resLints.forEach(async lints => {
        if (!fix)
          verify(lints, suggestion);
        else {
          await ESLint.outputFixes(lints);
          const msg = formatter.format(lints);
          if (msg)
            console.log(msg);
        }
      });
    });
};

export default lint;
