import axios from "axios";

export const messageKeyJoke = "joke";

export const callbackJoke = async () => {
  const joke = await axios.get(
    "https://official-joke-api.appspot.com/random_joke"
  );

  return `${joke.data.setup}\n${joke.data.punchline}`;
};
