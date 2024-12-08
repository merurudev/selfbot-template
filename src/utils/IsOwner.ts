import config from '../../config.json';

export function isOwner(id: string) {
	if (config.bot.ownerIDs.includes(id)) {
		return true;
	} else {
		return false;
	}
}
