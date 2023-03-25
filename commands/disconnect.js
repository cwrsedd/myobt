const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "disconnect",
  description: "Pare a musica",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["leave", "exit", "quit", "dc", "stop"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!message.member.voice.channel)
      return client.sendTime(
        message.channel,
        "❌ | **Tu tem que estar em um canal pra usar esse comando feio**"
      );
    if (!player)
      return client.sendTime(
        message.channel,
        "❌ | **Tem nada tocando agora feio, deixa de ser burro**"
      );
    await client.sendTime(message.channel, ":notes: | **Me desconectasse feio**");
    await message.react("✅");
    player.destroy();
  },

  SlashCommand: {
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
          "❌ | **Tu tem que estar em um canal pra usar esse comando feio**"
        );
      if (
        guild.me.voice.channel &&
        !guild.me.voice.channel.equals(member.voice.channel)
      )
        return client.sendTime(
          interaction,
          `❌ | **Feio tu tem que estar no canal ${guild.me.voice.channel} pra usar esse comando**`
        );

      let player = await client.Manager.get(interaction.guild_id);
      if (!player)
        return client.sendTime(
          interaction,
          "❌ | **Tem nada tocando agora feio, deixa de ser burro**"
        );
      player.destroy();
      client.sendTime(interaction, ":notes: | **Me desconectasse feio**");
    },
  },
};
