module.exports = {
	name: "list players",
	description: "List players",
	guildOnly: true,
	async execute(msg, args, system) {
		if (
			system.is_game_started == true
		) {
			// PLAYERS LIST COMMAND
			if (msg.content.split(" ")[1] === "players") {
				await msg.channel.send(system.listPlayers());
			}
		}
	},
};
