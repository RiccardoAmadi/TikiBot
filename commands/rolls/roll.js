const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Free dice rolling')
		.addStringOption(option =>
			option.setName('dadi')
				.setDescription('Descrivi i dadi da lanciare')
				.setRequired(true)),
	async execute(interaction) {
		var Dice = require("./../../dice.js");
		var rollString = interaction.options.getString('dadi');
		var dice = new Dice(rollString);
		
		if(dice.validate()) {
		  dice.parseDiceRollInput();
		  message = dice.printRollMessage();
		}
		else if (dice.validate2()) {
			console.log('complex roll');
			dice.parseDiceRollInput2();
			console.log('complex roll');
			message = dice.printRollMessage2();
			console.log('complex roll');
		}
		else{
		  message = '"' + rollString + '"? Non ho capito! Usa il formato: 3d20+5';
		}
		
		// Send a message into the channel where command was triggered from
		await interaction.reply(message);
	},
};