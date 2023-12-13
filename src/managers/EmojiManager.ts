import Client from '../client/Client';
import Util from '../util/Util';
import { Collection } from '@discordjs/collection';
import BaseManager from '../base/BaseManager';
import Emoji, { APIEmoji } from '../structures/Emoji';

export default class EmojiManager extends BaseManager<Emoji> {
	constructor(client: Client) {
		super(client);
	}

	async fetch(force: boolean = false, cache: boolean = true) {
		if (this.cache.size === 0 || force) {
			const data: APIEmoji[] = await Util.request(
				{
					method: 'GET',
					endpoint: '/items/emojis',
				},
				this.client.token,
			);

			const emojis = data.map((element) => new Emoji(this.client, element));
			const entries = Util.transformRequestResult(emojis, 'id');
			const collection = new Collection(entries);

			if (cache) this.cache.concat(collection);
			return collection;
		}

		return this.cache;
	}
}
