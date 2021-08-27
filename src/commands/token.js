import config from '../../config.json';

export const messageKey = '!token';

export const callback = async (message) => {
  const hasDeveloperPermission = message.member.roles.cache.some(
    (role) => role.name === 'sp-bot-developer'
  );
  if (hasDeveloperPermission) {
    message.author.send('```\n' + JSON.stringify(config, null, 2) + '```\n');

    return 'You will find your token in your DM 👍 ';
  } else {
    return `You don't seem to have the correct role. Please contact an admin if you want to work on the proejct and get a token.`;
  }
};
