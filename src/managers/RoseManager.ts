import Client from '../client/Client';
import Util from '../util/Util';
import { Collection } from '@discordjs/collection';
import BaseManager from '../base/BaseManager';
import Rose, { APIRose } from '../structures/Rose';

export default class RoseManager extends BaseManager<Rose> {
	constructor(client: Client) {
		super(client);
	}

	async fetch(force: boolean = false, cache: boolean = true) {
		if (this.cache.size === 0 || force) {
			const data: APIRose[] = await Util.request(
				{
					method: 'GET',
					endpoint: '/items/roses',
				},
				this.client.token,
			);

			const roses = data.map((element) => new Rose(this.client, element));
			const entries = Util.transformRequestResult(roses, 'id');
			const collection = new Collection(entries);

			if (cache) this.cache.concat(collection);
			return collection;
		}

		return this.cache;
	}
}
