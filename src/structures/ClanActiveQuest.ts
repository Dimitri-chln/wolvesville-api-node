import BaseStructure from '../base/BaseStructure';
import Client from '../client/Client';
import Util from '../util/Util';
import Clan from './Clan';

import Quest, { APIQuest } from './Quest';

export default class ClanActiveQuest extends BaseStructure {
	readonly clan: Clan;
	readonly quest: Quest;
	readonly participants: QuestParticipant[];
	readonly xp: number;
	readonly xpPerReward: number;
	readonly tier: number;
	readonly tierStartTime: string;
	readonly tierEndTime: string;
	readonly tierFinished: boolean;
	readonly claimedTime: boolean;

	constructor(client: Client, clan: Clan, data: APIClanActiveQuest) {
		super(client);

		this.clan = clan;
		this.quest = new Quest(client, data.quest);
		this.participants = data.participants;
		this.xp = data.xp;
		this.xpPerReward = data.xpPerReward;
		this.tier = data.tier;
		this.tierStartTime = data.tierStartTime;
		this.tierEndTime = data.tierEndTime;
		this.tierFinished = data.tierFinished;
		this.claimedTime = data.claimedTime;
	}

	async skipWaitingTime() {
		await Util.request(
			{
				method: 'POST',
				endpoint: `/clans/${this.clan}/quests/active/skipWaitingTime`,
			},
			this.client.token,
		);
	}

	async claimTime() {
		await Util.request(
			{
				method: 'POST',
				endpoint: `/clans/${this.clan}/quests/active/claimTime`,
			},
			this.client.token,
		);
	}

	async cancel() {
		await Util.request(
			{
				method: 'POST',
				endpoint: `/clans/${this.clan}/quests/active/cancel`,
			},
			this.client.token,
		);
	}
}

export interface APIClanActiveQuest {
	quest: APIQuest;
	participants: QuestParticipant[];
	xp: number;
	xpPerReward: number;
	tier: number;
	tierStartTime: string;
	tierEndTime: string;
	tierFinished: boolean;
	claimedTime: boolean;
}

interface QuestParticipant {
	playerId: string;
	username: string;
	xp: number;
}
