import { Interaction } from 'discord.js';

export interface IOption {
  type: number;
  name: string;
  description: string;
  required: boolean;
}

export interface ICommand {
  name: string;
  description: string;
  options?: IOption[];
  callback: (
    interaction: Interaction
  ) => string | string[] | Promise<string | string[]>;
}
