const devToken = process.env.DEV_TOKEN;

export const messageKey = '!token';

export const callback = async (message) => {
  const hasDeveloperPermission = message.member.roles.cache.some(
    (role) => role.name === 'sp-bot-developer'
  );
  if (hasDeveloperPermission) {
    message.author.send(
      `Execute the following command in the root of the project folder:\n \`echo DEV_TOKEN=${devToken} >> .env\``
    );

    return 'You will find your token in your DM 👍 ';
  } else {
    return `You don't seem to have the correct role. Please contact an admin if you want to work on the project and get a token.`;
  }
};
