import axios from 'axios';

export const messageKey = 'whatis';

export const description =
  'Responds with an Urban Dictionary definition of a word';

export const callback = async (interaction) => {
  try {
    const term = interaction.options.get('word').value;

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
  } catch (e) {
    console.error(e);
    return `Something went wrong. Sorry 😢`;
  }
};

export const options = [
  {
    type: 3,
    name: 'word',
    description: 'What is this word?',
    required: true,
  },
];
