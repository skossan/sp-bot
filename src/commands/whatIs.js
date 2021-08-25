import axios from 'axios';

export const messageKey = 'what is';

export const callback = async (msg) => {
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
};
