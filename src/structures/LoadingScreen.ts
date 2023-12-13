import BaseStructure from '../base/BaseStructure';
import Client from '../client/Client';
import Image from '../util/Image';

export default class LoadingScreen extends BaseStructure {
	readonly id: string;
	readonly rarity: string;
	readonly image: Image;
	readonly imageWide: Image;
	readonly imagePrimaryColor: `#${string}`;

	constructor(client: Client, data: APILoadingScreen) {
		super(client);

		this.id = data.id;
		this.rarity = data.rarity;
		this.image = data.image;
		this.imageWide = data.imageWide;
		this.imagePrimaryColor = data.imagePrimaryColor;
	}
}

export interface APILoadingScreen {
	id: string;
	rarity: string;
	image: Image;
	imageWide: Image;
	imagePrimaryColor: `#${string}`;
}
