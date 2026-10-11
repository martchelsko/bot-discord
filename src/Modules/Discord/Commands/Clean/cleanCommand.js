const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clean")
    .setDescription("Limpa todo o histórico de mensagens do canal atual")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({
        content: `❌ Apenas administradores podem usar este comando, ${interaction.user}!`,
        flags: [MessageFlags.Ephemeral],
      });
    }

    const canal = interaction.channel;

    await interaction.reply({
      content: `🧹 Iniciando a limpeza completa do canal ${canal}, ${interaction.user}...`,
      flags: [MessageFlags.Ephemeral],
    });

    try {
      let totalDeletadas = 0;
      let mensagens;

      do {
        mensagens = await canal.messages.fetch({ limit: 100 });

        if (mensagens.size > 0) {
          const deletadas = await canal.bulkDelete(mensagens, true);
          totalDeletadas += deletadas.size;

          if (mensagens.size < 100 || deletadas.size === 0) break;
        }
      } while (mensagens.size > 0);

      const avisoFinal = await canal.send(`🧹 Canal limpo com sucesso! **${totalDeletadas}** mensagens recentes foram apagadas por ${interaction.user}.`);
      setTimeout(() => avisoFinal.delete().catch(() => { }), 5000);

    } catch (error) {
      console.error("Erro ao limpar o canal:", error);
      await interaction.followUp({
        content: `❌ Ocorreu um erro ao tentar limpar o canal, ${interaction.user}. Lembre-se que o Discord não permite apagar mensagens com mais de 14 dias em massa.`,
        flags: [MessageFlags.Ephemeral],
      });
    }
  },
};