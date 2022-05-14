import path from 'path';
import fs from 'fs';
import {
  LOADER_LESS_MODULE, LOADER_LESS, LOADER_SASS,
  LOADER_SASS_MODULE, LOADER_CSS, LOADER_CSS_MODULE,
  LOADER_JS, LOADER_TS, LOADER_IMG, LOADER_FONT
} from './loaders';
import { MiniCssExtractPlugin } from './plugins/plugin-mini-css-extract';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import merge from 'webpack-merge';
import CssMinimizerWebpackPlugin from 'css-minimizer-webpack-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { SwitchCase } from '../../utils';
const cwd = process.cwd();
declare type FnIIFE = (...args: any) => any;

type ConfigFunction =
  (config: webpack.Configuration, options: { env: unknown }) => webpack.Configuration;

export enum EnumEnvironment {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
}

interface ICopyConfig {
  from: string;
  to: string;
}

const bundleFilename = SwitchCase.of<EnumEnvironment, string>()
  .case(EnumEnvironment.DEVELOPMENT, '[name].bundle.js')
  .case(EnumEnvironment.PRODUCTION, '[name].bundle.[chunkhash:8].js');

const configFilePath = SwitchCase.of<EnumEnvironment, string>()
  .case(EnumEnvironment.DEVELOPMENT, '/config/config.dev.js')
  .case(EnumEnvironment.PRODUCTION, '/config/config.prod.js');

const cssExtractFilename = SwitchCase.of<EnumEnvironment, string>()
  .case(EnumEnvironment.DEVELOPMENT, '[name].css')
  .case(EnumEnvironment.PRODUCTION, '[name].[chunkhash:8].css');

const mergeDevServerConfig = (
  devServerConfig: DevServerConfiguration = {},
): DevServerConfiguration => {
  const DEFAULT_HOST = '127.0.0.1';
  const DEFAULT_PORT = 8000;
  return {
    host: DEFAULT_HOST,
    port: DEFAULT_PORT,
    ...devServerConfig,
  };
};

const mergeEntryConfig = (entryConfig?: webpack.Entry) => {
  const DEFAULT_ENTRY_CONFIG = {
    app: path.resolve(cwd, './src/index.tsx'),
  };
  return entryConfig || DEFAULT_ENTRY_CONFIG;
};

const mergeOutputConfig = (env: EnumEnvironment) => (outputConfig?: object) => {
  const DEFAULT_OUTPUT_CONFIG = {
    path: path.resolve(cwd, './build'),
    filename: bundleFilename.switch(env),
  };
  return outputConfig || DEFAULT_OUTPUT_CONFIG;
};

const addCopyConfig = (configs: ICopyConfig[], copyConfig: ICopyConfig) => {
  if (!fs.existsSync(path.resolve(copyConfig.from))) return;
  if (fs.readdirSync(copyConfig.from).length <= 0) return;
  configs.push(copyConfig);
};

const decoratorKeyForList = (key: string) => {
  return {
    addKey: (list: { [key: string]: number }[]) => {
      list.forEach((item, index) => {
        item[key] = index;
      });
    },
    removeKey: (list: { [key: string]: number }[]) => {
      list.forEach((item) => {
        delete item[key];
      });
    },
  };
};

const getConfig = async (ENV: EnumEnvironment) => {
  const DOC_TITLE = 'title';
  const COPY_CONFIG: ICopyConfig[] = [];
  addCopyConfig(COPY_CONFIG, {
    from: path.resolve(cwd, 'public/imgs'),
    to: path.resolve(cwd, 'build/imgs'),
  });

  addCopyConfig(COPY_CONFIG, {
    from: path.resolve(cwd, 'public/config'),
    to: path.resolve(cwd, 'build/config'),
  });

  const CONFIG_FILE_PATH = configFilePath.switch(ENV);
  const plugins: (
    CleanWebpackPlugin |
    HtmlWebpackPlugin |
    MiniCssExtractPlugin |
    CopyWebpackPlugin |
    FriendlyErrorsWebpackPlugin
  )[] = [
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: DOC_TITLE,
      configPath: CONFIG_FILE_PATH,
      template: path.resolve(cwd, './public/index.html'),
      publicPath: '/',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: cssExtractFilename.switch(ENV),
    }),
  ];

  if (COPY_CONFIG.length > 0) {
    plugins.push(new CopyWebpackPlugin({
      patterns: COPY_CONFIG,
    }));
  }

  const config: webpack.Configuration = {
    entry: mergeEntryConfig(),
    output: mergeOutputConfig(ENV)(),
    plugins,
    resolve: {
      // ！important 动态配置，不必要的后缀配置不要加，出现频率高的后缀往前提
      extensions: ['.ts', '.tsx', '.js', 'jsx', '.less', '.json', '.scss', '.sass'],
      alias: {
        '@': path.resolve(cwd, './src'),
      },
    },
    module: {
      rules: [
        LOADER_JS.getOptions(),
        LOADER_TS.getOptions(),
        LOADER_LESS_MODULE.getOptions(),
        LOADER_LESS.getOptions(),
        LOADER_SASS.getOptions(),
        LOADER_SASS_MODULE.getOptions(),
        LOADER_IMG.getOptions(),
        LOADER_FONT.getOptions(),
        LOADER_CSS.getOptions(),
        LOADER_CSS_MODULE.getOptions(),
      ],
    },
    optimization: {
      minimizer: [new TerserWebpackPlugin(), new CssMinimizerWebpackPlugin()],
    },
  };

  if (ENV === EnumEnvironment.DEVELOPMENT) {
    (config as webpack.Configuration).devServer = mergeDevServerConfig({
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
        logging: 'none',
        progress: true,
      },
    });
  }

  const { addKey, removeKey } = decoratorKeyForList('_key');

  const customConfig = await import(path.resolve(process.cwd(), 'ice.config.js'))
    .then((module) => module.default);

  const iife = <RetType>(fn: FnIIFE, ...args: any[]): RetType => {
    return fn(...args);
  }

  // merge config
  let _config = null;

  return SwitchCase.of<string, webpack.Configuration>()
    .case('object', merge({}, config, customConfig))
    .case('function', iife(() => {
      addKey(config.module?.rules as { [key: string]: number }[]);
      _config = (customConfig as ConfigFunction)(
        config,
        { env: process.env },
      );
      removeKey(config.module?.rules as { [key: string]: number }[]);
      return _config;
    }))
    .switch(typeof customConfig);
};

export default getConfig as (
  env: EnumEnvironment,
) => Promise<webpackDevServer.Configuration & webpack.Configuration & { devServer: DevServerConfiguration }>;
