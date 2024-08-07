import { CommandInteraction, Client } from "discord.js";
import { Command } from "../Command";

export const TalalCheck: Command = {
    name: "talalcheck",
    description: "Talal farming pet check!",
    type: 1,
    run: async (client: Client, interaction: CommandInteraction) => {
        const content = "Talal still does NOT have the farming pet.";

        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
};