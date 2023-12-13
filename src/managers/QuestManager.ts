import Client from '../client/Client';
import Util from '../util/Util';
import { Collection } from '@discordjs/collection';
import BaseManager from '../base/BaseManager';
import Quest, { APIQuest } from '../structures/Quest';

export default class QuestManager extends BaseManager<Quest> {
	constructor(client: Client) {
		super(client);
	}

	async fetch(force: boolean = false, cache: boolean = true) {
		if (this.cache.size === 0 || force) {
			const data: APIQuest[] = await Util.request(
				{
					method: 'GET',
					endpoint: '/clans/quests/all',
				},
				this.client.token,
			);

			const quests = data.map((element) => new Quest(this.client, element));
			const entries = Util.transformRequestResult(quests, 'id');
			const collection = new Collection(entries);

			if (cache) this.cache.concat(collection);
			return collection;
		}

		return this.cache;
	}
}
