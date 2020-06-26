const { player } = require("../player");

module.exports = {
	name: "play",
	description: "Enter The Game !",
	guildOnly: true,
	async execute(msg, args, system) {
		if (system.is_game_started == true && system.is_game_prepared == false) {
			if (system.voice_connection.voice.channel === msg.member.voice.channel) {
				system.addPlayer(msg.member);
				await msg.channel.send("Jogador " + msg.member.displayName + " Entrou");
			} else {
				await msg.channel.send(
					msg.member.displayName + " is not at the same voice channel as me"
				);
			}
		} else if (
			system.is_game_started == true &&
			system.is_game_prepared == true
		) {
			await msg.channel.send("Preparation phase has ended, wait until next game");
		} else if (
			system.is_game_started == false &&
			system.is_game_prepared == false
		) {
			await msg.channel.send("Tha game is not started yet");
		}
	},
};
