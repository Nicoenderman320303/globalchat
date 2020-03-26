const Discord = require("discord.js");
const fs = require("fs");

exports.run = (bot, message, args, global, vip, polizei) => {
  let chan;
  let member;
  let admins = ["230665735829979137","664487316735393802"];
  // Bot no Permission
  if (!message.guild.me.hasPermission("ADMINISTRATOR"))
    return message.reply("Mir fehlen folgende Permissions: `ADMINISTRATOR`");

  // User no Permission
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.reply("Du hast keine Rechte um `set` zu benutzen!");

  // no Action
  const actions = ["global", "vip", "polizei"];
  if (!actions.some(actions => args[0] == actions))
    return message.reply(`Wähle eine gültige Aktion: \`\`\`js
set global <channel>
\`\`\``);

  // global
  if (args[0] == "global") {
    chan = message.mentions.channels.first();
    if (!chan)
      chan = message.guild.channels.find(c => c.name.includes(args[1]));
    if (!chan) chan = message.guild.channels.get(args[1]);

    // no Channel
    if (!args[1])
      return message.reply("Bitte nenne einen Channel, um diesen als Global Channel zu benutzen!");
    if (!chan)
      return message.reply(`Channel mit dem Namen / der ID ${args[1]} wurde nicht gefunden!`);

    // success
    global[message.guild.id].gID = chan.id
    message.react("688005914011238460");
    message.reply(`Der Global Channel wurde auf ${chan} gesetzt!`);

    fs.writeFile("./storages/global.json", JSON.stringify(global), x => {
      if (x) console.error(x);
    });
  }
  
    // vip
  if (admins.some(admins => message.author.id == admins))  {
  if (args[0] == "vip") {
    

    // success
    vip[message.guild.id].vID = "true"
    message.react("688005914011238460");
    message.reply("Der Server wurde auf `true` gesetzt und ist nun ein VIP Server!");

    fs.writeFile("./storages/vip.json", JSON.stringify(vip), x => {
      if (x) console.error(x);
    });
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
    polizei[message.member.id].pID = "true"
    message.react("688005914011238460");
    message.reply(`Die User ID ${member.id} wurde auf **true** gesetzt und gehört nun zur Global Polizei!`);

  };
  };
}