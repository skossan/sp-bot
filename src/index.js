import axios from 'axios';
import addMessageCreateEvent from './addMessageCreateEvent';
import * as commands from './commands';

Object.values(commands).forEach(({ messageKey, callback }) =>
  addMessageCreateEvent(messageKey, callback)
);

addMessageCreateEvent('banana', () => 'apple');
addMessageCreateEvent('who am I', (msg) => msg.author.username);
