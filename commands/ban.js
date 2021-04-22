const Discord = require('discord.js');
const lang = require('../language.json');
module.exports = {
    name: lang.en.ban.cmd_name,
    description: lang.en.ban.cmd_description,
    async execute(message, args) {

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(lang.en.user_noperms);
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(lang.en.misconfigured);
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!args[0]) return message.channel.send(lang.en.ban.user_arg_missing);
        if (!member) return message.channel.send(lang.en.ban.user_not_found);
        if (!member.bannable) return message.channel.send(lang.en.ban.user_unbanable_perms);
        if (member.id === message.author.id) return message.channel.send(lang.en.ban.user_ban_self);
        let lenght = args[1]
        let reason = args.slice(2).join(" ");
        if (!lenght) lenght = 10000;
        if (!reason) reason = lang.en.ban.default_ban_reason;
        member.ban({ days: lenght, reason: reason }).catch(err => {
            console.log(err)
            return message.channel.send(lang.en.general_error)
        })

        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const banembed = new Discord.MessageEmbed()
            .setTitle(lang.en.ban.embed_title)
            .setThumbnail(member.user.displayAvatarURL())
            .addField(lang.en.ban.embed_user_banned_name, member)
            .addField(lang.en.ban.embed_banned_by, message.author)
            .addField(lang.en.ban.embed_reason, reason)
            .setFooter(lang.en.ban.embed_time)
            .setTimestamp()

        message.channel.send(banembed);


    },

};