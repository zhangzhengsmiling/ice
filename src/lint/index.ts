import path from 'path';
import { ESLint } from 'eslint';
import { files } from './utils';
import { displayLintMessage } from './logger/console';

const { readAllFiles } = files;

interface IZferLintOption {
  suggestion?: boolean;
  fix?: boolean;
}

const verify = (lints: ESLint.LintResult[], suggestion = false) => {
  lints.forEach(displayLintMessage({ showSuggestion: suggestion }));
};

const lint = async (option: IZferLintOption) => {
  // 读取src下所有的文件
  const { suggestion, fix } = option;
  const files = readAllFiles(path.resolve(process.cwd(), 'src'));
  const lintFiles = files.map(file => {
    return path.join(process.cwd(), 'src', file);
  });
  const options = {
    overrideConfigFile: path.join(process.cwd(), 'src/lint/.eslintrc.js'),
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
