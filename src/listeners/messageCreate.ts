import { Client, Message } from "discord.js";
import { loadReactionHandlers } from "../utils/reactionHandlerLoader";

export default (client: Client): void => {
  const reactionHandlers = loadReactionHandlers();

  client.on("messageCreate", async (message: Message) => {
    if (message.author.bot) return;

    // Apply all loaded reaction handlers
    for (const handleReaction of reactionHandlers) {
      await handleReaction(message);
    }
  });
};
