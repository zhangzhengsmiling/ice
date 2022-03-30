import path from 'path';
import { loader } from '../plugins/plugin-mini-css-extract';
const cwd = process.cwd();

export const LOADER_CSS = {
  test: /(?<!\.module)\.css/,
  include: path.resolve(cwd, 'src'),
  use: [
    { loader },
    {
      loader: 'css-loader',
    },
  ],
};

export const LOADER_CSS_MODULE = {
  test: /\.module\.css$/,
  include: path.resolve(cwd, 'src'),
  use: [
    { loader },
    {
      loader: 'css-loader',
      options: {
        modules: true,
      },
    },
  ],
};
