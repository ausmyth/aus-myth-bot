import { readdirSync } from "fs";
import path from "path";
import { Command } from "../commands/Command";

export function loadCommands(): Command[] {
  return readdirSync(path.join(__dirname, "../commands"))
    .filter((file) => file.endsWith(".ts") || file.endsWith(".js"))
    .flatMap((file) => {
      const commandModule = require(path.join(__dirname, "../commands", file));
      const command = commandModule.default || Object.values(commandModule)[0];
      return command && command.name && command.description && command.type
        ? [command]
        : [];
    });
}
