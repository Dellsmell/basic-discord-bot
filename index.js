//Requiring Discord.js as Discord
const Discord = require('discord.js');

//Requiring Node.js built in file System
const fs = require('fs');

//creating new discord Client
const client = new Discord.Client();

//Creating a collection of all commands useing discords built in collections
//See https://discordjs.guide/additional-info/collections.html#array-like-methods  For mor info
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//Requireing the prefix and token from the config.json file
const {
    prefix,
    token,
} = require('./config.json');

//Checking if the token feild in config.json has data
if (!token) {
    console.error('Please insert your bot Token in the config.json file!'); return;};

//Once the client returns 'Ready' log that the bot was started
client.once('ready', () => {
    console.log('Bot Started.');
});

//Regestering commands dynamically
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
};

//When the bot sees a message
client.on('message', message => {

    //Check if the content does not start with the prefix and or the message comes from a bot. If so the bot does nothing.
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    //Definging args
    //All commands are built as follows [Prefix]{Command}(args1)(args2)...
    const args = message.content.slice(prefix.length).trim().split(/ +/);

    //put the command into lowercase. 
    const command = args.shift().toLowerCase();

    //Check if the command exist
    if(!client.commands.has(command)) return;

    try {
        //Running the command
        client.commands.get(command).execute(message, args);
        
    //Error Catch
    }catch(error){
        console.error(error);
        message.reply('There was an issue executing your command!');
    }
})

//Logging in with bot token.
client.login(token);
