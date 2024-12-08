import { Client, Collection } from 'discord.js-selfbot-v13';
import consola from 'consola';
import color from 'picocolors';

import config from '../config.json';
import { readdirSync } from 'fs';
import { join } from 'path';
import { Command } from './types/Command';
import { WhiteListManager } from './internal/WhiteListManager';
import { __dirname } from './consts';
import './types/Client.d.ts';

export const client = new Client();
client.commands = new Collection<string, Command>();

export const wlm = new WhiteListManager();
wlm.loadFromConfig();

const commandFiles = readdirSync(join(__dirname, 'commands')).filter((file) => file.endsWith('.ts'));
export const commandList: { name: string; description: string }[] = [];

(async () => {
	let c = 0;
	const loadCmds = commandFiles.map(async (file) => {
		const commandModule = await import(`./commands/${file}`);
		const command: Command = commandModule.default;
		commandList.push({
			name: command.name,
			description: command.description,
		});
		client.commands.set(command.name, command);
		c++;
	});
	await Promise.all(loadCmds);
	consola.info(`Loaded ${color.green(c)} commands.`);
})();

client.on('messageCreate', async (message) => {
	if (!message.content.startsWith(config.bot.prefix) || message.author.bot || !wlm.getIDs().includes(message.author.id)) return;
	const args = message.content.slice(config.bot.prefix.length).trim().split(/ +/);
	const commandName = args.shift()!.toLowerCase();
	if (!client.commands.has(commandName)) return;
	const command = client.commands.get(commandName);
	consola.log(`${message.author.username} used ${commandName}`);
	try {
		await command?.execute(message, args);
	} catch (e) {
		consola.error(e);
		message.reply(`**Error**\n` + e);
	}
});

client.on('ready', async (client) => {
	consola.success(`Ready. (Logged in as ${color.cyan(client.user.username)})`);
});

client.login(config.bot.token);

process.on('uncaughtException', function (e) {
	consola.fail('an internal error occured');
	consola.error(e);
});
