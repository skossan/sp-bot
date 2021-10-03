import axios from 'axios';
import { ApplicationCommandOptionType } from 'discord-api-types/v9';
import { Interaction } from 'discord.js';
import { ICommand, IOption } from '../commands';

const name = 'wiki';

const description = 'Responds with an Wikipedia definition of a word';

const callback = async (interaction: Interaction) => {
  try {
    if (!interaction.isCommand()) throw new Error('Not a command.');

    const term = interaction.options.get('word')!.value;

    if (!term) {
      return 'Write a word after "wiki". For example: "wiki grapes".';
    }

    const search_url = `https://en.wikipedia.org/wiki/${term}`;

    return search_url;
  } catch (e) {
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

const wiki = {
  callback,
  description,
  name,
  options,
};

export default wiki;
