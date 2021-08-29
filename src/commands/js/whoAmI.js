const name = 'whoami';

const description = 'Responds with your username';

const callback = (msg) => msg.author.username;

const whoAmI = {
  name,
  description,
  callback,
};

export default whoAmI;
