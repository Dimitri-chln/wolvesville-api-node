import Client from '../client/Client';
import Util from '../util/Util';
import { Collection } from '@discordjs/collection';
import BaseManager from '../base/BaseManager';
import BattlePassChallege, { APIBattlePassChallenge } from '../structures/BattlePassChallenge';

export default class BattlePassChallengeManager extends BaseManager<BattlePassChallege> {
	constructor(client: Client) {
		super(client);
	}

	async fetch(force: boolean = false, cache: boolean = true) {
		if (this.cache.size === 0 || force) {
			const data: APIBattlePassChallenge[] = await Util.request(
				{
					method: 'GET',
					endpoint: '/battlePass/challenges',
				},
				this.client.token,
			);

			const battlePassChallege = data.map((element) => new BattlePassChallege(this.client, element));
			const entries = Util.transformRequestResult(battlePassChallege, 'id');
			const collection = new Collection(entries);

			if (cache) this.cache.concat(collection);
			return collection;
		}

		return this.cache;
	}
}
