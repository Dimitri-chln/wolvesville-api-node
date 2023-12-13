import BaseStructure from '../base/BaseStructure';
import Client from '../client/Client';
import Util from '../util/Util';

export default class BattlePassSeason extends BaseStructure {
	startTime?: Date;
	number?: number;
	durationInDays?: number;
	goldPrice?: number;
	goldPricePerReward?: number;
	gemPricePerReward?: number;
	xpPerReward?: number;
	rewards?: BattlePassSeasonReward[];
	iconUrl?: string;
	seasonBackgroundId?: string;

	constructor(client: Client) {
		super(client);
	}

	get cached() {
		return !!this.number;
	}

	fetch(force: boolean, cache: true): Promise<this>;
	fetch(force: boolean, cache: false): Promise<APIBattlePassSeason>;
	async fetch(force: boolean = false, cache: boolean = true) {
		if (!this.cached || force) {
			const data: APIBattlePassSeason = await Util.request(
				{
					method: 'GET',
					endpoint: '/battlePass/season',
				},
				this.client.token,
			);

			if (cache) {
				this.startTime = new Date(data.startTime);
				this.number = data.number;
				this.durationInDays = data.durationInDays;
				this.goldPrice = data.goldPrice;
				this.goldPricePerReward = data.goldPricePerReward;
				this.gemPricePerReward = data.gemPricePerReward;
				this.xpPerReward = data.xpPerReward;
				this.rewards = data.rewards;
				this.iconUrl = data.iconUrl;
				this.seasonBackgroundId = data.seasonBackgroundId;
			} else return data;
		}

		return this;
	}
}

interface APIBattlePassSeason {
	startTime: string;
	number: number;
	durationInDays: number;
	goldPrice: number;
	goldPricePerReward: number;
	gemPricePerReward: number;
	xpPerReward: number;
	rewards: BattlePassSeasonReward[];
	iconUrl: string;
	seasonBackgroundId: string;
}

interface BattlePassSeasonReward {
	readonly type: string;
	readonly amount: number;
	readonly avatarItemId: string;
	readonly free: boolean;
}
