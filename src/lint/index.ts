import fs, { promises } from 'fs';
import path from 'path';

const readAllFiles = (entry: string) => {
  const exist = fs.existsSync(entry);
  if (!exist) throw new Error('directory is not exists');
  promises.stat(entry)
    .then(stats => {
      // console.log(stats);

    })
    .catch(err => {
      throw err
    })
}

const lint = () => {
  // console.log('lint excute...')
  // 读取src下所有的文件
  readAllFiles(path.resolve(process.cwd(), 'aaa'))
}

export default lint;
