const axios = require("axios");
const addMessageCreateEvent = require("./addMessageCreateEvent");

addMessageCreateEvent("baba", () => "nana");
addMessageCreateEvent("sping", () => "spong");
addMessageCreateEvent("sjoke", async () => {
  const joke = await axios.get(
    "https://official-joke-api.appspot.com/random_joke"
  );

  return `${joke.data.setup}\n${joke.data.punchline}`;
});
addMessageCreateEvent("banana", () => "apple");
addMessageCreateEvent("who am I", (msg) => msg.author.username);
