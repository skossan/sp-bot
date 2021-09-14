import axios from 'axios';
import { ApplicationCommandOptionType } from 'discord-api-types/v9';
import { Interaction } from 'discord.js';
import { IOption } from '../commands';

const { WEATHER_API_KEY } = process.env;

const name = 'weather';

const description = 'Sends the weather for a given city';

type WeatherCondition =
  | 'clear sky'
  | 'few clouds'
  | 'scattered clouds'
  | 'broken clouds'
  | 'shower rain'
  | 'rain'
  | 'thunderstorm'
  | 'snow'
  | 'mist';

const weatherConditionEmojiLabels: Record<WeatherCondition, string> = {
  'clear sky': ':sunny:',
  'few clouds': ':cloud:',
  'scattered clouds': ':cloud:',
  'broken clouds': ':cloud:',
  'shower rain': ':cloud_rain:',
  rain: ':cloud_rain:',
  thunderstorm: ':cloud_lightning:',
  snow: ':snowflake:',
  mist: ':cloud:',
};

const getConditionEmoji = (condition: WeatherCondition) => {
  return weatherConditionEmojiLabels[condition];
};

const callback = async (interaction: Interaction) => {
  if (!interaction.isCommand()) throw new Error('Not a command.');

  const userInput = interaction.options.get('city')!.value as string;
  const city = encodeURIComponent(userInput);
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=en&APPID=${WEATHER_API_KEY}`
    );

    const { name, weather, main } = data;
    const description = weather[0].description;
    const temp = main.temp;

    return `The current temperature in ${name} is ${Math.round(
      temp
    )} °C with ${description} ${getConditionEmoji(description)}`;
  } catch (error: unknown) {
    if (!axios.isAxiosError(error)) {
      return 'Something went wrong 😢';
    }

    if (error.message === 'city not found') {
      return `Could not find city *${city}*`;
    }

    if (
      error.message ===
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
