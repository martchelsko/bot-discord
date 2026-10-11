const colors = require("colors");
const config = require("../../../config.json");
const { ActivityType } = require("discord.js");

module.exports = async (client) => {
  console.log(
    `\n[+] `.green +
    `Autenticado como ` +
    `${client.user.username}`.yellow +
    ` com sucesso! Estou em ` +
    `${client.guilds.cache.size}`.yellow +
    ` servidores!`
  );

  client.user.setPresence({
    activities: [{ name: `Developed by Reborn!`, type: ActivityType.Playing }],
    status: "online",
  });
};