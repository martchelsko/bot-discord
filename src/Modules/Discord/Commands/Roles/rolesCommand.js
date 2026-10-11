const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, PermissionFlagsBits, MessageFlags } = require("discord.js");

const CANAL_VERIFICACAO_ID = "ID_DO_CANAL_DO_PAINEL_DE_SOLICITACAO_DE_CARGOS"; 

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roles")
    .setDescription("Envia o painel de solicitação de cargos avançados para o canal")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    if (interaction.channelId !== CANAL_VERIFICACAO_ID) {
      return interaction.reply({
        content: `❌ Este comando só pode ser utilizado no canal <#${CANAL_VERIFICACAO_ID}>, ${interaction.user}!`,
        flags: [MessageFlags.Ephemeral],
      });
    }

    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId("role_request_menu")
      .setPlaceholder("🛡️ Selecione o cargo que deseja solicitar...")
      .addOptions([
        { label: "ADMIN", value: "admin", description: "Solicitar cargo de Administrador", emoji: "👑" },
        { label: "MOD", value: "mod", description: "Solicitar cargo de Moderador", emoji: "⚔️" },
        { label: "VIP", value: "vip", description: "Solicitar cargo VIP", emoji: "⭐" },
        { label: "HUNTER", value: "hunter", description: "Solicitar cargo de Caçador de Bosses", emoji: "🏹" },
        { label: "MEMBRO", value: "membro", description: "Solicitar acesso como Membro", emoji: "🛡️" },
      ]);

    const row = new ActionRowBuilder().addComponents(selectMenu);

    const embed = new EmbedBuilder()
      .setColor("#DAA520")
      .setTitle("🛡️ Central de Solicitação de Cargos - Evolve")
      .setDescription(
        `Olá, seja bem-vindo(a)!\n\n` +
        `Deseja obter um cargo especial ou fazer parte da equipe administrativa?\n\n` +
        `Selecione o cargo desejado no menu abaixo para enviar a sua solicitação diretamente para a análise da equipe administrativa!`
      )
      .setFooter({ text: "Developed by Reborn!" });

    await interaction.channel.send({ embeds: [embed], components: [row] });

    await interaction.reply({
      content: `✅ Painel de solicitação de cargos fixado com sucesso, ${interaction.user}!`,
      flags: [MessageFlags.Ephemeral],
    });
  },
};