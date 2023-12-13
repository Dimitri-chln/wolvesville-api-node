import Client from '../client/Client';
import Util from '../util/Util';
import { Collection } from '@discordjs/collection';
import BaseManager from '../base/BaseManager';
import Background, { APIBackground } from '../structures/Background';

export default class BackgroundManager extends BaseManager<Background> {
	constructor(client: Client) {
		super(client);
	}

	async fetch(force: boolean = false, cache: boolean = true) {
		if (this.cache.size === 0 || force) {
			const data: APIBackground[] = await Util.request(
				{
					method: 'GET',
					endpoint: '/items/backgrounds',
				},
				this.client.token,
			);

			const backgrounds = data.map((element) => new Background(this.client, element));
			const entries = Util.transformRequestResult(backgrounds, 'id');
			const collection = new Collection(entries);

			if (cache) this.cache.concat(collection);
			return collection;
		}

		return this.cache;
	}
}
