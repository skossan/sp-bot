import config from '../../config.json';

export const messageKey = 'dm-bot-config';

const allowList = [
  'elmgren#3669',
  'Stefan Generalao#3502',
  'Marcus Rådell#9442',
];

export const callback = (message) => {
  const { tag } = message.author;

  if (!allowList.includes(tag)) {
    return '❌ Please open a PR to the SP-Bot repo with your Discord tag (username#dicriminator) to get access to this command.';
  }

  message.author.send('```\n' + JSON.stringify(config, null, 2) + '```\n');

  return '👍 Check your DMs!';
};

const result = callback({
  author: {
    tag: allowList[0],
    send: (sentMessage) => console.log({ sentMessage }),
  },
});

console.log(result);
