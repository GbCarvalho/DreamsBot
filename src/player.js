class player {
	constructor(member) {
		this.member = member;
		this.is_alive = true;
		this.work = null;
	}

	kill() {
		this.is_alive = false;
	}
}

module.exports.player = player;
