const Discord = require("discord.js");

exports.run = (bot, message, args) => {

  let embed = new Discord.RichEmbed()
  .setTitle(`> Helps`)
  .setDescription("Bot Prefix: `g!`")
  .addField("User Commands", "g!set global <channel> | Setze den Global Chat\ng!remove global | Entferne den Global chatn\ng")
  .addField("Team Commands", "g!ban <id> | Banne einen User")
  .addField("Admin Commands", "g!set <vip/polizei> <id> | Setze einen VIP Server/Polizisten\ng!remove <vip/polizei> <id> | Entferne Einen VIP Server/Polizisten") 
  .setTimestamp()
  .setColor("RED")
  message.channel.send(embed); 
};