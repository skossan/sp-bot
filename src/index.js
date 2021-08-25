import axios from 'axios';
import addMessageCreateEvent from './addMessageCreateEvent';

addMessageCreateEvent('baba', () => 'nana');
addMessageCreateEvent('ping', () => 'pong');
addMessageCreateEvent('joke', async () => {
  const joke = await axios.get(
    'https://official-joke-api.appspot.com/random_joke'
  );

  return [joke.data.setup, joke.data.punchline];
});
addMessageCreateEvent('banana', () => 'apple');
addMessageCreateEvent('who am I', (msg) => msg.author.username);
addMessageCreateEvent('what is', async (msg) => {
  const messageContent = msg.content.toLowerCase();
  const term = messageContent.split('what is')[1].trim();

  if (!term) {
    return 'Write a word after "what is". For example: "what is banana".';
  }

  const { data } = await axios(
    `https://api.urbandictionary.com/v0/define?term=${term}`
  );
  const { list: definitionsList } = data;
  if (!definitionsList.length) {
    return `I don't know what ${term} is 🤷🏻‍♂`;
  }

  const [{ definition, permalink }] = definitionsList;

  const cleanedDefinition = definition.replace(/[\[\]]/g, '');

  return [cleanedDefinition, `Source: ${permalink}`];
});
