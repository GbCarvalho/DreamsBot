module.exports = {
	name: "start",
	description: "Start The Prep Phase!",
	usage: "",
	guildOnly: true,
	async execute(msg, args, system) {
		if ((await system.is_game_started) == false) {
			system.voice_connection = await msg.member.voice.channel.join();
			await msg.channel.send("Game Started, bitch");

			system.join_phase(msg);
		} else if ((await system.is_game_started) == true) {
			await msg.channel.send("Game already started, bitch");
		}
	},
};
