const fs = require('fs');
const path = require('path');
const { Events } = require('discord.js');

async function startCMHandler(client) {
    client.commands = new Map();
    const commandsArray = [];

    const categoriesPath = path.join(__dirname, '../Commands');

    if (!fs.existsSync(categoriesPath)) {
        console.log('[HANDLER] A pasta de comandos não foi encontrada.');
        return;
    }

    const categories = fs.readdirSync(categoriesPath);

    for (const category of categories) {
        const categoryPath = path.join(categoriesPath, category);

        if (!fs.statSync(categoryPath).isDirectory()) continue;

        const commandFiles = fs.readdirSync(categoryPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(categoryPath, file);

            delete require.cache[require.resolve(filePath)];
            const command = require(filePath);

            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
                commandsArray.push(command.data.toJSON());
                console.log(`[COMANDO CARREGADO] /${command.data.name}`);
            } else {
                console.log(`[AVISO] O arquivo ${file} não está no padrão moderno (data/execute).`);
            }
        }
    }

    client.once(Events.ClientReady, async () => {
        try {
            await client.application.commands.set(commandsArray);
            console.log('[HANDLER] Todos os comandos modernos foram sincronizados com sucesso!');
        } catch (error) {
            console.error('[ERRO] Falha ao registrar comandos:', error);
        }
    });
}

module.exports = { startCMHandler };