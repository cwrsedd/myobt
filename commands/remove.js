const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
  name: "remove",
  description: `Remove uma musica da fila`,
  usage: "[number]",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["rm"],

  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.players.get(message.guild.id);
    const song = player.queue.slice(args[0] - 1, 1);
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

    if (!player.queue || !player.queue.length || player.queue.length === 0)
      return message.channel.send("Feio deixa de ser burro não tem nada na fila");
    let rm = new MessageEmbed()
      .setDescription(
        `✅ **|** Removi a faixa **\`${Number(args[0])}\`** da fila feio!`
      )
      .setColor("GREEN");
    if (isNaN(args[0]))
      rm.setDescription(
        `**Feio é assim que se usa - **${client.botconfig.prefix}\`remove [track]\``
      );
    if (args[0] > player.queue.length)
      rm.setDescription(`A fila tem ${player.queue.length} musicas!`);
    await message.channel.send(rm);
    player.queue.remove(Number(args[0]) - 1);
  },

  SlashCommand: {
    options: [
      {
        name: "track",
        value: "[track]",
        type: 4,
        required: true,
        description: "Remove uma musica da fila",
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
      let player = await client.Manager.get(interaction.guild_id);
      const guild = client.guilds.cache.get(interaction.guild_id);
      const member = guild.members.cache.get(interaction.member.user.id);
      const song = player.queue.slice(args[0] - 1, 1);
      if (!player)
        return client.sendTime(
          interaction,
          "❌ | **Tem nada tocando agora feio, deixa de ser burro**"
        );
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

      if (!player.queue || !player.queue.length || player.queue.length === 0)
        return client.sendTime("❌ | **Tem nada tocando agora feio, deixa de ser burro**");
      let rm = new MessageEmbed()
        .setDescription(
          `✅ | **Removi a faixa** \`${Number(args[0])}\` da fila feio!`
        )
        .setColor("GREEN");
      if (isNaN(args[0]))
        rm.setDescription(`**Uso:** \`${GuildDB.prefix}remove [track]\``);
      if (args[0] > player.queue.length)
        rm.setDescription(`A fila tem ${player.queue.length} musicas!`);
      await interaction.send(rm);
      player.queue.remove(Number(args[0]) - 1);
    },
  },
};
