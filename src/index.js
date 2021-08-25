import axios from 'axios';
import addMessageCreateEvent from './addMessageCreateEvent';
import { messageKeyPear, callbackPear } from './commands/pear.js';
import { messageKeyJoke, callbackJoke } from './commands/joke.js';

addMessageCreateEvent(messageKeyPear, callbackPear);
addMessageCreateEvent(messageKeyJoke, callbackJoke);

addMessageCreateEvent('banana', () => 'apple');
addMessageCreateEvent('who am I', (msg) => msg.author.username);
