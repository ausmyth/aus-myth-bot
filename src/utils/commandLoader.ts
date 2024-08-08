import { readdirSync } from "fs";
import path from "path";
import { Command } from "../commands/Command";

export function loadCommands(): Command[] {
  const commands: Command[] = [];
  const commandFiles = readdirSync(path.join(__dirname, "../commands")).filter(
    (file) => file.endsWith(".ts") || file.endsWith(".js")
  );

  for (const file of commandFiles) {
    const command = require(path.join(__dirname, "../commands", file)).default;
    commands.push(command);
  }

  return commands;
}
