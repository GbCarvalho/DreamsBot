module.exports = {
	name: "stop",
	description: "Stop!",
	guildOnly: true,
	async execute(msg, args, system) {
		clearTimeout(system.prep_timer);
		system.stop_phases();
		await msg.channel.send("Game Stopped");
	},
};
