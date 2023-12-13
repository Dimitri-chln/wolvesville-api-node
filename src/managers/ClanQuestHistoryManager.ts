import Client from '../client/Client';
import Util from '../util/Util';
import { Collection } from '@discordjs/collection';
import BaseManager from '../base/BaseManager';
import ClanActiveQuest, { APIClanActiveQuest } from '../structures/ClanActiveQuest';
import Clan from '../structures/Clan';

export default class ClanQuestHistoryManager extends BaseManager<ClanActiveQuest> {
	readonly clan: Clan;

	constructor(client: Client, clan: Clan) {
		super(client);

		this.clan = clan;
	}

	async fetch(force: boolean = false, cache: boolean = true) {
		if (this.cache.size === 0 || force) {
			const data: APIClanActiveQuest[] = await Util.request(
				{
					method: 'GET',
					endpoint: `/clans/${this.clan.id}/quests/history`,
				},
				this.client.token,
			);

			const quests = data.map((element) => new ClanActiveQuest(this.client, this.clan, element));
			const entries = Util.transformRequestResult(quests);
			const collection = new Collection(entries);

			if (cache) this.cache.concat(collection);
			return collection;
		}

		return this.cache;
	}
}
