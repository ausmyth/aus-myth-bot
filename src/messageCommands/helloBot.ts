import { Message } from "discord.js";

export async function handleHelloBotReaction(message: Message) {
  if (message.content.toLowerCase() === "hello bot") {
    await message.react("👋");
  }
}
