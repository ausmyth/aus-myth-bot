import { Message } from "discord.js";

const trigger = "bye bot";

export default {
  name: "Bye Bot",
  trigger,
  run: async (message: Message): Promise<void> => {
    if (message.content.toLowerCase() === trigger) {
      await message.react("🚪");
    }
  },
};
