const { player } = require("../player");

module.exports = {
	name: "play",
	description: "Play!",
	guildOnly: true,
	async execute(msg, args, system) {
		if (system.is_game_started == true && system.is_game_prepared == false) {
			if (system.voice_connection.voice.channel === msg.member.voice.channel) {
				await msg.channel.send("Jogador " + msg.member.displayName + " Entrou");
				const new_player = new player(msg.member);

				system.currrent_players.push(new_player);
			} else {
				await msg.channel.send(
					msg.member.displayName + " is not at the same voice channel as me"
				);
			}
		}
	},
};
