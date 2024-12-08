import consola from 'consola';
import fs from 'fs';
export class WhiteListManager {
	private p = '[BLM] ';
	private userIDs: string[] = [];

	add(id: string): void {
		this.userIDs.push(id);
		consola.info(`${this.p}Adding ${id} to WhiteList.`);
		this.updateConfigFile();
	}
	rm(id: string): void {
		const index = this.userIDs.indexOf(id);
		if (index !== -1) {
			this.userIDs.splice(index, 1);
			consola.info(`${this.p}Removing ${id} to WhiteList.`);
			this.updateConfigFile();
		}
	}
	getIDs(): string[] {
		return this.userIDs;
	}

	loadFromConfig(): void {
		const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));
		this.userIDs = config.bot.whitelistedIDs;
	}

	private updateConfigFile(): void {
		const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));
		config.bot.whitelistedIDs = this.userIDs;
		fs.writeFileSync('config.json', JSON.stringify(config, null, 2));
	}
}
