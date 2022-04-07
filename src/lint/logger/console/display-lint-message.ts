import { ESLint } from 'eslint';
import chalk from 'chalk';
import { math, logger } from '../../utils';
import { compose } from '../../../utils';
import { displaySuggestions } from './display-suggestions';
import { mapSeverityString } from './map-severity-string';
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
  const displaySeverity = compose(padEnd(17, space(1)), mapSeverityString);

  if (lintResult.messages.length === 0) return;
  console.log(chalk.underline(lintResult.filePath));
  lintResult.messages.forEach(msg => {
    if (msg.line && msg.column) {
      const message = new Array<string>().concat(space(2))
        .concat(displayRow(msg.line) as string)
        .concat(chalk.gray(':'))
        .concat(displayCol(msg.column) as string)
        .concat(space(3))
        .concat(displaySeverity(msg.severity) as string)
        .concat(space(3))
        .concat(padEnd(28, space(1))(chalk.gray(msg.messageId)))
        .concat(chalk.gray(msg.message))
        .join('');
      console.log(message);
    }
    if(showSuggestion && msg.suggestions) {
      displaySuggestions(msg);
    }
  });
  console.log('\n');
};
