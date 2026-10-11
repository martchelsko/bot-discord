const Discord = require("discord.js");
const client = new Discord.Client({
  intents: ["Guilds", "GuildPresences", "GuildMembers", "MessageContent", "GuildMessages", "GuildVoiceStates"],
  partials: [Discord.Partials.Channel],
  failIfNotExists: false,
});
const colors = require("colors");

const config = require("./config.json");

const { startEVHandler } = require("./Modules/Discord/Handlers/eventHandler");
const { startCMHandler } = require("./Modules/Discord/Handlers/commandHandler");

console.clear();

startEVHandler(client);

client
  .login(config.bot.token)
  .then(async () => {
    startCMHandler(client, `./src/Modules/Discord/Commands`);
  })
  .catch(async (err) => {
    console.log(`[AUTH] ${err}`.red);
    return process.exit();
  });