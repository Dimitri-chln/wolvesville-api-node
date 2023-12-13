import BaseStructure from '../base/BaseStructure';
import Client from '../client/Client';
import Util from '../util/Util';

import ClanMemberManager from '../managers/ClanMemberManager';
import ClanMessageManager from '../managers/ClanMessageManager';
import ClanAnnoucementManager from '../managers/ClanAnnouncementManager';
import ClanLedgerManager from '../managers/ClanLedgerManager';
import ClanLogsManager from '../managers/ClanLogsManager';
import ClanAvailableQuestManager from '../managers/ClanAvailableQuestManager';
import ClanQuestVotes, { APIQuestVotes } from './ClanQuestVotes';
import ClanActiveQuest, { APIClanActiveQuest } from './ClanActiveQuest';
import ClanQuestHistoryManager from '../managers/ClanQuestHistoryManager';

export default class Clan extends BaseStructure {
	readonly id: string;
	readonly creationTime: Date;
	readonly name: string;
	readonly description: string;
	readonly xp: number;
	readonly language: string;
	readonly icon: string;
	readonly iconColor: `#${string}`;
	readonly tag: string;
	readonly joinType: 'JOIN_BY_REQUEST' | string;
	readonly leaderId: string;
	readonly questHistoryCount: number;
	readonly minLevel: number;
	readonly memberCount: number;
	readonly gold?: number;
	readonly gems?: number;

	readonly members: ClanMemberManager;
	readonly chat: ClanMessageManager;
	readonly announcements: ClanAnnoucementManager;
	readonly ledger: ClanLedgerManager;
	readonly logs: ClanLogsManager;
	readonly availableQuests: ClanAvailableQuestManager;
	readonly questHistory: ClanQuestHistoryManager;

	constructor(client: Client, data: APIClanInfo) {
		super(client);

		this.id = data.id;
		this.creationTime = new Date(data.creationTime);
		this.name = data.name;
		this.description = data.description;
		this.xp = data.xp;
		this.language = data.language;
		this.icon = data.icon;
		this.iconColor = data.iconColor;
		this.tag = data.tag;
		this.joinType = data.joinType;
		this.leaderId = data.leaderId;
		this.questHistoryCount = data.questHistoryCount;
		this.minLevel = data.minLevel;
		this.memberCount = data.memberCount;
		this.gold = data.gold;
		this.gems = data.gems;

		this.members = new ClanMemberManager(client, this);
		this.chat = new ClanMessageManager(client, this);
		this.announcements = new ClanAnnoucementManager(client, this);
		this.ledger = new ClanLedgerManager(client, this);
		this.logs = new ClanLogsManager(client, this);
		this.availableQuests = new ClanAvailableQuestManager(client, this);
		this.questHistory = new ClanQuestHistoryManager(client, this);
	}

	get questVotes(): Promise<ClanQuestVotes> {
		return new Promise(async (resolve, reject) => {
			const data: APIQuestVotes = await Util.request(
				{
					method: 'GET',
					endpoint: `/clans/${this.id}/quests/votes`,
				},
				this.client.token,
			);

			const questVotes = new ClanQuestVotes(this.client, this, data);
			resolve(questVotes);
		});
	}

	async shuffleQuests() {
		await Util.request(
			{
				method: 'POST',
				endpoint: `/clans/${this.id}/quests/available/shuffle`,
			},
			this.client.token,
		);
	}

	async claimQuest(questId: string) {
		await Util.request(
			{
				method: 'POST',
				endpoint: `/clans/${this.id}/quests/claim`,
				data: {
					questId: questId,
				},
			},
			this.client.token,
		);
	}

	get activeQuest(): Promise<ClanActiveQuest> {
		return new Promise(async (resolve, reject) => {
			const data: APIClanActiveQuest = await Util.request(
				{
					method: 'GET',
					endpoint: `/clans/${this.id}/quests/active`,
				},
				this.client.token,
			);

			const activeQuest = new ClanActiveQuest(this.client, this, data);
			resolve(activeQuest);
		});
	}
}

export interface APIClanInfo {
	id: string;
	creationTime: string;
	name: string;
	description: string;
	xp: number;
	language: string;
	icon: string;
	iconColor: `#${string}`;
	tag: string;
	joinType: 'JOIN_BY_REQUEST' | string;
	leaderId: string;
	questHistoryCount: number;
	minLevel: number;
	memberCount: number;
	gold?: number;
	gems?: number;
}
