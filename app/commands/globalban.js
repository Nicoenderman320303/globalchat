const Discord = require("discord.js");

module.exports.run = function(client, message, args, db) {
  if (
    ![
      "664487316735393802"
    ].includes(message.author.id)
  )
    return message.reply("Dazu fehlen dir die Rechte!");
  let user;
  if (args[1].startsWith("<"))
    user = client.users.get(
      (args[1].startsWith("<@!")
        ? args[1].split("<@!")[1]
        : args[1].split("<@")[1]
      ).split(">")[0]
    );
  else user = client.users.get(args[1]);
  db.bans[user.id] = !db.bans[user.id];
  
  message.reply(
    ":BanHammer: You successfully " +
      (db.bans[user.id] ? "" : "**un**-") +
      "**banned** <@" +
      user.id +
      "> from the GlobalChat!"
  );
}
exports.help = {
    name : "globalban",
    description: "Stelle mir eine Ja/Nein Frage",
    shown: true,
  args: [{name: "@mention", required: true}],
  cat: "globalban"
  };