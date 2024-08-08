import { Message } from "discord.js";

export async function handleByeBot(message: Message) {
  if (message.content.toLowerCase() === "bye bot") {
    await message.react("🚪");
  }
}
