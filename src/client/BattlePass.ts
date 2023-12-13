import Client from './Client';

import BattlePassSeason from '../structures/BattlePassSeason';
import BattlePassChallengeManager from '../managers/BattlePassChallengeManager';

export default class BattlePass {
	readonly client: Client;

	readonly season: BattlePassSeason;
	readonly challenges: BattlePassChallengeManager;

	constructor(client: Client) {
		this.client = client;

		this.season = new BattlePassSeason(client);
		this.challenges = new BattlePassChallengeManager(client);
	}
}
