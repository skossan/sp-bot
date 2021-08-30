import axios from 'axios';
import { ApplicationCommandOptionType } from 'discord-api-types/v9';
import { Interaction } from 'discord.js';
import { ICommand, IOption } from '../commands';

const name = 'whatis';

const description = 'Responds with an Urban Dictionary definition of a word';

const callback = async (interaction: Interaction) => {
  try {
    if (!interaction.isCommand()) throw new Error('Not a command.');

    const term = interaction.options.get('word')!.value;

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

    const cleanedDefinition = definition.replace(/[\[\]]/g, '') as string;

    return [cleanedDefinition, `Source: ${permalink}`];
  } catch (e) {
    console.error(e);
    return `Something went wrong. Sorry 😢`;
  }
};

const options: IOption[] = [
  {
    type: ApplicationCommandOptionType.String,
    name: 'word',
    description: 'What is this word?',
    required: true,
  },
];

const whatIs = {
  callback,
  description,
  name,
  options,
};

export default whatIs;
