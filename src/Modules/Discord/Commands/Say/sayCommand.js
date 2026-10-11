const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Emite uma mensagem oficial através do bot em formato de Embed")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(option =>
      option
        .setName("mensagem")
        .setDescription("Escreva a mensagem do anúncio")
        .setRequired(true)
    )
    .addChannelOption(option =>
      option
        .setName("canal")
        .setDescription("Selecione o canal onde a mensagem será enviada")
        .setRequired(true)
    ),

  async execute(interaction) {
    const msg = interaction.options.getString("mensagem");
    const canal = interaction.options.getChannel("canal");

    const embed = new EmbedBuilder()
      .setTitle("📢 Anúncio Oficial - Evolve")
      .setColor("#DAA520")
      .setDescription(`${msg}`)
      .setTimestamp()
      .setFooter({ text: `Developed by Reborn!` });

    await canal.send({ embeds: [embed] });

    await interaction.reply({
      content: `✅ Sua mensagem foi enviada com sucesso no canal ${canal}, ${interaction.user}!`,
      ephemeral: true,
    });
  },
};