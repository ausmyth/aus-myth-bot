import { Message } from "discord.js";

const trigger = "hello bot";

export default {
  name: "Hello Bot",
  trigger,
  run: async (message: Message): Promise<void> => {
    if (message.content.toLowerCase() === trigger) {
      await message.react("👋");
    }
  },
};
