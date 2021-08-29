import axios from 'axios';
import { ICommand } from '../commands';

const name = 'joke';

const description = 'Responds with a random joke';

const callback = async () => {
  const joke = await axios.get(
    'https://official-joke-api.appspot.com/random_joke'
  );

  return `${joke.data.setup}\n${joke.data.punchline}`;
};

const joke = {
  name,
  description,
  callback,
};

export default joke;
