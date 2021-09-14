import pear from './js/pear';
import whoAmI from './js/whoAmI';
import joke from './ts/joke';
import banana from './ts/banana';
import whatIs from './ts/whatIs';
import token from './ts/token';
import weather from './ts/weather';
import { ICommand } from './commands';

const tsCommands: ICommand[] = [joke, banana, whatIs, token, weather];

const jsCommands: ICommand[] = [pear, whoAmI];

const allCommands = [...tsCommands, ...jsCommands];

export default allCommands.map(({ name, callback, description, options }) => ({
  command: {
    name,
    description,
    options,
  },
  callback,
}));
