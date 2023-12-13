import BaseStructure from '../base/BaseStructure';
import Client from '../client/Client';

export default class AvatarItemCollection extends BaseStructure {
	readonly id: string;
	readonly avatarItemIds: string[];
	readonly promoImageUrl: string;
	readonly promoImagePrimaryColor: `#${string}`;
	readonly iconUrl: string;
	readonly bonusLoadingScreenId: string;
	readonly bonusMinItemCount: number;

	constructor(client: Client, data: APIAvatarItemCollection) {
		super(client);

		this.id = data.id;
		this.avatarItemIds = data.avatarItemIds;
		this.promoImageUrl = data.promoImageUrl;
		this.promoImagePrimaryColor = data.promoImagePrimaryColor;
		this.iconUrl = data.iconUrl;
		this.bonusLoadingScreenId = data.bonusLoadingScreenId;
		this.bonusMinItemCount = data.bonusMinItemCount;
	}

	get avatarItems() {
		return this.avatarItemIds.map((avatarItemId) => this.client.items.avatarItems.cache.get(avatarItemId));
	}
}

export interface APIAvatarItemCollection {
	id: string;
	avatarItemIds: string[];
	promoImageUrl: string;
	promoImagePrimaryColor: `#${string}`;
	iconUrl: string;
	bonusLoadingScreenId: string;
	bonusMinItemCount: number;
}
