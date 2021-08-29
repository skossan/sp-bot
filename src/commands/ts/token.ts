const { DEV_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

const name = 'token';

const description = 'Will DM you a bot developer credentials';

const callback = (interaction) => {
  const hasDeveloperPermission = interaction.member.roles.cache.some(
    (role) => role.name === 'sp-bot-developer'
  );
  if (hasDeveloperPermission) {
    interaction.user.send(
      `Execute the following command in the root of the project folder:\n\`\`\`echo "\\nDEV_TOKEN=${DEV_TOKEN} \\\n\\nGUILD_ID=${GUILD_ID} \\\n\\nCLIENT_ID=${CLIENT_ID}" >> .env\`\`\``
    );

    return 'You will find your developer credentials in your DM 👍 ';
  } else {
    return `You don't seem to have the correct role. Please contact an admin if you want to work on the project and get developer credentials.`;
  }
};

const token = {
  name,
  description,
  callback,
};

export default token;
