const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
  name: "volume",
  description: "Ver ou alterar volume",
  usage: "<volume>",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["vol", "v"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!player)
      return client.sendTime(
        message.channel,
        "❌ | **Não tem nada tocando agora feio**"
      );
    if (!args[0])
      return client.sendTime(
        message.channel,
        `🔉 | O volume atual é \`${player.volume}\`feio.`
      );
    if (!message.member.voice.channel)
      return client.sendTime(
        message.channel,
        "❌ | **Tu tem que estar em um canal pra usar esse comando feio**"
      );
    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return client.sendTime(
        message.channel,
        "❌ | **Tem que estar no mesmo canal que eu pra usar esse comando feio**"
      );
    if (!parseInt(args[0]))
      return client.sendTime(
        message.channel,
        `**Feio podes escolher um numero entre** \`1 - 10000\``
      );
    let vol = parseInt(args[0]);
    if (vol < 0 || vol > 10000) {
      return client.sendTime(
        message.channel,
        "❌ | **O feio escolhe um numero entre `1-10000`**"
      );
    } else {
      player.setVolume(vol);
      client.sendTime(
        message.channel,
        `🔉 | **O volume foi setado pra** \`${player.volume}\`caralho`
      );
    }
  },
  SlashCommand: {
    options: [
      {
        name: "amount",
        value: "amount",
        type: 4,
        required: false,
        description: "Escolhe a porra de um volume entre 1 e 10000. O padrão é 100.",
      },
    ],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, interaction, args, { GuildDB }) => {
      const guild = client.guilds.cache.get(interaction.guild_id);
      const member = guild.members.cache.get(interaction.member.user.id);

      if (!member.voice.channel)
        return client.sendTime(
          interaction,
          "❌ | Tu tem que estar em um canal pra usar esse comando feio."
        );
      if (
        guild.me.voice.channel &&
        !guild.me.voice.channel.equals(member.voice.channel)
      )
        return client.sendTime(
          interaction,
          "❌ | **Tem que estar no mesmo canal que eu pra usar esse comando feio**"
        );
      let player = await client.Manager.get(interaction.guild_id);
      if (!player)
        return client.sendTime(
          interaction,
          "❌ | **Não tem nada tocando nessa porra**"
        );
      if (!args[0].value)
        return client.sendTime(
          interaction,
          `🔉 | Feio, o volume atual é \`${player.volume}\`.`
        );
      let vol = parseInt(args[0].value);
      if (!vol || vol < 1 || vol > 10000)
        return client.sendTime(
          interaction,
          `**Feio, escolhe um volume entre** \`1 - 10000\``
        );
      player.setVolume(vol);
      client.sendTime(interaction, `🔉 | Parabens feio, voce aumentou essa porra de volume para \`${player.volume}\``);
    },
  },
};
