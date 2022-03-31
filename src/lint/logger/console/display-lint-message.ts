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
      console.log(
        `${
          space(2)
        }${
          displayRow(msg.line)
        }${
          chalk.gray(':')
        }${
          displayCol(msg.column)
        }${
          space(3)
        }${
          displaySeverity(msg.severity)
        }${
          space(3)
        }${
          padEnd(28, space(1))(chalk.gray(msg.messageId))
        }${
          chalk.gray(msg.message)
        }`
      );
    }
    if(showSuggestion && msg.suggestions) {
      displaySuggestions(msg);
    }
  });
  console.log('\n');
};
