import Client from '../client/Client';
import Util from '../util/Util';
import { Collection } from '@discordjs/collection';
import BaseManager from '../base/BaseManager';
import Talisman, { APITalisman } from '../structures/Talisman';

export default class TalismanManager extends BaseManager<Talisman> {
	constructor(client: Client) {
		super(client);
	}

	async fetch(force: boolean = false, cache: boolean = true) {
		if (this.cache.size === 0 || force) {
			const data: APITalisman[] = await Util.request(
				{
					method: 'GET',
					endpoint: '/items/talismans',
				},
				this.client.token,
			);

			const talismans = data.map((element) => new Talisman(this.client, element));
			const entries = Util.transformRequestResult(talismans, 'id');
			const collection = new Collection(entries);

			if (cache) this.cache.concat(collection);
			return collection;
		}

		return this.cache;
	}
}
