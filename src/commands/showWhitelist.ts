import { wlm } from '../main';
import { Command } from '../types/Command';
import { Message } from 'discord.js-selfbot-v13';
import { StdMsgs } from '../utils/MsgTemplate';
import { isOwner } from '../utils/IsOwner';

const cmd: Command = {
	name: 'whitelist_show',
	description: 'ホワイトリストに登録されたユーザーを全て表示します。',
	async execute(message: Message) {
		if (!isOwner(message.author.id)) {
			return await message.reply(StdMsgs.noPerm);
		}
		const list = wlm.getIDs().join('\n');
		return await message.reply('```\n' + list + '\n```');
	},
};

export default cmd;
