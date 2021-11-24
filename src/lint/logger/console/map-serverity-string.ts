import chalk from 'chalk';

export const mapServerityString = (serverity: number) => {
  switch(serverity) {
    case 1:
      return chalk.yellow('warning');
    case 2:
      return chalk.red('error');
    default:
      return '';
  }
};
