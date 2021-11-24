import { ESLint } from 'eslint';
import chalk from 'chalk';
import { math, logger } from '../../utils';
import { compose } from '../../../utils';
import { displaySuggestions } from './display-suggestions';
import { mapServerityString } from './map-serverity-string';
const { max } = math;
const { padEnd, padStart, space, toString } = logger;

interface IDisplayLintMessageOptions {
  showSuggestion?: boolean
}

export const displayLintMessage = (options: IDisplayLintMessageOptions) => (lintResult: ESLint.LintResult) => {
  const {
    showSuggestion = false
  } = options;
  const maxCol = max(lintResult.messages.map(msg => msg.column));
  const maxLine = max(lintResult.messages.map(msg => msg.line));
  const displayRow = compose(chalk.gray, padStart(maxLine.toString().length, ' '), toString);
  const displayCol = compose(chalk.gray, padEnd(maxCol.toString().length, ' '), toString);
  const displayServerity = compose(padEnd(17, ' '), mapServerityString);

  if (lintResult.messages.length === 0) return;
  console.log(chalk.underline(lintResult.filePath));
  lintResult.messages.forEach(msg => {
    console.log(`${space(2)}${displayRow(msg.line)}${chalk.gray(':')}${displayCol(msg.column)}${space(3)}${displayServerity(msg.severity)}${space(3)}${chalk.gray(msg.messageId)}`);
    if(showSuggestion && msg.suggestions) {
      displaySuggestions(msg);
    }
  });
  console.log('\n');
};
