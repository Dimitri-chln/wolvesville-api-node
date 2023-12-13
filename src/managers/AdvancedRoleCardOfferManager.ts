import Client from '../client/Client';
import Util from '../util/Util';
import { Collection } from '@discordjs/collection';
import BaseManager from '../base/BaseManager';
import AdvancedRoleCardOffer, { APIAdvancedRoleCardOffer } from '../structures/AdvancedRoleCardOffer';

export default class AdvancedRoleCardOfferManager extends BaseManager<AdvancedRoleCardOffer> {
	constructor(client: Client) {
		super(client);
	}

	async fetch(force: boolean = false, cache: boolean = true) {
		if (this.cache.size === 0 || force) {
			const data: APIAdvancedRoleCardOffer[] = await Util.request(
				{
					method: 'GET',
					endpoint: '/items/advancedRoleCardOffers',
				},
				this.client.token,
			);

			const advancedRoleCardOffers = data.map((element) => new AdvancedRoleCardOffer(this.client, element));
			const entries = Util.transformRequestResult(advancedRoleCardOffers, 'id');
			const collection = new Collection(entries);

			if (cache) this.cache.concat(collection);
			return collection;
		}

		return this.cache;
	}
}
