import { ApplicationCommandOptionType } from 'discord-api-types/v9';
import { Interaction } from 'discord.js';
import { ICommand, IOption } from '../commands';
import axios from 'axios';

const name = 'stock';

const description = 'Responds with the value of the chosen stock';

const callback = async (interaction: Interaction) => {
  try {
    if (!interaction.isCommand()) throw new Error('Not a command.');

    const term = interaction.options.get('word')!.value;

    if (!term) {
      return 'Write a stock name after "stock". For example: "/stock tesla".';
    }

    const url = `https://www.avanza.se/_cqbe/search/global-search/global-search-template?query=${term}`;

    const { data } = await axios.get(url);
    if (data.totalNumberOfHits === 0) {
      return `Could not find ${term} on the stock market.`;
    } else {
      const name = data.resultGroups[0].hits[0].link.linkDisplay;
      const price = data.resultGroups[0].hits[0].lastPrice;
      const currency = data.resultGroups[0].hits[0].currency;

      const response = `${name} - ${price}${currency}`;

      return response;
    }
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

const stock = {
  callback,
  description,
  name,
  options,
};

export default stock;
