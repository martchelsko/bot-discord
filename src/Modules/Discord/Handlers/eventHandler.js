const fs = require("fs");
const colors = require("colors");

async function startEVHandler(client) {
  fs.readdir(`./src/Modules/Discord/Events/`, (err, files) => {
    if (err)
      return console.log(`[EVENT HANDLER]`.red + ` Ocorreu um erro ao obter a lista de eventos. ` + `${err}`.red);
    console.log(colors.cyan("[Info] ") + "Importação dos eventos iniciada!\n");

    const jsfile = files.filter((f) => f.split(".").pop() === "js");
    jsfile.forEach((f, i) => {
      console.log(colors.red("-> ") + ("O evento " + colors.green(f) + " foi carregado com sucesso."));
      if (err) console.log(colors.red("-> ") + "O evento " + colors.red(f) + " não foi carregado com sucesso.");

      const event = require(`../Events/${f}`);
      const eventName = f.split(".js")[0];
      client.on(eventName, event.bind(null, client));
    });
  });
}

module.exports = { startEVHandler };