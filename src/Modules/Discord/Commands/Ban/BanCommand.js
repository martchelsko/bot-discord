const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, MessageFlags } = require("discord.js");
const CANAL_BANIMENTO_ID = "ID_DO_CANAL_DE_BANIMENTO";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bane um membro do servidor de forma simples")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption(option =>
      option
        .setName("membro")
        .setDescription("Membro que será banido")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("motivo")
        .setDescription("Motivo do banimento (opcional)")
        .setRequired(false)
    ),

  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({
        content: `❌ Apenas administradores podem usar este comando, ${interaction.user}!`,
        flags: [MessageFlags.Ephemeral],
      });
    }

    const membroAlvo = interaction.options.getMember("membro");
    const motivo = interaction.options.getString("motivo") || "Nenhum motivo informado.";

    if (!membroAlvo) {
      return interaction.reply({
        content: `❌ O usuário mencionado não foi encontrado no servidor, ${interaction.user}.`,
        flags: [MessageFlags.Ephemeral],
      });
    }

    if (!membroAlvo.bannable) {
      return interaction.reply({
        content: `❌ Eu não posso banir este usuário. O cargo dele pode ser superior ao meu ou ele é o dono do servidor, ${interaction.user}.`,
        flags: [MessageFlags.Ephemeral],
      });
    }

    try {
      await membroAlvo.ban({ reason: motivo });

      await interaction.reply({
        content: `✅ O usuário **${membroAlvo.user.tag}** foi banido com sucesso, ${interaction.user}!`,
        flags: [MessageFlags.Ephemeral],
      });

      const canalNotificacao = interaction.guild.channels.cache.get(CANAL_BANIMENTO_ID);

      if (canalNotificacao) {
        const embed = new EmbedBuilder()
          .setColor("#DAA520")
          .setTitle("🔨 Registro de Banimento - Evolve")
          .setDescription(
            `O usuário **${membroAlvo.user.tag}** foi banido do servidor.\n\n` +
            `• **Responsável:** ${interaction.user}\n` +
            `• **Motivo:** ${motivo}`
          )
          .setTimestamp()
          .setFooter({ text: "Developed by Reborn!" });

        await canalNotificacao.send({
          content: "@everyone",
          embeds: [embed],
        });
      }

    } catch (error) {
      console.error("Erro ao executar o comando de ban:", error);
      await interaction.reply({
        content: `❌ Ocorreu um erro ao tentar banir este membro, ${interaction.user}.`,
        flags: [MessageFlags.Ephemeral],
      });
    }
  },
};