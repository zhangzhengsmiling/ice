import fs from 'fs';
import path from 'path';

export const isDirectorySync = (path: string) => {
  const stats = fs.statSync(path);
  return stats.isDirectory();
};

/**
 * [读取路径下的所有文件，以绝对路径输出]
 * @param  allFiles <string[]>   [fileList收集器，默认为空]
 * @param  dirPath <string>      [文件夹绝对路径]
 * @return         <string[]>    [返回文件夹下所有的文件，绝对路径]
 */
const _read = (allFiles: string[] = [], dirPath: string): string[] => {
  if (!fs.existsSync(dirPath)) throw new Error(`${dirPath} does not exist!!`);
  const stat = fs.statSync(dirPath);
  if (!stat.isDirectory()) return [dirPath];
  const currentPath = [dirPath];
  const ls = fs.readdirSync(dirPath);
  ls.forEach((item) => {
    const stat = fs.statSync(path.join(...currentPath, item));
    if (stat.isDirectory()) {
      currentPath.push(item);
      _read(allFiles, path.resolve(dirPath, item));
      currentPath.pop();
    } else {
      allFiles.push(path.join(...currentPath, item));
    }
  });
  return allFiles;
};

export const readFilesOfDir = (dirPath: string) => {
  return _read([], dirPath);
};

export const resolveFiles = (extensions: string[]) => {
  return (filename: string) => {
    let result: string | null = null;
    for(let i = 0; i < extensions.length; i++) {
      const _path = filename + extensions[i];
      const absPath = path.isAbsolute(_path) ? _path : path.resolve(__dirname, _path);
      const isExist = fs.existsSync(absPath);
      if (isExist) {
        result = absPath;
        break;
      }
    }
    return result;
  };
};

