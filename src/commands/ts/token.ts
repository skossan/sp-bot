import { Interaction } from 'discord.js';

const { DEV_TOKEN, DEV_CLIENT_ID, GUILD_ID } = process.env;

const name = 'token';

const description = 'Will DM you a bot developer credentials';

const callback = (interaction: Interaction) => {
  try {
    if (!interaction.member) throw new Error('Missing field: member.');

    const hasDeveloperPermission =
      !Array.isArray(interaction.member.roles) &&
      interaction.member.roles.cache.some(
        (role) => role.name === 'sp-bot-developer'
      );

    if (hasDeveloperPermission) {
      interaction.user.send(
        `Execute the following command in the root of the project folder:\n\`\`\`echo "\\nDEV_TOKEN=${DEV_TOKEN} \\\n\\nGUILD_ID=${GUILD_ID} \\\n\\nDEV_CLIENT_ID=${DEV_CLIENT_ID}" >> .env\`\`\``
      );
      interaction.user.send(`Optional keys you can add to your .env file: 
*WEATHER_API_KEY=587b112b73d3331d7bbfd7247516e478*
      `);

      return 'You will find your developer credentials in your DM 👍 ';
    } else {
      return `You don't seem to have the correct role. Please contact an admin if you want to work on the project and get developer credentials.`;
    }
  } catch (e) {
    console.error(e);
    return 'Something went wrong 😢';
  }
};

const token = {
  name,
  description,
  callback,
};

export default token;
