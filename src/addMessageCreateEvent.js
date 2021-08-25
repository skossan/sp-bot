import { Client, Intents } from 'discord.js';
import { token } from '../config.json';

const messageCreateCallbacks = {};

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.login(token);

client.once('ready', () => {
  console.log('Ready!');
});

client.on('messageCreate', async (msg) => {
  const messageCreateFunction = messageCreateCallbacks[msg.content];
  if (!messageCreateFunction) return;
  const reply = await messageCreateFunction(msg);
  if (!reply) return;
  console.log(`Replying ${msg.author.username} with "${reply}".`);
  msg.reply(reply);
});

addMessageCreateEvent = (messageKey, callback) => {
  const messageCreateCallback = messageCreateCallbacks[messageKey];
  if (messageCreateCallback) throw new error('Callback already exists.');
  messageCreateCallbacks[messageKey] = callback;
};

export default addMessageCreateEvent;
