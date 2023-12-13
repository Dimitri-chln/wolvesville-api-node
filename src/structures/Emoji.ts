import BaseStructure from '../base/BaseStructure';
import Client from '../client/Client';

export default class Emoji extends BaseStructure {
	readonly id: string;
	readonly name: string;
	readonly rarity: string;
	readonly urlPreview: string;
	readonly urlAnimation: string;
	readonly event: string;

	constructor(client: Client, data: APIEmoji) {
		super(client);

		this.id = data.id;
		this.name = data.name;
		this.rarity = data.rarity;
		this.urlPreview = data.urlPreview;
		this.urlAnimation = data.urlAnimation;
		this.event = data.event;
	}
}

export interface APIEmoji {
	id: string;
	name: string;
	rarity: string;
	urlPreview: string;
	urlAnimation: string;
	event: string;
}
