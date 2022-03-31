import chalk from 'chalk';

export const mapSeverityString = (severity: number) => {
  switch(severity) {
    case 1:
      return chalk.yellow('warning');
    case 2:
      return chalk.red('error');
    default:
      return '';
  }
};
