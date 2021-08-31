import axios from 'axios';
import { ApplicationCommandOptionType } from 'discord-api-types/v9';
import { Interaction } from 'discord.js';
import { IOption } from '../commands';

// Imports API key from .env file
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

const name = 'weather';

const description = 'Sends the weather for a given city';

const callback = async (interaction: Interaction) => {
  // Sets the city to the first argument
  const city = interaction.options.get('city')!.value;
  try {
    // Gets the weather from the API
    const weather = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=en&APPID=${WEATHER_API_KEY}`
    );
    // Sets the temperature to a variable
    const temp = weather.data.main.temp;
    // Sets the weather condition to a variable
    const weatherCondition = weather.data.weather[0].description;

    // Sends the current temperature and weather condition to the user.
    return (
      `The current temperature in *${city}* is: *${temp}*` +
      '\u00B0C' +
      ` and the current weather condition is *${weatherCondition}*`
    );
  } catch (error) {
    // If the city is not found, sends an error message. Users cannot use Å, Ä and Ö.
    return `Could not find weather data for *${city}* 😢 *Try again without using Å, Ä and Ö* `;
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
