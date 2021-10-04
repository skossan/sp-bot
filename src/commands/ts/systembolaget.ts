import axios from 'axios';
import { ApplicationCommandOptionType } from 'discord-api-types/v9';
import { Interaction } from 'discord.js';
import { IOption } from '../commands';
import { DateTime } from 'luxon';
import { toTitleCase } from '../../utils/strings';

interface IOpeningHours {
  date: string;
  openFrom: string;
  openTo: string;
  reason: string;
}

interface ISystembolagetResponse {
  city: string;
  openingHours: IOpeningHours[];
  alias: string;
  searchArea: string;
  address: string;
  isOpen: boolean;
  position: { latitude: number; longitude: number };
}

const name = 'systembolaget';

const description = 'Systembolaget opening hours';

const callback = async (interaction: Interaction) => {
  if (!interaction.isCommand()) throw new Error('Not a command.');

  const city = interaction.options.get('city')!.value as string;

  const showopenonly =
    (interaction.options.get('showopenonly')?.value as boolean) || false;

  try {
    const { data } = await axios.get<ISystembolagetResponse[]>(
      'https://api-extern.systembolaget.se/site/V2/Store',
      {
        headers: {
          'Ocp-Apim-Subscription-Key': '36315f58468d4419a86bd7a5edabe800',
        },
      }
    );

    const filteredByCity = data.filter(
      (store) => store.city?.toLowerCase() === city.toLowerCase()
    );

    const stores = filteredByCity.map(
      ({ city, openingHours, address, isOpen, position }) => ({
        city: toTitleCase(city),
        address: address,
        openingHours: openingHours
          .slice(0, 7)
          .map(({ date, openFrom, openTo }) => ({
            day: `${DateTime.fromISO(date).weekdayLong}`,
            time: `${openFrom.split(':').slice(0, -1).join(':')} - ${openTo
              .split(':')
              .slice(0, -1)
              .join(':')}`,
          })),
        isOpen,
        longitude: position.longitude,
        latitude: position.latitude,
      })
    );

    if (!stores.length) {
      return `No Systembolaget in ${city} :weary:`;
    }

    const stringifiedStores = stores
      .filter(({ isOpen }) => !showopenonly || isOpen)
      .map((store) => {
        const googleMapsUrl = `https://www.google.com/maps/@${store.latitude},${store.longitude},20z`;

        const name = `**${store.city}:** ${store.address}`;

        const openingHours = `${store.openingHours
          .map(({ day, time }) => `**${day}:** ${time}`)
          .join('\n')}`;

        return [googleMapsUrl, name, openingHours].join('\n');
      });

    return [
      `I found ${stringifiedStores.length}${
        showopenonly ? ' open ' : ' '
      }Systembolaget in ${toTitleCase(city)} :beers:`,
      ...stringifiedStores,
    ];
  } catch (e: any) {
    console.error(e.response.request.data.message);
    return 'systembolaget';
  }
};

const options: IOption[] = [
  {
    type: ApplicationCommandOptionType.String,
    name: 'city',
    description: 'City name',
    required: true,
  },
  {
    type: ApplicationCommandOptionType.Boolean,
    name: 'showopenonly',
    description: 'Show only open stores',
    required: false,
  },
];

const systembolaget = { name, callback, description, options };

export default systembolaget;
