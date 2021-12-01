import path from 'path';
const cwd = process.cwd();

const loader = {
  test: /\.(js|jsx)$/,
  include: path.resolve(cwd, 'src'),
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
      },
    },
  ],
};

export default loader;
