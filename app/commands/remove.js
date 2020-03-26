const Discord = require("discord.js");
const fs = require("fs");

exports.run = (bot, message, args, global, vip, polizei) => {
  let member;
  let admins = ["230665735829979137","664487316735393802"];

// log remove
  //globalban true 
  if (args[0] == "global") {
    global[message.guild.id].gID = "null";
    message.react("688005914011238460");
    message.reply("Der Welcome Channel wurde entfernt!");
  }
  
  if (admins.some(admins => message.author.id == admins))  {
  if (args[0] == "vip") {
    vip[message.guild.id].vID = "false";
    message.react("688005914011238460");
    message.reply("Der Vip Status wurde entfernt!");
  };
  };
  // polizei
  if (admins.some(admins => message.author.id == admins))  {
  if (args[0] == "polizei") {
  member = message.mentions.members.first()
    if (!member) member = bot.users.find(m => m.tag.includes(args[1]))
    if (!member) member = bot.users.find(m => m.id === args[1])
    
    if (!member) return message.reply(`Member mit dem Namen / der ID ${args[1]} wurde nicht gefunden!`)
    
    // success
    polizei[message.member.id].pID = "false"
    message.react("688005914011238460");
    message.reply(`Die User ID${member.id} wurde auf **false** gesetzt und gehört nun nicht mehr zur Global Polizei!`);
  };
  };
}