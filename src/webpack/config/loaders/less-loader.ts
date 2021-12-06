import path from 'path';
import { loader } from '../plugins/plugin-mini-css-extract';
const cwd = process.cwd();

export const LOADER_LESS = {
  test: /(?<!\.module)\.less/,
  include: path.resolve(cwd, 'src'),
  use: [
    { loader },
    {
      loader: 'css-loader',
    },
    { loader: 'less-loader' },
  ],
};

export const LOADER_LESS_MODULE = {
  test: /\.module\.less$/,
  include: path.resolve(cwd, 'src'),
  use: [
    { loader },
    {
      loader: 'css-loader',
      options: {
        modules: true,
      },
    },
    { loader: 'less-loader' },
  ],
};
