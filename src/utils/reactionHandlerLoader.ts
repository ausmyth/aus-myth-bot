import { readdirSync } from "fs";
import path from "path";
import { Message } from "discord.js";

// Type definition for reaction handler functions
type ReactionHandler = (message: Message) => Promise<void>;

export function loadReactionHandlers(): ReactionHandler[] {
  const handlers: ReactionHandler[] = [];
  const handlerFiles = readdirSync(
    path.join(__dirname, "../messageCommands")
  ).filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

  for (const file of handlerFiles) {
    const handlerModule = require(path.join(
      __dirname,
      "../messageCommands",
      file
    ));
    for (const key in handlerModule) {
      if (typeof handlerModule[key] === "function") {
        handlers.push(handlerModule[key] as ReactionHandler);
      }
    }
  }

  return handlers;
}
