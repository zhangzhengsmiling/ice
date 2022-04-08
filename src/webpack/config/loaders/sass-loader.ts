import path from 'path';
import Rule from './Rule';
import { loader } from '../plugins/plugin-mini-css-extract';
const cwd = process.cwd();

export const LOADER_SASS = Rule.of()
  .test( /(?<!\.module)\.(scss|sass)/)
  .include(/\.module\.(sass|scss)$/)
  .use({ loader: 'sass-loader' })
  .use({ loader: 'css-loader', })
  .use({ loader });

export const LOADER_SASS_MODULE = Rule.of()
  .test(/\.module\.(sass|scss)$/)
  .include(path.resolve(cwd, 'src'))
  .use({ loader: 'sass-loader' })
  .use({
    loader: 'css-loader',
    options: {
      modules: true,
    },
  })
  .use({ loader });