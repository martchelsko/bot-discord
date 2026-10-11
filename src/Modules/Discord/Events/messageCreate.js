module.exports = async (client, message) => {
  if (message.author.bot) return;

  const linksSuspeitos = [
    // Falsos Nitros e Prêmios
    "discord-nitro",
    "free-nitro",
    "nitro-drop",
    "nitro-gift",
    "steam-gift",
    "steamcommunity-gift",
    "discord-gifts",
    "discord.gift/",
    "nitro-giveaway",
    "airdrop-crypto",

    // Golpes da Steam (Skins, Carteira e Phishing)
    "steam-wallet",
    "steamwallet",
    "free-steam",
    "cs2-giveaway",
    "csgo-skins",
    "cs2-skins",
    "dota-skins",
    "rust-skins",
    "steam-login",
    "steambonus",
    "steam-promo",
    "wallet-code",
    "steamcommunity.com.ru", // Exemplo de domínio falso comum
    "stеamcommunity", // Note o 'е' latino ou caracteres parecidos usados para enganar

    // Encurtadores e IP Loggers comuns
    "grabify.link",
    "yip.su",
    "iplogger.",
    "2giga.link",
    "discord-app.link",
    "steam-nitro.link",

    // Esquemas de Ganhos / Bots de Divulgação
    "ganhe dinheiro",
    "renda extra",
    "trabalhe em casa",
    "fature em dólar",
    "tiktok.com/@",
    "t.me/",
    "crypto-giveaway",
  ];

  const conteudoMensagem = message.content.toLowerCase();
  const encontrouGolpe = linksSuspeitos.some((termo) =>
    conteudoMensagem.includes(termo),
  );

  if (encontrouGolpe) {
    try {
      await message.delete();
      const aviso = await message.channel.send(
        `Olá ${message.author}, aqui não é permitido a divulgação desse tipo de conteúdo! 🛑`,
      );

      setTimeout(() => {
        aviso.delete().catch(() => {});
      }, 6000);
    } catch (error) {
      console.error("Erro ao tentar apagar mensagem suspeita:", error);
    }
  }
};
