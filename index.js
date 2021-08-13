require("dotenv").config();

const secret = process.env.SECRET;
const prefix = process.env.PREFIX;

const Discord = require("discord.js");
const client = new Discord.Client();

client.on('message', message => {

    if(message.content.startsWith(`${prefix}poke`)) {
        message.channel.send("Just type: poke @User \nThe user will be notified with a private message and a sound on it's voice channel!");
    }

    if(message.content.startsWith("poke")) {

        const member = message.mentions.members.first();

        if(message.author.username == member.displayName) {
            message.channel.send("No need to poke yourself!");
            return;
        }

        member.voice.channel.join().then(connection => {

            const dispatcher = connection.play("./assets/poke.mp3");

            dispatcher.on('finish', () => {
                member.voice.channel.leave();
            });

        });

        if(!member.voice.channel.full) {
            message.channel.send(`${message.author.username} poked ${member.displayName}`);
        }

        if(member.voice.channel.full) {
            message.channel.send(`${member.displayName} only poked by private message, it's voice channel is full`);
            return;
        }

        member.send(`${message.author.username} has poked you!`);

    }

});

client.login(secret);