import path from 'path';
import { ESLint } from 'eslint'
import { files } from './utils';
import { displayLintMessage } from './logger/console'

const { readAllFiles } = files;

const lint = () => {
  // 读取src下所有的文件
  const files = readAllFiles(path.resolve(process.cwd(), 'src'))
  const lintFiles = files.map(file => {
    return path.join(process.cwd(), 'src', file)
  })
  const lint = new ESLint();
  const filesLint = lintFiles.map((lintFile) => {
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
