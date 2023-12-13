import BaseStructure from '../base/BaseStructure';
import Client from '../client/Client';

export default class AdvancedRoleCardOffer extends BaseStructure {
	readonly id: string;
	readonly advancedRoleId: string;
	readonly avatarItemSetId: string;
	readonly abilityExchangeVoucherCount: number;
	readonly talismanCount: number;
	readonly loyaltyTokenCount: number;

	constructor(client: Client, data: APIAdvancedRoleCardOffer) {
		super(client);

		this.id = data.id;
		this.advancedRoleId = data.advancedRoleId;
		this.avatarItemSetId = data.avatarItemSetId;
		this.abilityExchangeVoucherCount = data.abilityExchangeVoucherCount;
		this.talismanCount = data.talismanCount;
		this.loyaltyTokenCount = data.loyaltyTokenCount;
	}

	get avatarItemSet() {
		return this.client.items.avatarItemSets.cache.get(this.avatarItemSetId);
	}
}

export interface APIAdvancedRoleCardOffer {
	id: string;
	advancedRoleId: string;
	avatarItemSetId: string;
	abilityExchangeVoucherCount: number;
	talismanCount: number;
	loyaltyTokenCount: number;
}
