
// Create a Discord Bot With OpenAI
require('dotenv').config();

const { Channel } = require('diagnostics_channel');
//connect to discord API
const { Client, GatewayIntentBits, ChannelType, Guild } = require('discord.js');
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]})

//connect to openAI API
const{ Configuration , OpenAIApi } = require('openai');
const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

// Check for when a message is sent on discord
client.on('messageCreate', async function(message){
    try{
        if(message.author.bot) return;
        //ChatGPT reply

        const gptRespone = await openai.createCompletion({
            model: "davinci",
            prompt:`ChatGPT is a friendly chatbot.\n\
            ChatGPT: Hello, how are you?\n\
            ${message.author.username}: ${message.content}\n\
            ChatGPT:`,
            temperature: 0.7,
            max_tokens: 100,
            stop: ["ChatGPT:",`${message.author.username}:`],

        })
        
        message.reply(`${gptRespone.data.choices[0].text}`)
        
    }catch(err){
        console.log(err)
    }
});

// Log the bot into Discord
client.login(process.env.DISCORD_TOKEN);
console.log("GPTkun Bot is Online on discord")