const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
  name: "pause",
  description: "Pausa a musica",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: [],
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
        "❌ | **Tem nada tocando agora feio, deixa de ser burro**"
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
    if (player.paused)
      return client.sendTime(
        message.channel,
        "❌ | **A musica ja ta pausada feio te acalma**"
      );
    player.pause(true);
    let embed = new MessageEmbed()
      .setAuthor(`Pausado!`, client.botconfig.IconURL)
      .setColor(client.botconfig.EmbedColor)
      .setDescription(`Escreva \`${GuildDB.prefix}resume\` para continuar tocando`);
    await message.channel.send(embed);
    await message.react("✅");
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
          "❌ | **Tem que estar no mesmo canal que eu pra usar esse comando feio**"
        );

      let player = await client.Manager.get(interaction.guild_id);
      if (!player)
        return client.sendTime(
          interaction,
          "❌ | **Tem nada tocando agora feio, deixa de ser burro**"
        );
      if (player.paused)
        return client.sendTime(interaction, "Musica ja ta tocando feio, deixa de ser burro");
      player.pause(true);
      client.sendTime(interaction, "**⏸ Pausado!**");
    },
  },
};
