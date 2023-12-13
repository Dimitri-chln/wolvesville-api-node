import BaseStructure from '../base/BaseStructure';
import Client from '../client/Client';

export default class ShopActiveOffer extends BaseStructure {
	readonly type: string;
	readonly expireDate: string;
	readonly avatarItemSetIds: string[];
	readonly costInGems: number;
	readonly promoImageUrl: string;

	constructor(client: Client, data: APIShopActiveOffer) {
		super(client);

		this.type = data.type;
		this.expireDate = data.expireDate;
		this.avatarItemSetIds = data.avatarItemSetIds;
		this.costInGems = data.costInGems;
		this.promoImageUrl = data.promoImageUrl;
	}
}

export interface APIShopActiveOffer {
	type: string;
	expireDate: string;
	avatarItemSetIds: string[];
	costInGems: number;
	promoImageUrl: string;
}
