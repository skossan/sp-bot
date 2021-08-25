# SP-Bot

This is the official Discord bot for the *Svensk Programmering* discord server.
It's an open-source project for all of our members.

The goal of this project is to engage the community in a fun and collaborative way!

If you are interested you can join the discord server via this [link](https://discord.gg/Y3qKmXyPmM).

## Installation

Clone the repo and then execute the following command:
```bash
npm install
npm run start
```


## Adding commands
If you want to add new command to the bot you are required to follow the file/command structure.

1. Create a `.js` file in the commands folder. The name of the file should be the name of the command.
2. Export a `messageKey` and a `callback` function inside the file (see the other files for examples).
3. Be sure to export your file in side the `index.js` file located in `./commands/index.js`.


## Contributing

Contributions are always welcome.

Every contributor will be added to the list. 

- [@rasmuselmgren](https://www.github.com/rasmuselmgren)
- [@stefangeneralao](https://www.github.com/stefangeneralao)
