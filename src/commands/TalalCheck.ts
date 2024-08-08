import { CommandInteraction, Client } from "discord.js";
import { Command } from "./Command";

export const TalalCheck: Command = {
  name: "talalcheck",
  description: "Talal farming pet check!",
  type: 1,
  run: async (client: Client, interaction: CommandInteraction) => {
    const content = "Talal still does NOT have the farming pet.";

    // Ensure the interaction is replied to in time
    await interaction.reply({
      ephemeral: true,
      content,
    });
    // If you want to send a follow-up message later, you can do so.
    // Ensure the interaction is already replied to or deferred.
    await interaction.followUp({
      ephemeral: true,
      content: "Additional information here.",
    });
  },
};
