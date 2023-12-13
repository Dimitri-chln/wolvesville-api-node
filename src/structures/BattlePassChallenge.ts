import BaseStructure from '../base/BaseStructure';
import Client from '../client/Client';

export default class BattlePassChallege extends BaseStructure {
	readonly id: string;
	readonly description: string;
	readonly target: number;
	readonly rewardInGold: number;
	readonly iconUrl: string;
	readonly startTime: Date;
	readonly durationInDays: number;

	constructor(client: Client, data: APIBattlePassChallenge) {
		super(client);

		this.id = data.id;
		this.description = data.description;
		this.target = data.target;
		this.rewardInGold = data.rewardInGold;
		this.iconUrl = data.iconUrl;
		this.startTime = new Date(data.startTime);
		this.durationInDays = data.durationInDays;
	}
}

export interface APIBattlePassChallenge {
	id: string;
	description: string;
	target: number;
	rewardInGold: number;
	iconUrl: string;
	startTime: string;
	durationInDays: number;
}
