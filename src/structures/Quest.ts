import BaseStructure from '../base/BaseStructure';
import Client from '../client/Client';

export default class Quest extends BaseStructure {
	readonly id: string;
	readonly rewards: QuestReward[];
	readonly promoImageUrl: string;
	readonly promoImagePrimaryColor: `#${string}`;
	readonly purchasableWithGems: boolean;

	constructor(client: Client, data: APIQuest) {
		super(client);

		this.id = data.id;
		this.rewards = data.rewards;
		this.promoImageUrl = data.promoImageUrl;
		this.promoImagePrimaryColor = data.promoImagePrimaryColor;
		this.purchasableWithGems = data.purchasableWithGems;
	}
}

export interface APIQuest {
	id: string;
	rewards: QuestReward[];
	promoImageUrl: string;
	promoImagePrimaryColor: `#${string}`;
	purchasableWithGems: boolean;
}

interface QuestReward {
	type: 'AVATAR_ITEM' | 'ROSE_PACKAGE' | 'GOLD';
	amount: number;
	avatarItemId: string;
	displayType: 'NORMAL';
}
