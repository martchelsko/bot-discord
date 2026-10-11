const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Veja meu ping."),

  async execute(interaction) {
    let embed = new EmbedBuilder()
      .setColor("#DAA520")
      .setDescription(`**\\📡 Meu ping está em** \`${interaction.client.ws.ping}ms\`**.**`)
      .setFooter({ text: `Developed by Reborn!` });

    return interaction.reply({ embeds: [embed], flags: [MessageFlags.Ephemeral] });
  },
};