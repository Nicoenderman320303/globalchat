var express = require("express");
var app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);

const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();

const config = require("./storages/config.json");
const TOKEN = process.env.TOKEN;

let global = JSON.parse(fs.readFileSync("./storages/global.json", "utf8"));
let vip = JSON.parse(fs.readFileSync("./storages/vip.json", "utf8"));
let polizei = JSON.parse(fs.readFileSync("./storages/polizei.json", "utf8"));

const prefix = config.prefix;

bot.on("message", message => {
  //global.json
  if (!global[message.guild.id])
    global[message.guild.id] = {
      gID: ""
    };

  fs.writeFile("./storages/global.json", JSON.stringify(global), x => {
    if (x) console.error(x);
  });

  //vip.json
  if (!vip[message.guild.id])
    vip[message.guild.id] = {
      vID: "false"
    };

  fs.writeFile("./storages/vip.json", JSON.stringify(vip), x => {
    if (x) console.error(x);
  });
  //polizei.json
  if (!polizei[message.author.id])
    polizei[message.author.id] = {
      pID: "false"
    };

  fs.writeFile("./storages/polizei.json", JSON.stringify(polizei), x => {
    if (x) console.error(x);
  });

  let args = message.content
    .slice(prefix.length)
    .trim()
    .split(" ");
  let cmd = args.shift().toLowerCase();
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  // Command Handler
  try {
    delete require.cache[require.resolve(`./commands/${cmd}.js`)];

    let commandFile = require(`./commands/${cmd}.js`);

    commandFile.run(bot, message, args, global, vip, polizei);
  } catch (e) {
    console.log(e.stack);
  }
});

// Console output if start
bot.on("ready", () => {
  console.log(`${bot.user.tag} ist gestartet!`);
  bot.user.setPresence({
    game: {
      name: `https://discord.gg/8h9q2t2`,
      picture: ``,
      type: "STREAMING",
      url: "https://www.twitch.tv/#"
    }
  });
  bot.user.setStatus("dnd");

  // List servers the bot is connected to
  console.log("Servers:");
  bot.guilds.forEach(guild => {
    console.log("- " + guild.name + " | " + guild.id);
  });
});

// Global

bot.on("message", async message => {
  if (message.channel.id === global[message.guild.id].gID) {
    let support = "[Support Server](https://discord.gg/8h9q2t2)";
    let botinv =
      "[Bot Invite](https://discordapp.com/oauth2/authorize?client_id=688800540066709600&scope=bot&permissions=8)";
    //let id = `[ID]($message.author.send"Id=$client.author.id"`;
    bot.guilds.forEach(g => {
      let chan = g.channels.get(global[g.id].gID); // z.B. globalchat[g.id].channel
      let admins = ["473350270961844225", "664487316735393802"];
      /*let invite = message.channel.createInvite(
  {
    maxAge: 1000000, // maximum time for the invite, in milliseconds
    maxUses: 1000000 // maximum times it can be used
  })*/

      if (message.author.bot) return;
      if (!chan) return;

      chan.setRateLimitPerUser(5);
      chan.setTopic(
        `Der Global Bot ist schon auf ${bot.guilds.size} Servern drauf und verbindet damit ${bot.users.size} User!`
      );

      if (admins.some(admins => message.author.id == admins)) {
        const admin = new Discord.RichEmbed();
        admin.setTitle(`👑 ${message.author.tag}`);
        admin.setDescription(`${message.content} \n\n${support} | ${botinv}`);
        admin.setFooter(
          `${message.guild.name} | ${message.guild.id}`,
          message.guild.iconURL
        );
        admin.setThumbnail(message.author.avatarURL);
        admin.setColor("#ff9999"); //#ffb1b1
        admin.setTimestamp();
        chan.send(admin).then(() => message.react("688005914011238460"));
        message.delete(1);
      } else if (polizei[message.author.id].pID === "true") {
        const pol = new Discord.RichEmbed();
        pol.setTitle(`👮🏻 ${message.author.tag}`);
        pol.setDescription(`${message.content} \n\n${support} | ${botinv}`);
        pol.setFooter(
          `${message.guild.name} | ${message.guild.id}`,
          message.guild.iconURL
        );
        pol.setThumbnail(message.author.avatarURL);
        pol.setColor("6699ff");
        pol.setTimestamp();
        chan.send(pol).then(() => message.react("688005914011238460"));
        message.delete(1);
      } else if (vip[message.guild.id].vID === "false") {
        const user = new Discord.RichEmbed();
        user.setTitle(`${message.author.tag}`);
        user.setDescription(`${message.content} \n\n${support} | ${botinv}`);
        user.setFooter(
          `${message.guild.name} | ${message.guild.id}`,
          message.guild.iconURL
        );
        user.setThumbnail(message.author.avatarURL);
        user.setTimestamp();
        chan.send(user).then(() => message.react("688005914011238460"));
        message.delete(1);
      } else {
        /*(vip[message.guild.id].vID === "true")*/
        const vip = new Discord.RichEmbed();
        vip.setTitle(`${message.author.tag}`);
        vip.setDescription(`${message.content} \n\n${support} | ${botinv}`);
        vip.setFooter(
          `V.I.P Server | ${message.guild.name} | ${message.guild.id}`,
          message.guild.iconURL
        );
        vip.setThumbnail(message.author.avatarURL);
        vip.setTimestamp();
        chan.send(vip).then(() => message.react("688005914011238460"));
        message.delete(1);
      }
    });
  }
});

bot.login(TOKEN);
