import { Message } from "discord.js";

export async function handleByeBotReaction(message: Message) {
  if (message.content.toLowerCase() === "bye") {
    await message.react("👋");
  }
}
