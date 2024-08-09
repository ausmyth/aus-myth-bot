import { GuildMember, PartialGuildMember } from "discord.js";
import { readdirSync } from "fs";
import path from "path";

// Define the function type for handling guild member updates
type GuildMemberUpdateFunction = (
  oldMember: GuildMember | PartialGuildMember,
  newMember: GuildMember | PartialGuildMember
) => Promise<void>;

// Define a type for the handler structure
type GuildMemberUpdateHandlerType = {
  name: string;
  criteria: (
    oldMember: GuildMember | PartialGuildMember,
    newMember: GuildMember | PartialGuildMember
  ) => boolean;
  run: GuildMemberUpdateFunction;
};

export class GuildMemberUpdateHandlerManager {
  private handlers: GuildMemberUpdateHandlerType[];
  private handlerMetrics: Map<string, number>;

  constructor() {
    this.handlers = [];
    this.handlerMetrics = new Map();
    this.loadUpdateHandlers();
  }

  private loadUpdateHandlers() {
    const handlerFiles = readdirSync(
      path.join(__dirname, "../updateHandlers")
    ).filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

    for (const file of handlerFiles) {
      const handlerModule = require(path.join(
        __dirname,
        "../updateHandlers",
        file
      ));
      const handler: GuildMemberUpdateHandlerType =
        handlerModule.default || Object.values(handlerModule)[0];
      // Check if `criteria` and `run` are functions, not if they are just defined
      if (
        typeof handler.criteria === "function" &&
        typeof handler.run === "function"
      ) {
        this.handlers.push(handler);
      } else {
        console.warn(`Skipping invalid handler in file: ${file}`);
      }
    }

    // Log the names of the handlers
    console.log(
      `Loaded ${this.handlers.length} update handlers: ${this.handlers
        .map((handler) => handler.name)
        .join(", ")}`
    );
  }

  async handleGuildMemberUpdate(
    oldMember: GuildMember | PartialGuildMember,
    newMember: GuildMember | PartialGuildMember
  ) {
    for (const handler of this.handlers) {
      if (handler.criteria(oldMember, newMember)) {
        await handler.run(oldMember, newMember);

        // Track metrics
        const handlerName = handler.run.name || "Unnamed Handler";
        const currentCount = this.handlerMetrics.get(handlerName) || 0;
        this.handlerMetrics.set(handlerName, currentCount + 1);
        console.log(
          `Triggered handler: ${handlerName}, Total count: ${currentCount + 1}`
        );
      }
    }
  }

  // Optionally, a method to log or persist metrics
  logMetrics() {
    console.log("Guild Member Update handler usage metrics:");
    for (const [handlerName, count] of this.handlerMetrics.entries()) {
      console.log(`${handlerName}: ${count} times`);
    }
  }
}
