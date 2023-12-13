import BaseStructure from '../base/BaseStructure';
import Client from '../client/Client';

export default class AvatarItem extends BaseStructure {
	readonly id: string;
	readonly imageUrl: string;
	readonly type: string;
	readonly rarity: string;
	readonly costInGold: number;

	constructor(client: Client, data: APIAvatarItem) {
		super(client);

		this.id = data.id;
		this.imageUrl = data.imageUrl;
		this.type = data.type;
		this.rarity = data.rarity;
		this.costInGold = data.costInGold;
	}
}

export interface APIAvatarItem {
	id: string;
	imageUrl: string;
	type: string;
	rarity: string;
	costInGold: number;
}
