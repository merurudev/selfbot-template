import { client, commandList } from '../main';
import { Command } from '../types/Command';
import { Message } from 'discord.js-selfbot-v13';

const helpCommand: Command = {
	name: 'help',
	description: 'helpコマンドを表示します。',
	async execute(message: Message, args: string[]) {
		const list = commandList.map((command) => '`' + command.name + '`' + command.description).join('\n');
		message.channel.send('**コマンド一覧**\n' + list);
	},
};

export default helpCommand;
