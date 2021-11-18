import fs from 'fs';
import path from 'path';
import { ESLint, Linter } from 'eslint'
import chalk from 'chalk';
import { compose } from '../utils'

const isDirectorySync = (path: string) => {
  const stats = fs.statSync(path);
  return stats.isDirectory();
}

const readAllFiles = (entry: string) => {
  const exist = fs.existsSync(entry);
  if (!exist) throw new Error('directory is not exists');
  const isDir = isDirectorySync(entry);
  if (!isDir) throw new Error(`${entry} is not a directory`);
  const paths: string[] = [];
  const list: string[] = [];
  const readFiles = (entry: string) => {
    const ls = fs.readdirSync(entry)
      ls.forEach(item => {
        const fullPath = path.join(...paths, item)
        const _isDir = isDirectorySync(fullPath);
        if (_isDir) {
          paths.push(item)
          readFiles(fullPath)
        } else {
          const [, ...rest] = paths;
          const _p = path.join(...rest, item);
          list.push(_p)
        }
      })
      paths.pop()
  }
  paths.push(entry);
  readFiles(entry);
  return list;
}
const max = (nums: number[]) => {
  let _max = -Infinity;
  nums.forEach(num => {
    _max = Math.max(num, _max);
  })
  return _max;
}

const space = (num: number) => {
  return new Array(num).fill(' ').join('');
}

const padStart = (length: number, pattern: string) => {
  return (str: string) => {
    return str.padStart(length, pattern);
  }
}

const padEnd = (length: number, pattern: string) => {
  return (str: string) => {
    return str.padEnd(length, pattern);
  }
}

const toString = (target: { toString: () => string }): string => {
  return target.toString()
}

const mapServerityString = (serverity: number) => {
  switch(serverity) {
    case 1:
      return chalk.yellow('warning');
    case 2:
      return chalk.red('error');
    default:
      return '';
  }
}

const displaySuggestions = (msg: Linter.LintMessage) => {
  console.log(`${space(2)}${chalk.green('suggestions:')}`)
  msg.suggestions?.forEach(suggest => {
    console.log(chalk.green(`${space(4)}${suggest.messageId, suggest.desc}`))
  })
}

const displayLintMessage = (lintResult: ESLint.LintResult) => {
  const maxCol = max(lintResult.messages.map(msg => msg.column));
  const maxLine = max(lintResult.messages.map(msg => msg.line));
  const displayRow = compose(chalk.gray, padStart(maxLine.toString().length, ' '), toString);
  const displayCol = compose(chalk.gray, padEnd(maxCol.toString().length, ' '), toString);
  const displayServerity = compose(padEnd(7, ' '), mapServerityString)

  console.log(chalk.underline(lintResult.filePath))
  lintResult.messages.forEach(msg => {
    console.log(`${space(2)}${displayRow(msg.line)}${chalk.gray(':')}${displayCol(msg.column)}${space(3)}${displayServerity(msg.severity)}${space(3)}${chalk.gray(msg.messageId)}`)
    if(msg.suggestions) {
      displaySuggestions(msg);
    }
  })
}

const lint = () => {
  // 读取src下所有的文件
  const files = readAllFiles(path.resolve(process.cwd(), 'src'))
  const lintFiles = files.map(file => {
    return path.join(process.cwd(), 'src', file)
  })
  const lint = new ESLint();
  const filesLint = lintFiles.map(lintFile => {
    return lint.lintFiles(lintFile)
  })
  Promise.all(filesLint)
    .then(resLints => {
      resLints.forEach(lints => {
        lints.forEach(displayLintMessage)
        console.log('\n')
      })
    })
}


export default lint;
