module.exports = {
	name: "list",
	description:
		"Lists something. \n players - list players \n games - list games",
	usage: "[list type]",
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
