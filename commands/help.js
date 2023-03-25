const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description: "Informações sobre o bot",
  usage: "[command]",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["command", "commands", "cmd"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let Commands = client.commands.map(
      (cmd) =>
        `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
          cmd.name
        }${cmd.usage ? " " + cmd.usage : ""}\` - ${cmd.description}`
    );

    let Embed = new MessageEmbed()
      .setAuthor(
        `Comandos de ${client.user.username}`,
        client.botconfig.IconURL
      )
      .setColor(client.botconfig.EmbedColor)
      .setFooter(
        `Para saber sobre cada comando digite ${
          GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
        }help [Comando] | Tenha um péssimo dia!`
      ).setDescription(`${Commands.join("\n")}
  
  Versão do NegoBet: v${require("../package.json").version}
  [✨ Servidor de suporte](${
    client.botconfig.SupportServer
  }) | [GitHub](https://github.com/SudhanPlayz/Discord-MusicBot) | [Dashboard](${
      client.botconfig.Website
    }) | By [SudhanPlayz](https://github.com/SudhanPlayz)`);
    if (!args[0]) message.channel.send(Embed);
    else {
      let cmd =
        client.commands.get(args[0]) ||
        client.commands.find((x) => x.aliases && x.aliases.includes(args[0]));
      if (!cmd)
        return client.sendTime(
          message.channel,
          `❌ | Feio não achei esse comando`
        );

      let embed = new MessageEmbed()
        .setAuthor(`Comando: ${cmd.name}`, client.botconfig.IconURL)
        .setDescription(cmd.description)
        .setColor("GREEN")
        //.addField("Name", cmd.name, true)
        .addField("Atalhos", `\`${cmd.aliases.join(", ")}\``, true)
        .addField(
          "Uso",
          `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
            cmd.name
          }${cmd.usage ? " " + cmd.usage : ""}\``,
          true
        )
        .addField(
          "Permissões",
          "Membro: " +
            cmd.permissions.member.join(", ") +
            "\nBot: " +
            cmd.permissions.channel.join(", "),
          true
        )
        .setFooter(
          `Prefix - ${
            GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
          }`
        );

      message.channel.send(embed);
    }
  },

  SlashCommand: {
    options: [
      {
        name: "command",
        description: "Receba informação de um comando especifico",
        value: "command",
        type: 3,
        required: false,
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
      let Commands = client.commands.map(
        (cmd) =>
          `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
            cmd.name
          }${cmd.usage ? " " + cmd.usage : ""}\` - ${cmd.description}`
      );

      let Embed = new MessageEmbed()
        .setAuthor(
          `Comandos de ${client.user.username}`,
          client.botconfig.IconURL
        )
        .setColor(client.botconfig.EmbedColor)
        .setFooter(
          `Para sobre cada comando digite ${
            GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
          }help [Comando] | Tenha um péssimo dia!`
        ).setDescription(`${Commands.join("\n")}
  
  Versão do NegoBet: v${require("../package.json").version}
  [✨ Servidor de Suporte](${
    client.botconfig.SupportServer
  }) | [GitHub](https://github.com/SudhanPlayz/Discord-MusicBot) | [Dashboard](${
        client.botconfig.Website
      }) | By [SudhanPlayz](https://github.com/SudhanPlayz)`);
      if (!args) return interaction.send(Embed);
      else {
        let cmd =
          client.commands.get(args[0].value) ||
          client.commands.find(
            (x) => x.aliases && x.aliases.includes(args[0].value)
          );
        if (!cmd)
          return client.sendTime(
            interaction,
            `❌ | Feio não achei esse comando`
          );

        let embed = new MessageEmbed()
          .setAuthor(`Comando: ${cmd.name}`, client.botconfig.IconURL)
          .setDescription(cmd.description)
          .setColor("GREEN")
          //.addField("Name", cmd.name, true)
          .addField("Atalhos", cmd.aliases.join(", "), true)
          .addField(
            "Uso",
            `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
              cmd.name
            }\`${cmd.usage ? " " + cmd.usage : ""}`,
            true
          )
          .addField(
            "Permissões",
            "Membro: " +
              cmd.permissions.member.join(", ") +
              "\nBot: " +
              cmd.permissions.channel.join(", "),
            true
          )
          .setFooter(
            `Prefix - ${
              GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
            }`
          );

        interaction.send(embed);
      }
    },
  },
};
