import { wlm } from '../main';
import { Command } from '../types/Command';
import { Message } from 'discord.js-selfbot-v13';
import { StdMsgs } from '../utils/MsgTemplate';
import { isOwner } from '../utils/IsOwner';
import { emoji } from '../utils/EmojiMaps';

const cmd: Command = {
	name: 'whitelist_rm',
	description: 'ホワイトリストからユーザーを削除します。',
	async execute(message: Message, args: string[]) {
		if (!isOwner(message.author.id)) {
			return await message.reply(StdMsgs.noPerm);
		}
		wlm.rm(args[0]);
		return await message.react(emoji.Success);
	},
};

export default cmd;
