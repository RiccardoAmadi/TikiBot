const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setmacro')
		.setDescription('salva una macro come: percezione d20+5')
		.addStringOption(option =>
			option.setName('nome')
				.setDescription('Il nome della macro, es. "percezione"')
				.setRequired(true))
        .addStringOption(option =>
            option.setName('dadi')
                .setDescription('I dadi da lanciare come: "d20+5"')
                .setRequired(true)),
	async execute(interaction) {
		var label = interaction.options.getString('nome');
        var rollString = interaction.options.getString('dadi');
		
		//TODO aggiungi mappa di mappe con prima chiave sull'id utente

        //TODO valida rollString
		if(true) {
			var userId = interaction.user.id;
			if(global.macros.get(userId) === undefined) {
				var map = new Map();
				map.set(label, rollString);
				global.macros.set(userId, map);
			}
			else{
				global.macros.get(userId).set(label, rollString);
			}
            message = 'macro salvata! per usarla digita: /macro ' + label;
		}
		else{
		    message = 'Hai scritto male i dadi da lanciare!';
		}
		
		// Send a message into the channel where command was triggered from
		await interaction.reply(message);
	},//TODO aggiungi comando per eseguire la macros
};