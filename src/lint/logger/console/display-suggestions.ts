import { Linter } from 'eslint';
import chalk from 'chalk';
import { logger } from '../../utils';

const { space } = logger;

export const displaySuggestions = (msg: Linter.LintMessage) => {
  console.log(`${space(2)}${chalk.green('suggestions:')}`);
  msg.suggestions?.forEach(suggest => {
    console.log(chalk.green(`${space(4)}${suggest.messageId, suggest.desc}`));
  });
};
