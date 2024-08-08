import { Message } from "discord.js";

export async function helloBot(message: Message): Promise<void> {
  if (message.content.toLowerCase() === "hello bot") {
    await message.react("👋");
  }
}
