const fs = require("fs");
const Discord = require("discord.js");
const { prefix, token } = require(" ./config.json");
const { system_manager } = require("./system_manager");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs
	.readdirSync("./commands")
	.filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on("message", (msg) => {
	if (!msg.content.startsWith(prefix) || msg.author.bot) return;
	const args = msg.content.slice(prefix.length).split(" ");
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.command.get(command).execute(msg, args, system_manager);
	} catch (e) {
		console.error(e);
		msg.reply(
			`There was an error trying to execute that command! (${prefix}${command})`
		);
	}
});
