const { prefix } = require("../config.json");

module.exports = {
	name: "help",
	description: "List all of my commands or info about a specific command.",
	aliases: ["commands"],
	usage: "[command name]",
	async execute(msg, args, system) {
		const data = [];
		const { commands } = msg.client;

		if (!args.length) {
			data.push("Here`s a list of all my commands:");
			data.push(commands.map((command) => command.name).join(`, \n`));
			data.push(
				`\nYou can send '${prefix}help [command name]' to get info on a specific command!`
			);

			return msg.author
				.send(data, { split: true })
				.then(() => {
					if (msg.channel.type === "dm") return;
					msg.reply("I've sent you a DM with all my commands!");
				})
				.catch((error) => {
					console.error(`Could not send help DM to ${msg.author.tag}.\n`, error);
					msg.reply("It seems like I can't DM you! Do you have DMs disabled?");
				});
		}
	},
};
