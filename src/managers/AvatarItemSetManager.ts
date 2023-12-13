import Client from '../client/Client';
import Util from '../util/Util';
import { Collection } from '@discordjs/collection';
import BaseManager from '../base/BaseManager';
import AvatarItemSet, { APIAvatarItemSet } from '../structures/AvatarItemSet';

export default class AvatarItemSetManager extends BaseManager<AvatarItemSet> {
	constructor(client: Client) {
		super(client);
	}

	async fetch(force: boolean = false, cache: boolean = true) {
		if (this.cache.size === 0 || force) {
			const data: APIAvatarItemSet[] = await Util.request(
				{
					method: 'GET',
					endpoint: '/items/avatarItemSets',
				},
				this.client.token,
			);

			const avatarItemSets = data.map((element) => new AvatarItemSet(this.client, element));
			const entries = Util.transformRequestResult(avatarItemSets, 'id');
			const collection = new Collection(entries);

			if (cache) this.cache.concat(collection);
			return collection;
		}

		return this.cache;
	}
}
