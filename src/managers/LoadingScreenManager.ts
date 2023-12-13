import Client from '../client/Client';
import Util from '../util/Util';
import { Collection } from '@discordjs/collection';
import BaseManager from '../base/BaseManager';
import LoadingScreen, { APILoadingScreen } from '../structures/LoadingScreen';

export default class LoadingScreenManager extends BaseManager<LoadingScreen> {
	constructor(client: Client) {
		super(client);
	}

	async fetch(force: boolean = false, cache: boolean = true) {
		if (this.cache.size === 0 || force) {
			const data: APILoadingScreen[] = await Util.request(
				{
					method: 'GET',
					endpoint: '/items/loadingScreens',
				},
				this.client.token,
			);

			const loadingScreens = data.map((element) => new LoadingScreen(this.client, element));
			const entries = Util.transformRequestResult(loadingScreens, 'id');
			const collection = new Collection(entries);

			if (cache) this.cache.concat(collection);
			return collection;
		}

		return this.cache;
	}
}
