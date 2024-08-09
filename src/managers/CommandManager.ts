import { Client, CommandInteraction, REST, Routes } from "discord.js";
import { readdirSync } from "fs";
import path from "path";
import { Command } from "../types/Command";
import { CONFIG } from "../utils/config";

export class CommandManager {
  private commands: Map<string, Command>;
  private commandMetrics: Map<string, number>;

  constructor() {
    this.commands = new Map();
    this.commandMetrics = new Map();
    this.loadCommands();
  }

  private loadCommands() {
    const commandFiles = readdirSync(
      path.join(__dirname, "../commands")
    ).filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

    for (const file of commandFiles) {
      const commandModule = require(path.join(__dirname, "../commands", file));
      const command = commandModule.default || Object.values(commandModule)[0];
      if (command && command.name && command.description && command.type) {
        this.commands.set(command.name, command);
      }
    }

    console.log(
      `Loaded ${this.commands.size} commands: ${Array.from(
        this.commands.keys()
      ).join(", ")}`
    );
  }

  async registerCommands(client: Client) {
    const rest = new REST({ version: "9" }).setToken(
      CONFIG.discordToken as string
    );

    try {
      console.log("Registering commands...");

      const clientId = client.user!.id;

      await rest.put(
        Routes.applicationGuildCommands(clientId, CONFIG.guildId as string),
        {
          body: Array.from(this.commands.values()),
        }
      );

      console.log("Commands registered successfully.");
    } catch (error) {
      console.error("Error registering commands:", error);
    }
  }

  async handleInteraction(client: Client, interaction: CommandInteraction) {
    const command = this.commands.get(interaction.commandName);
    if (command) {
      await command.run(client, interaction);

      // Track metrics
      const currentCount = this.commandMetrics.get(command.name) || 0;
      this.commandMetrics.set(command.name, currentCount + 1);

      console.log(
        `Triggered command: ${command.name}, Total count this instance: ${
          currentCount + 1
        }`
      );
    }
  }

  // Optionally, a method to log or persist metrics
  logMetrics() {
    console.log("Command usage metrics:");
    for (const [command, count] of this.commandMetrics.entries()) {
      console.log(`${command}: ${count} times`);
    }
  }
}
