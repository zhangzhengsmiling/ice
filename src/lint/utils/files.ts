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
