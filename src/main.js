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
	
	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args, system);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
	// START COMMAND
	
});

client.login(token);
