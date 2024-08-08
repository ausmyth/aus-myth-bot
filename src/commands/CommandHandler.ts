import { Client, CommandInteraction } from "discord.js";
import { Command } from "./Command";

export class CommandHandler {
  private commands: Map<string, Command>;

  constructor(commands: Command[]) {
    this.commands = new Map(commands.map((cmd) => [cmd.name, cmd]));
  }

  async handleInteraction(client: Client, interaction: CommandInteraction) {
    const command = this.commands.get(interaction.commandName);
    if (command) {
      await command.run(client, interaction);
    }
  }
}
