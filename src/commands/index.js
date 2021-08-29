import * as joke from './joke';
import * as pear from './pear';
import * as banana from './banana';
import * as whoAmI from './whoAmI';
import * as whatIs from './whatIs';
import * as token from './token';

export default [joke, pear, banana, whoAmI, whatIs, token].map(
  ({ messageKey, callback, description, options }) => ({
    command: {
      name: messageKey,
      description,
      options,
    },
    callback,
  })
);
