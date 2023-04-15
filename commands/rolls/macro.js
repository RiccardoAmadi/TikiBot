const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('macro')
		.setDescription('salva una macro come: percezione d20+5')
		.addStringOption(option =>
			option.setName('nome')
				.setDescription('Il nome della macro, es. "percezione"')
				.setRequired(true)),
	async execute(interaction) {
		var Dice = require("./../../dice.js");
		var userId = interaction.user.id;
		var label = interaction.options.getString('nome');
		var rollString = global.macros.get(userId).get(label);
		
		var dice = new Dice(rollString);
		message = dice.execute();
		
		// Send a message into the channel where command was triggered from
		await interaction.reply(label + message);
	},
};