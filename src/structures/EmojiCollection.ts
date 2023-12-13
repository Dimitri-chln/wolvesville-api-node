import BaseStructure from '../base/BaseStructure';
import Client from '../client/Client';

export default class EmojiCollection extends BaseStructure {
	readonly id: string;
	readonly emojiIds: string[];
	readonly promoImageUrl: string;
	readonly promoImagePrimaryColor: `#${string}`;
	readonly iconUrl: string;
	readonly bonusLoadingScreenId: string;
	readonly bonusMinItemCount: number;

	constructor(client: Client, data: APIEmojiCollection) {
		super(client);

		this.id = data.id;
		this.emojiIds = data.emojiIds;
		this.promoImageUrl = data.promoImageUrl;
		this.promoImagePrimaryColor = data.promoImagePrimaryColor;
		this.iconUrl = data.iconUrl;
		this.bonusLoadingScreenId = data.bonusLoadingScreenId;
		this.bonusMinItemCount = data.bonusMinItemCount;
	}
}

export interface APIEmojiCollection {
	id: string;
	emojiIds: string[];
	promoImageUrl: string;
	promoImagePrimaryColor: `#${string}`;
	iconUrl: string;
	bonusLoadingScreenId: string;
	bonusMinItemCount: number;
}
