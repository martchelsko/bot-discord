const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { JsonDB, Config } = require("node-json-db");

const db = new JsonDB(new Config("database", true, false, "/"));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setautorole")
    .setDescription("Defina um cargo automático para novos membros")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addRoleOption(option =>
      option
        .setName("role")
        .setDescription("O cargo que será atribuído automaticamente")
        .setRequired(true)
    ),

  async execute(interaction) {
    const role = interaction.options.getRole("role");

    await db.push(`/autorole_${interaction.guild.id}`, role.id);

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setDescription(`✅ Cargo automático definido com sucesso para: ${role}`)
      .setFooter({ text: "Developed by Reborn!" });

    await interaction.reply({ embeds: [embed] });
  },
};