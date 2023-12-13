import BaseStructure from '../base/BaseStructure';
import Client from '../client/Client';

export default class ProfileIcon extends BaseStructure {
	readonly id: string;
	readonly name: string;
	readonly rarity: string;

	constructor(client: Client, data: APIProfileIcon) {
		super(client);

		this.id = data.id;
		this.name = data.name;
		this.rarity = data.rarity;
	}
}

export interface APIProfileIcon {
	id: string;
	name: string;
	rarity: string;
}
