const disc = require("discord.js");
const { token, prefix } = require("./config.json");

const client = new disc.Client();

const { system_manager } = require("./system_manager");
const system = new system_manager(client);

const { player } = require("./player.js");

client.on("ready", async () => {
	console.log("Ready");
});

client.on("message", async (msg) => {
	if (!msg.content.startsWith(prefix) || msg.author.bot) return;

	// START COMMAND
	if (msg.content === `${prefix}start` && system.is_game_started == false) {
		system.voice_connection = await msg.member.voice.channel.join();

		system.join_phase(msg);
	} else if (
		msg.content === `${prefix}start` &&
		system.is_game_started == true
	) {
		await msg.channel.send("Game already started, bitch");
	}

	// STOP COMMAND
	else if (msg.content.startsWith(`${prefix}stop`)) {
		clearTimeout(system.prep_timer);
		system.stop_phases();
		await msg.channel.send("Game Stopped");
	}

	// LIST COMMAND
	else if (
		msg.content.startsWith(`${prefix}list`) &&
		system.is_game_started == true
	) {
		// PLAYERS LIST COMMAND
		if (msg.content.split(" ")[1] === "players") {
			await msg.channel.send(system.listPlayers());
		}
	}

	// PLAY COMMAND
	else if (
		msg.content === `${prefix}play` &&
		system.is_game_started == true &&
		system.is_game_prepared == false
	) {
		if (system.voice_connection.voice.channel === msg.member.voice.channel) {
			await msg.channel.send("Jogador " + msg.member.displayName + " Entrou");
			const new_player = new player(msg.member);

			system.currrent_players.push(new_player);
		} else {
			await msg.channel.send(
				msg.member.displayName + " is not at the same voice channel as me"
			);
		}
	} else {
		await msg.channel.send("Comando não existe");
	}
});

client.login(token);
