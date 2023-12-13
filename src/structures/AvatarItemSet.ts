import BaseStructure from '../base/BaseStructure';
import Client from '../client/Client';

export default class AvatarItemSet extends BaseStructure {
	readonly id: string;
	readonly avatarItemIds: string[];
	readonly promoImageUrl: string;
	readonly promoImagePrimaryColor: `#${string}`;

	constructor(client: Client, data: APIAvatarItemSet) {
		super(client);

		this.id = data.id;
		this.avatarItemIds = data.avatarItemIds;
		this.promoImageUrl = data.promoImageUrl;
		this.promoImagePrimaryColor = data.promoImagePrimaryColor;
	}
}

export interface APIAvatarItemSet {
	id: string;
	avatarItemIds: string[];
	promoImageUrl: string;
	promoImagePrimaryColor: `#${string}`;
}
