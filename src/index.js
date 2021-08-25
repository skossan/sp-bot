import addMessageCreateEvent from './addMessageCreateEvent';
import * as commands from './commands';

Object.values(commands).forEach(({ messageKey, callback }) =>
  addMessageCreateEvent(messageKey, callback)
);
