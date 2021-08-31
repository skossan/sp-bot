import axios from 'axios';
import { ApplicationCommandOptionType } from 'discord-api-types/v9';
import { Interaction } from 'discord.js';
import { IOption } from '../commands';

const { WEATHER_API_KEY } = process.env;

const name = 'weather';

const description = 'Sends the weather for a given city';

const callback = async (interaction: Interaction) => {
  const city = interaction.options.get('city')!.value;
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=en&APPID=${WEATHER_API_KEY}`
    );

    const temp = data.main.temp;

    const weatherCondition = data.weather[0].description;

    return `The current temperature in *${city}* is *${temp}* °C and the current weather condition is *${weatherCondition}*`;
  } catch (error) {
    return `Something went wrong 😢`;
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
