const Discord = require("discord.js");
const config = require("../../../config.json");
const { JsonDB, Config } = require("node-json-db");

const db = new JsonDB(new Config("database", true, false, "/"));

module.exports = async (client, member) => {

  if (config.functions.autoRole) {
    try {
      const roleId = await db.getData(`/autorole_${member.guild.id}`).catch(() => null);

      if (roleId) {
        const giveRole = member.guild.roles.cache.get(roleId);
        if (giveRole) {
          await member.roles.add(giveRole.id);
        }
      }
    } catch (err) {
      console.log(`[AUTO-ROLE ERROR]`, err);
    }
  }

  if (config.functions.joinMessage) {
    let channel = member.guild.channels.cache.get(config.functions.joinMessage.channelId);

    if (channel) {
      let embed = new Discord.EmbedBuilder()
        .setColor("#DAA520")
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setTitle("👋 Bem-vindo(a) a Evolve!")
        .setDescription(
          `Olá ${member}, seja muito bem-vindo(a) à comunidade **${member.guild.name}**!\n\n` +
          `• Atualmente estamos com **${member.guild.memberCount}** membros.\n` +
          `• Não deixe de conferir as regras e solicitar seus cargos nos canais correspondentes!`
        )
        .setTimestamp()
        .setFooter({ text: `Developed by Reborn!` });

      await channel?.send({ content: `${member}`, embeds: [embed] }).catch((err) => console.log(err));
    }
  }
};