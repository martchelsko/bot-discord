const { InteractionType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits, MessageFlags } = require("discord.js");
const colors = require("colors");

module.exports = async (client, interaction) => {
  if (interaction.isChatInputCommand()) {
    let findCommand = client.commands.get(interaction.commandName);
    if (!findCommand) return;
    try {
      await findCommand.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: `Ocorreu um erro, ${interaction.user}!`, flags: MessageFlags.Ephemeral }).catch(() => { });
    }
    return;
  }
  
  if (interaction.isStringSelectMenu() && interaction.customId === "role_request_menu") {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    const selectedRole = interaction.values[0];
    const formattedRoleName = selectedRole.toUpperCase();

    return interaction.editReply({
      content: `✅ ${interaction.user}, sua solicitação para o cargo **${formattedRoleName}** foi registrada com sucesso!`,
    });
  }
};