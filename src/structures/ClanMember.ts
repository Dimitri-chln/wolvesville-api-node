import BaseStructure from '../base/BaseStructure';
import Client from '../client/Client';
import Util from '../util/Util';
import Clan from './Clan';

export default class ClanMember extends BaseStructure {
	readonly clan: Clan;

	readonly playerId: string;
	readonly creationTime: Date;
	readonly xp: number;
	readonly status: 'ACCEPTED' | string;
	readonly isCoLeader: boolean;
	readonly username: string;
	readonly level: number;
	readonly lastOnline: string;
	readonly profileIconId: string;
	readonly profileIconColor: `#${string}`;
	readonly playerStatus: 'DEFAULT' | string;
	readonly participateInClanQuests: boolean;

	constructor(client: Client, clan: Clan, data: APIClanMember) {
		super(client);

		this.clan = clan;

		this.playerId = data.playerId;
		this.creationTime = new Date(data.creationTime);
		this.xp = data.xp;
		this.status = data.status;
		this.isCoLeader = data.isCoLeader;
		this.username = data.username;
		this.level = data.level;
		this.lastOnline = data.lastOnline;
		this.profileIconId = data.profileIconId;
		this.profileIconColor = data.profileIconColor;
		this.playerStatus = data.playerStatus;
		this.participateInClanQuests = data.participateInClanQuests;
	}

	async enableQuestParticipation() {
		const data: ClanMember = await Util.request(
			{
				method: 'PUT',
				endpoint: `/clans/${this.clan.id}/members/${this.playerId}/participateInQuests`,
				data: {
					participateInQuests: true,
				},
			},
			this.client.token,
		);

		return data;
	}

	async disableQuestParticipation() {
		const data: ClanMember = await Util.request(
			{
				method: 'PUT',
				endpoint: `/clans/${this.clan.id}/members/${this.playerId}/participateInQuests`,
				data: {
					participateInQuests: false,
				},
			},
			this.client.token,
		);

		return data;
	}
}

export interface APIClanMember {
	playerId: string;
	creationTime: string;
	xp: number;
	status: 'ACCEPTED' | string;
	isCoLeader: boolean;
	username: string;
	level: number;
	lastOnline: string;
	profileIconId: string;
	profileIconColor: `#${string}`;
	playerStatus: 'DEFAULT' | string;
	participateInClanQuests: boolean;
}
