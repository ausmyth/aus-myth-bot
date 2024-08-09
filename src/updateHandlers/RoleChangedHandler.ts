import {
  GuildMember,
  PartialGuildMember,
  TextChannel,
  Message,
  AuditLogEvent,
} from "discord.js";
import { CONFIG } from "../utils/config";

export default {
  name: "Role Changed Handler",
  criteria: (
    oldMember: GuildMember | PartialGuildMember,
    newMember: GuildMember | PartialGuildMember
  ) => {
    // Check if the roles have changed
    return oldMember.roles.cache.size !== newMember.roles.cache.size;
  },
  run: async (
    oldMember: GuildMember | PartialGuildMember,
    newMember: GuildMember | PartialGuildMember
  ) => {
    // Get the guild and channel from the newMember
    const guild = newMember.guild;

    // Define the channel ID to send the message to
    const channelId = CONFIG.botChannelId;
    const channel = guild.channels.cache.get(channelId) as TextChannel;

    // Ensure we have valid oldMember and newMember roles
    if (!oldMember.roles || !newMember.roles) {
      console.error("Roles not available for comparison.");
      return;
    }

    // Determine which roles were added or removed
    const oldRoles = oldMember.roles.cache;
    const newRoles = newMember.roles.cache;

    const removedRoles = oldRoles.filter((role) => !newRoles.has(role.id));
    const addedRoles = newRoles.filter((role) => !oldRoles.has(role.id));

    let roleChanges = "";

    if (removedRoles.size > 0) {
      roleChanges += `Roles removed: ${removedRoles
        .map((role) => role.name)
        .join(", ")}. `;
    }

    if (addedRoles.size > 0) {
      roleChanges += `Roles added: ${addedRoles
        .map((role) => role.name)
        .join(", ")}.`;
    }

    // Format the nickname and username
    const nickname = newMember.displayName || newMember.user.username;
    const username = newMember.user.username;

    // Send the initial message
    const messageContent = `Role changed | ${nickname} (${username}) | ${roleChanges}`;
    let message: Message;

    if (channel) {
      message = await channel.send(messageContent);
    } else {
      console.error("Channel not found or is not a text channel.");
      return;
    }

    // Wait for 5 seconds
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Fetch audit logs to find the responsible moderator
    try {
      const auditLogs = await guild.fetchAuditLogs({
        limit: 1,
        type: AuditLogEvent.MemberRoleUpdate,
      });
      const auditEntry = auditLogs.entries.first();

      let moderator = "Unknown";

      if (auditEntry) {
        const executor = auditEntry.executor;
        if (executor) {
          moderator = executor.tag;
        }
      }

      // Edit the message to include the moderator information
      const updatedContent = `${messageContent} | Done by ${moderator}`;
      await message.edit(updatedContent);
    } catch (error) {
      console.error("Error fetching audit logs:", error);
    }
  },
};
