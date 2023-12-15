import Client from '../client/Client';
import Util from '../util/Util';
import { Collection } from '@discordjs/collection';
import BaseManager from '../base/BaseManager';
import ShopActiveOffer, { APIShopActiveOffer } from '../structures/ShopActiveOffer';

export default class ShopActiveOfferManager extends BaseManager<ShopActiveOffer> {
	constructor(client: Client) {
		super(client);
	}

	async fetch(force: boolean = false, cache: boolean = true) {
		if (this.cache.size === 0 || force) {
			const data: APIShopActiveOffer[] = await Util.request(
				{
					method: 'GET',
					endpoint: '/shop/activeOffers',
				},
				this.client.token,
			);

			const activeOffers = data.map((element) => new ShopActiveOffer(this.client, element));
			const entries = Util.transformRequestResult(activeOffers);
			const collection = new Collection(entries);

			if (cache) this.cache.concat(collection);
			return collection;
		}

		return this.cache;
	}
}
