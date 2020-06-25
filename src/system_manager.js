const { sleeping_city } = require("./games/sleeping_city");

class system_manager {
	constructor(app, client) {
		this.is_game_started = false;
		this.is_game_prepared = false;
		this.voice_connection = null;
		this.currrent_players = new Array();
		this.prep_timer = null;
		this.client = client;
		this.channel = null;
		this.guild = null;
	}

	listPlayers() {
		let aux_string = "";
		let count = 0;

		if (this.currrent_players.length === 0) {
			return "No Players Joined";
		} else {
			this.currrent_players.forEach((player_loop) => {
				aux_string = aux_string.concat(
					`(${++count}) ` +
						player_loop.member.displayName +
						`
`
				);
			});

			return aux_string;
		}
	}

	setGame() {
		this.game = new sleeping_city(this.currrent_players);
	}
	stop_phases() {
		this.is_game_started = false;
		this.is_game_prepared = false;
		this.currrent_players = [];
		this.prep_timer = null;
		this.channel = null;
	}

	async join_phase(msg) {
		this.channel = msg.channel.id;
		this.is_game_started = true;

		if (!this.game.start) throw "This Game Class Does Not Have A Start Class";

		this.prep_timer = setTimeout(() => {
			this.start_phase(), (this.is_game_prepared = true);
		}, 30000);
	}

	start_phase() {
		this.client.channels.cache.get(this.channel).send("The game has started");
	}
}

module.exports.system_manager = system_manager;
