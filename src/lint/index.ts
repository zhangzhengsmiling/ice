import fs, { promises } from 'fs';
import path from 'path';

const isDirectory = (path: string) => {
  return promises.stat(path)
    .then(stats => stats.isDirectory())
    .catch(err => {
      throw err;
    });
}

const list: string[] = [];

const paths: string[] = []
const readFiles = (entry: string) => {
  paths.push(entry);
  console.log(paths)
  return promises.readdir(entry)
    .then(ls => {
      ls.forEach(async item => {
        console.log(item, paths)
        const fullPath = paths.join('/') + '/' + item;
        const _isDir = await isDirectory(fullPath);
        if (_isDir) {
          readFiles(fullPath)
        } else {
          list.push(fullPath)
        }
      })
      paths.pop()
    })
}

const readAllFiles = (entry: string) => {
  const exist = fs.existsSync(entry);
  if (!exist) throw new Error('directory is not exists');
  return isDirectory(entry)
    .then(isDirectory => {
      if (!isDirectory) throw new Error(`${entry} is not a directory`)
    })
    .then(() => {
      console.log(`${entry} is a directory`);
      return readFiles(entry)
    })
}

const lint = () => {
  // console.log('lint excute...')
  // 读取src下所有的文件
  readAllFiles(path.resolve(process.cwd(), 'src'))
    .then(() => {
      console.log('list', list)
    })

}

export default lint;
