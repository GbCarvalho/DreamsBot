module.exports = {
	name: "list players",
	description: "List players",
	guildOnly: true,
	async execute(msg, args, system) {
		if (system.is_game_started == true) {

			await msg.channel.send(system.listPlayers());
			
		}
	},
};
