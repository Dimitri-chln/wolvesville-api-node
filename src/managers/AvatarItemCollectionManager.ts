import Client from '../client/Client';
import Util from '../util/Util';
import { Collection } from '@discordjs/collection';
import BaseManager from '../base/BaseManager';
import AvatarItemCollection, { APIAvatarItemCollection } from '../structures/AvatarItemCollection';

export default class AvatarItemCollectionManager extends BaseManager<AvatarItemCollection> {
	constructor(client: Client) {
		super(client);
	}

	async fetch(force: boolean = false, cache: boolean = true) {
		if (this.cache.size === 0 || force) {
			const data: APIAvatarItemCollection[] = await Util.request(
				{
					method: 'GET',
					endpoint: '/items/avatarItemCollections',
				},
				this.client.token,
			);

			const avatarItemCollections = data.map((element) => new AvatarItemCollection(this.client, element));
			const entries = Util.transformRequestResult(avatarItemCollections, 'id');
			const collection = new Collection(entries);

			if (cache) this.cache.concat(collection);
			return collection;
		}

		return this.cache;
	}
}
