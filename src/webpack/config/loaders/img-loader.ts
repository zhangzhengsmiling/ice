import Rule from './Rule';

export const LOADER_IMG = Rule.of()
  .test(/\.(png|jpe?g|gif)$/i)
  .use('file-loader')
  .getOptions();
