import BaseStructure from '../base/BaseStructure';
import Client from '../client/Client';
import Image from '../util/Image';

export default class Background extends BaseStructure {
	readonly id: string;
	readonly rarity: string;
	readonly imageDay: Image;
	readonly imageDayWide: Image;
	readonly imageNight: Image;
	readonly imageNightWide: Image;
	readonly imageDaySmall: Image;
	readonly imageNightSmall: Image;
	readonly backgroundColorDay: `#${string}`;
	readonly backrgoundColorNight: `#${string}`;

	constructor(client: Client, data: APIBackground) {
		super(client);

		this.id = data.id;
		this.rarity = data.rarity;
		this.imageDay = data.imageDay;
		this.imageDayWide = data.imageDayWide;
		this.imageNight = data.imageNight;
		this.imageNightWide = data.imageNightWide;
		this.imageDaySmall = data.imageDaySmall;
		this.imageNightSmall = data.imageNightSmall;
		this.backgroundColorDay = data.backgroundColorDay;
		this.backrgoundColorNight = data.backrgoundColorNight;
	}
}

export interface APIBackground {
	id: string;
	rarity: string;
	imageDay: Image;
	imageDayWide: Image;
	imageNight: Image;
	imageNightWide: Image;
	imageDaySmall: Image;
	imageNightSmall: Image;
	backgroundColorDay: `#${string}`;
	backrgoundColorNight: `#${string}`;
}
