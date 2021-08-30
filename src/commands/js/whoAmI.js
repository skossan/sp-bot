const name = 'whoami';

const description = 'Responds with your username';

const callback = (interaction) => interaction.author.username;

const whoAmI = {
  name,
  description,
  callback,
};

export default whoAmI;
