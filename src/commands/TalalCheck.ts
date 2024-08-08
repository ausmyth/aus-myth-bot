import { CommandInteraction, Client } from "discord.js";
import { Command } from "./Command";

export class TalalCheckCommand implements Command {
  name = "talalcheck";
  description = "Talal farming pet check!";

  async run(client: Client, interaction: CommandInteraction) {
    const content = "Talal still does NOT have the farming pet.";
    await interaction.reply({
      ephemeral: true,
      content,
    });
  }
}
