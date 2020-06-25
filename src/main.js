const disc = require("discord.js");
const { token, prefix } = require("./config.json");
const fs = require("fs");

const client = new disc.Client();
client.commands = new disc.Collection();

const { system_manager } = require("./system_manager");

const system = new system_manager(client);


const commandFiles = fs
	.readdirSync("src/commands")
	.filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}



client.on("ready", async () => {
	console.log("Ready");
});

client.on("message", async (msg) => {

	if (!msg.content.startsWith(prefix) || msg.author.bot) return;

	const args = msg.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	
	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(msg, args, system);
	} catch (error) {
		console.error(error);
		msg.reply('Error in this command!');
	}
	// START COMMAND
	
});

client.login(token);
