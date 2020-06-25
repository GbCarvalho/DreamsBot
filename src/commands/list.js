module.exports = {
	name: "list",
	description: "List",
	guildOnly: true,
	async execute(msg, args, system) {
		if (!args.length) {
			return msg.channel.send(
				`You didn't provide the correct args, ${msg.author}!`
			);
		} else if (args[0] === "players") {
			await msg.channel.send(system.listPlayers());
		}
	},
};
