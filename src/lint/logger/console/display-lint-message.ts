import { ESLint } from 'eslint';
import chalk from 'chalk';
import { math, logger } from '../../utils';
import { compose } from '../../../utils';
import { displaySuggestions } from './display-suggestions';
import { mapServerityString } from './map-serverity-string';
const { max } = math;
const { padEnd, padStart, space, toString } = logger;

export const displayLintMessage = (lintResult: ESLint.LintResult) => {
  const maxCol = max(lintResult.messages.map(msg => msg.column));
  const maxLine = max(lintResult.messages.map(msg => msg.line));
  const displayRow = compose(chalk.gray, padStart(maxLine.toString().length, ' '), toString);
  const displayCol = compose(chalk.gray, padEnd(maxCol.toString().length, ' '), toString);
  const displayServerity = compose(padEnd(7, ' '), mapServerityString)

  console.log(chalk.underline(lintResult.filePath))
  lintResult.messages.forEach(msg => {
    console.log(`${space(2)}${displayRow(msg.line)}${chalk.gray(':')}${displayCol(msg.column)}${space(3)}${displayServerity(msg.severity)}${space(3)}${chalk.gray(msg.messageId)}`)
    if(msg.suggestions) {
      displaySuggestions(msg);
    }
  })
}
