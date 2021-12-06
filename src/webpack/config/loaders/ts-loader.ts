import path from 'path';
const cwd = process.cwd();

const loader = {
  test: /\.(ts|tsx)$/,
  include: path.resolve(cwd, 'src'),
  use: [
    {
      loader: 'cache-loader',
    },
    // {
    //   loader: 'esbuild-loader',
    //   options: {
    //     loader: 'tsx',
    //     target: 'es2015',
    //   },
    // },
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
      }
    }
  ],
};

export default loader;
