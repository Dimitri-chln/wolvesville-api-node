import Client from '../client/Client';
import Util from '../util/Util';
import { Collection } from '@discordjs/collection';
import BaseManager from '../base/BaseManager';
import EmojiCollection, { APIEmojiCollection } from '../structures/EmojiCollection';

export default class EmojiCollectionManager extends BaseManager<EmojiCollection> {
	constructor(client: Client) {
		super(client);
	}

	async fetch(force: boolean = false, cache: boolean = true) {
		if (this.cache.size === 0 || force) {
			const data: APIEmojiCollection[] = await Util.request(
				{
					method: 'GET',
					endpoint: '/items/emojiCollections',
				},
				this.client.token,
			);

			const emojiCollections = data.map((element) => new EmojiCollection(this.client, element));
			const entries = Util.transformRequestResult(emojiCollections, 'id');
			const collection = new Collection(entries);

			if (cache) this.cache.concat(collection);
			return collection;
		}

		return this.cache;
	}
}
