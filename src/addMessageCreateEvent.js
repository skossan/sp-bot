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
  const messageContent = msg.content.toLowerCase();

  const messageCreateKey =
    Object.keys(messageCreateCallbacks).find((key) => messageContent === key) ||
    Object.keys(messageCreateCallbacks).find((key) =>
      messageContent.startsWith(key)
    );
  const messageCreateCallback = messageCreateCallbacks[messageCreateKey];
  if (!messageCreateCallback) return;

  const reply = await messageCreateCallback(msg);
  if (!reply) return;

  console.log(`Replying ${msg.author.username} with "${reply}".\n`);

  if (Array.isArray(reply)) {
    reply.forEach((r) => msg.reply(r));
  } else {
    msg.reply(reply);
  }
});

addMessageCreateEvent = (messageKey, callback) => {
  const messageCreateCallback =
    messageCreateCallbacks[messageKey.toLowerCase()];
  if (messageCreateCallback) throw new error('Callback already exists.');
  messageCreateCallbacks[messageKey] = callback;
};

export default addMessageCreateEvent;
