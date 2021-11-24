import path from 'path';
import { ESLint } from 'eslint';
import { files } from './utils';
import { displayLintMessage } from './logger/console';

const { readFilesOfDir } = files;

interface IZferLintOption {
  suggestion?: boolean;
  fix?: boolean;
}

const verify = (lints: ESLint.LintResult[], suggestion = false) => {
  lints.forEach(displayLintMessage({ showSuggestion: suggestion }));
};

const dropPrefixPath = (prefix: string) => {
  return (path: string) => {
    return path.replace(prefix, '');
  };
};

const resolvePrefix = (prefix: string) => {
  return (_path: string) => {
    return path.join(prefix, _path);
  };
};

const combineArray = <T>(arr1: T[], arr2: T[]) => {
  return [...arr1, ...arr2];
};

const lint = async (filePaths: string[], option: IZferLintOption) => {

  const currentWorkPath = process.cwd();
  const { suggestion, fix } = option;
  
  const lintFiles = filePaths
    .map(resolvePrefix(currentWorkPath))
    .map(readFilesOfDir)
    .reduce(combineArray, [])
    .map(dropPrefixPath(currentWorkPath))
    .filter(path => !/.eslintrc/.test(path))
    .map(resolvePrefix(currentWorkPath));

  const options = {
    overrideConfigFile: path.join(__dirname, './.eslintrc.js'),
    useEslintrc: false,
    fix,
  };
  const lint = new ESLint(options);

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
