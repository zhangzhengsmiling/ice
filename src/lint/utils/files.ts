import fs from 'fs';
import path from 'path';

export const isDirectorySync = (path: string) => {
  const stats = fs.statSync(path);
  return stats.isDirectory();
}

export const readAllFiles = (entry: string) => {
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
  return list.filter(item => !/.eslintrc/.test(item));
}
