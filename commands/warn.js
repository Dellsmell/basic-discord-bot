module.exports = {
    name: 'warn',
    description: 'warn Command',
    async execute(message, args){
        message.channel.send('This command is currently disabled!')
    },

};