module.exports = {
	name: "start",
	description: "Start!",
	guildOnly: true,
	async execute(msg, prefix, system) {
		if (system.is_game_started == false) {
			system.voice_connection = await msg.member.voice.channel.join();

			system.join_phase(msg);
		} else if (system.is_game_started == true) {
			await msg.channel.send("Game already started, bitch");
		}
	},
};
