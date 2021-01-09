module.exports = {
    name: 'ping',
    description: 'Ping Command',
    async execute(message, args){
        const msg = await message.channel.send("Pinging...");
        const ping = Math.round(msg.createdTimestamp - message.createdTimestamp);
        if (ping <= 0) {
        return msg.edit("Please try again...");
        }
        return msg.edit(`🏓 P${"o".repeat(Math.ceil(ping / 100))}ng: \`${ping}ms\``);
    },

};