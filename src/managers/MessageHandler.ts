import { Message } from "discord.js";
import { readdirSync } from "fs";
import path from "path";

type MessageCommand = {
  name: string;
  trigger: string | RegExp;
  run: (message: Message) => Promise<void>;
};

export class MessageHandler {
  private commands: Map<string | RegExp, MessageCommand>;
  private commandMetrics: Map<string, number>;

  constructor() {
    this.commands = new Map();
    this.commandMetrics = new Map();
    this.loadMessageCommands();
  }

  private loadMessageCommands() {
    const commandFiles = readdirSync(
      path.join(__dirname, "../messageCommands")
    ).filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

    for (const file of commandFiles) {
      const commandModule = require(path.join(
        __dirname,
        "../messageCommands",
        file
      ));
      const command: MessageCommand =
        commandModule.default || Object.values(commandModule)[0];

      if (command && command.trigger && typeof command.run === "function") {
        this.commands.set(command.trigger, command);
      }
    }

    // Log the names of the commands
    console.log(
      `Loaded ${this.commands.size} message commands: ${Array.from(
        this.commands.values()
      )
        .map((cmd) => cmd.name)
        .join(", ")}`
    );
  }

  async handleMessage(message: Message) {
    if (message.author.bot) return;

    for (const [trigger, command] of this.commands.entries()) {
      if (
        (typeof trigger === "string" && message.content.includes(trigger)) ||
        (trigger instanceof RegExp && trigger.test(message.content))
      ) {
        await command.run(message);

        // Track metrics
        const currentCount =
          this.commandMetrics.get(command.trigger.toString()) || 0;
        this.commandMetrics.set(command.trigger.toString(), currentCount + 1);
        console.log(
          `Triggered command: ${command.trigger}, Total count this instance: ${
            currentCount + 1
          }`
        );
      }
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
