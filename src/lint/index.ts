import fs, { promises } from 'fs';
import path from 'path';

const isDirectory = (path: string) => {
  return promises.stat(path)
    .then(stats => stats.isDirectory())
    .catch(err => {
      throw err;
    });
}

const isDirectorySync = (path: string) => {
  const stats = fs.statSync(path);
  return stats.isDirectory();
}

const list: string[] = [];

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

const lint = () => {
  // console.log('lint excute...')
  // 读取src下所有的文件
  const files = readAllFiles(path.resolve(process.cwd(), 'src'))
  console.log(files);
}

export default lint;
