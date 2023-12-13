import Client from '../client/Client';
import Util from '../util/Util';
import { Collection } from '@discordjs/collection';
import BaseManager from '../base/BaseManager';
import AvatarItem, { APIAvatarItem } from '../structures/AvatarItem';

export default class AvatarItemManager extends BaseManager<AvatarItem> {
	constructor(client: Client) {
		super(client);
	}

	async fetch(force: boolean = false, cache: boolean = true) {
		if (this.cache.size === 0 || force) {
			const data: APIAvatarItem[] = await Util.request(
				{
					method: 'GET',
					endpoint: '/items/avatarItems',
				},
				this.client.token,
			);

			const avatarItems = data.map((element) => new AvatarItem(this.client, element));
			const entries = Util.transformRequestResult(avatarItems, 'id');
			const collection = new Collection(entries);

			if (cache) this.cache.concat(collection);
			return collection;
		}

		return this.cache;
	}
}
