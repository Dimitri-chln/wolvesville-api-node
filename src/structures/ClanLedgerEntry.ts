import BaseStructure from '../base/BaseStructure';
import Client from '../client/Client';
import Clan from './Clan';

export default class ClanLedgerEntry extends BaseStructure {
	readonly clan: Clan;
	readonly id: string;
	readonly playerUsername: string;
	readonly type:
		| 'CREATE_CLAN'
		| 'DONATE'
		| 'CLAN_QUEST'
		| 'CLAN_ICON'
		| 'CLAN_QUEST_SHUFFLE'
		| 'CLAN_QUEST_SKIP_WAIT'
		| 'CLAN_QUEST_CLAIM_TIME';
	readonly creationTime: Date;
	readonly gold: number;
	readonly gems: number;
	readonly clanQuestId?: string;
	readonly playerId?: string;
	readonly comment?: string;

	constructor(client: Client, clan: Clan, data: APIClanLedgerEntry) {
		super(client);

		this.clan = clan;
		this.id = data.id;
		this.playerUsername = data.playerUsername;
		this.type = data.type;
		this.creationTime = new Date(data.creationTime);
		this.gold = data.gold;
		this.gems = data.gems;
		this.clanQuestId = data.clanQuestId;
		this.playerId = data.playerId;
		this.comment = data.comment;
	}
}

export interface APIClanLedgerEntry {
	id: string;
	playerUsername: string;
	type:
		| 'CREATE_CLAN'
		| 'DONATE'
		| 'CLAN_QUEST'
		| 'CLAN_ICON'
		| 'CLAN_QUEST_SHUFFLE'
		| 'CLAN_QUEST_SKIP_WAIT'
		| 'CLAN_QUEST_CLAIM_TIME';
	creationTime: string;
	gold: number;
	gems: number;
	clanQuestId?: string;
	playerId?: string;
	comment?: string;
}
