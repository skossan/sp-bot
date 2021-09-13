import axios from 'axios';
import { ApplicationCommandOptionType } from 'discord-api-types/v9';
import { Interaction } from 'discord.js';
import { IOption } from '../commands';

const { WEATHER_API_KEY } = process.env;

const name = 'weather';

const description = 'Sends the weather for a given city';

const callback = async (interaction: Interaction) => {
  if (!interaction.isCommand()) throw new Error('Not a command.');

  const userInput = interaction.options.get('city')!.value as string;
  const city = encodeURIComponent(userInput);
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=en&APPID=${WEATHER_API_KEY}`
    );

    const temp = Math.round(data.main.temp);

    const weatherCondition = data.weather[0].description;

    return `The current temperature in *${userInput}* is *${temp}* °C and the current weather condition is *${weatherCondition}*`;
  } catch (error: unknown) {
    if (!axios.isAxiosError(error)) {
      return 'Something went wrong 😢';
    }

    const { message } = error;

    if (message === 'city not found') {
      return `Could not find city *${city}*`;
    }

    if (
      message ===
      'Invalid API key. Please see http://openweathermap.org/faq#error401 for more info.'
    ) {
      return 'Missing API key 😢';
    }

    return 'Something went wrong 😢';
  }
};

const options: IOption[] = [
  {
    type: ApplicationCommandOptionType.String,
    name: 'city',
    description: 'What is the city?',
    required: true,
  },
];

const weather = {
  callback,
  description,
  name,
  options,
};

export default weather;
