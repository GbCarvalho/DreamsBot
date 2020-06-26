module.exports = {
	name: "stop",
	description: "Stop everything that's running. Be careful!",
	guildOnly: true,
	async execute(msg, args, system) {
		if (system.is_game_started == true && system.is_game_prepared == true) {
			clearTimeout(system.prep_timer);
			system.stop_phases();
			await msg.channel.send("Game Stopped");
		} else if (
			system.is_game_started == true &&
			system.is_game_prepared == false
		) {
			clearTimeout(system.prep_timer);
			system.stop_phases();
			await msg.channel.send("Game Stopped");
		}
	},
};
