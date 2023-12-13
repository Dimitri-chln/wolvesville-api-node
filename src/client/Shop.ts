import Client from './Client';

import ShopActiveOfferManager from '../managers/ShopActiveOfferManager';

export default class Shop {
	readonly client: Client;

	readonly activeOffers: ShopActiveOfferManager;

	constructor(client: Client) {
		this.client = client;

		this.activeOffers = new ShopActiveOfferManager(client);
	}
}
