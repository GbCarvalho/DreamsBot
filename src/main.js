const disc = require("discord.js");
const { token, prefix } = require("./config.json");

const client = new disc.Client();

client.on("message", async (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity();
});

client.on("message", async (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  if (msg.content === `${prefix}start`) {
    await msg.channel.send("Cornooo");

    var count = 0;

    var flag = false;

    while (flag === false) {
      client.on("message", (msg) => {
        if (!msg.content.startsWith(prefix) || msg.author.bot) return;
        if (msg.content === `${prefix}stop`) {
          flag = true;
        }
      });

      if (flag === false) {
        const userVoice = await msg.author.presence.guild.me.voice;

        if (userVoice.mute === true) {
          await userVoice.setMute(false);
        } else {
          await userVoice.setMute(true);
        }
        count++;
        sleep(3000);
      }
    }
  }

  //if (msg.content === `${prefix}stop`) {
  //  flag = true;
  //}
});

client.login(token);

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
