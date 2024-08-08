import { CommandInteraction, Client } from "discord.js";

export interface Command {
  name: string;
  description: string;
  options?: any[];
  run(client: Client, interaction: CommandInteraction): Promise<void>;
}
