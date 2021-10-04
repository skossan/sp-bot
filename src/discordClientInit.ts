import { Client, Intents, Interaction } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import commands from './commands';

const {
  DEV_CLIENT_ID,
  GUILD_ID,
  DEV_TOKEN,
  PROD_TOKEN,
  PROD_CLIENT_ID,
  NODE_ENV,
} = process.env;

if (!GUILD_ID) {
  throw new Error('GUILD_ID missing in .env file.');
}

const DISCORD_CLIENT_TOKEN = (() => {
  if (NODE_ENV === 'production') {
    if (PROD_TOKEN) {
      return PROD_TOKEN;
    } else {
      throw new Error('Missing PROD_TOKEN in .env file.');
    }
  }

  if (DEV_TOKEN) {
    return DEV_TOKEN;
  } else {
    throw new Error('DEV_TOKEN missing in .env file.');
  }
})();

const DISCORD_CLIENT_ID = (() => {
  if (NODE_ENV === 'production') {
    if (PROD_CLIENT_ID) {
      return PROD_CLIENT_ID;
    } else {
      throw new Error('Missing PROD_CLIENT_ID in .env file.');
    }
  }

  if (DEV_CLIENT_ID) {
    return DEV_CLIENT_ID;
  } else {
    throw new Error('DEV_CLIENT_ID missing in .env file.');
  }
})();

const registerDiscordCommands = async () => {
  console.log('Attempting to register application commands...');

  const rest = new REST({ version: '9' }).setToken(DISCORD_CLIENT_TOKEN);

  // TODO: Why does this fail?!
  // @ts-ignore
  await rest.put(Routes.applicationGuildCommands(DISCORD_CLIENT_ID, GUILD_ID), {
    body: commands.map(({ command }) => command),
  });

  console.log('✅ Successfully registered application commands!');
};

const onInteractionCreate = async (interaction: Interaction) => {
  console.log(interaction);

  if (!interaction.isCommand()) {
    return;
  }

  const command = commands.find(
    ({ command }) => command.name === interaction.commandName
  );

  if (!command) {
    interaction.reply('Failed to find command 🙃');
    return;
  }

  await interaction.deferReply();
  const commandResult = await command.callback(interaction);

  if (!commandResult) {
    interaction.reply('Empty reply 🙃');
    return;
  }

  try {
    if (Array.isArray(commandResult)) {
      const [firstReply, ...restReplies] = commandResult;
      await interaction.editReply(firstReply);

      for (const reply of restReplies) {
        await interaction.followUp(reply);
      }
    } else {
      await interaction.editReply(commandResult);
    }
  } catch (e) {
    console.error(e);
  }
};

const loginDiscordClient = () =>
  new Promise<void>((resolve, reject) => {
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

      client.on('interactionCreate', onInteractionCreate);

      client.on('messageCreate', (message) => {
        message.channel.messages.fetch('890577388042334259').then((data) => {
          console.log(`Replied to ${data}`);
        });
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
