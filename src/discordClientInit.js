import { Client, Intents } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import commands from './commands';

const { CLIENT_ID, GUILD_ID, DEV_TOKEN, PROD_TOKEN, NODE_ENV } = process.env;
const DISCORD_CLIENT_TOKEN = NODE_ENV === 'production' ? PROD_TOKEN : DEV_TOKEN;

if (NODE_ENV === 'production') {
  if (!PROD_TOKEN) {
    throw new Error('PROD_TOKEN missing in .env file.');
  }
} else {
  if (!DEV_TOKEN) {
    throw new Error('DEV_TOKEN missing in .env file.');
  }
}

if (!GUILD_ID) {
  throw new Error('GUILD_ID missing in .env file.');
}

if (!CLIENT_ID) {
  throw new Error('CLIENT_ID missing in .env file.');
}

const registerDiscordCommands = () =>
  new Promise(async (resolve, reject) => {
    try {
      console.log('Attempting to register application commands...');

      const rest = new REST({ version: '9' }).setToken(DISCORD_CLIENT_TOKEN);
      await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
        body: commands.map(({ command }) => command.toJSON()),
      });

      console.log('✅ Successfully registered application commands!');
      resolve();
    } catch (error) {
      console.error(error);
      reject();
    }
  });

const loginDiscordClient = () =>
  new Promise((resolve, reject) => {
    try {
      console.log('Attempting to login Discord client...');

      const client = new Client({
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
      });
      client.login(DISCORD_CLIENT_TOKEN);

      client.once('ready', () => {
        console.log('✅ Successfully logged in Discord client!');
        resolve();
      });

      client.on('interactionCreate', async (interaction) => {
        const command = commands.find(
          ({ command }) => command.name === interaction.commandName
        );

        if (!command) {
          interaction.reply('Failed to find command 🙃');
          return;
        }

        const reply = await command.callback(interaction);

        if (!reply) {
          interaction.reply('Empty reply 🙃');
          return;
        }

        interaction.reply(reply);
      });
    } catch (error) {
      console.error(error);
      reject();
    }
  });

export default async () =>
  Promise.all([registerDiscordCommands(), loginDiscordClient()]).then(() => {
    console.log('Ready!');
  });
