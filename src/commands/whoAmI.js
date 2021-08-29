export const messageKey = 'whoami';

export const description = 'Responds with your username';

export const callback = (interaction) => interaction.user.username;
