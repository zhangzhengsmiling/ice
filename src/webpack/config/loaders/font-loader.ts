import Rule from './Rule';

export const LOADER_FONT = Rule.of()
  .test(/\.(woff|woff2|eot|ttf|svg)$/)
  .use('url-loader?limit=100000')
  .getOptions();
