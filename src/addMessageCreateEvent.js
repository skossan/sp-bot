const { Client, Intents } = require("discord.js");
const { token } = require("../config.json");

const messageCreateCallbacks = {};

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.login(token);

client.once("ready", () => {
  console.log("Ready!");
});

client.on("messageCreate", async (msg) => {
  const messageCreateFunction = messageCreateCallbacks[msg.content];
  if (!messageCreateFunction) return;
  const reply = await messageCreateFunction(msg);
  if (!reply) return;
  console.log(`Replying ${msg.author.username} with "${reply}".`);
  msg.reply(reply);
});

addMessageCreateEvent = (messageKey, callback) => {
  const messageCreateCallback = messageCreateCallbacks[messageKey];
  if (messageCreateCallback) throw new error("Callback already exists.");
  messageCreateCallbacks[messageKey] = callback;
};

module.exports = addMessageCreateEvent;
