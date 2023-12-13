import BaseStructure from '../base/BaseStructure';
import Client from '../client/Client';
import Clan from './Clan';

export default class ClanLogsEntry extends BaseStructure {
	readonly clan: Clan;
	readonly performedByBot: boolean;
	readonly playerId: string;
	readonly playerUsername: string;
	readonly targetPlayerId: string;
	readonly targetPlayerUsername: string;
	readonly creationTime: Date;
	readonly action:
		| 'BLACKLIST_ADDED'
		| 'BLACKLIST_REMOVED'
		| 'JOIN_REQUEST_SENT_BY_CLAN'
		| 'JOIN_REQUEST_SENT_BY_EXTERNAL_PLAYER'
		| 'JOIN_REQUEST_ACCEPTED'
		| 'JOIN_REQUEST_DECLINED_BY_CLAN'
		| 'JOIN_REQUEST_DECLINED_BY_EXTERNAL_PLAYER'
		| 'JOIN_REQUEST_WITHDRAWN'
		| 'LEADER_CHANGED'
		| 'CO_LEADER_PROMOTED'
		| 'CO_LEADER_DEMOTED'
		| 'CO_LEADER_RESIGNED'
		| 'PLAYER_LEFT'
		| 'PLAYER_KICKED'
		| 'PLAYER_JOINED'
		| 'PLAYER_QUEST_PARTICIPATION_ENABLED'
		| 'PLAYER_QUEST_PARTICIPATION_DISABLED';

	constructor(client: Client, clan: Clan, data: APIClanLogsEntry) {
		super(client);

		this.clan = clan;
		this.performedByBot = Boolean(data.playerBotId);
		this.playerId = data.playerId ?? data.playerBotId;
		this.playerUsername = data.playerUsername ?? data.playerBotUsername;
		this.targetPlayerId = data.targetPlayerId;
		this.targetPlayerUsername = data.targetPlayerUsername;
		this.creationTime = new Date(data.creationTime);
		this.action = data.action;
	}
}

export interface APIClanLogsEntry {
	playerId: string;
	playerUsername: string;
	playerBotId: string;
	playerBotUsername: string;
	targetPlayerId: string;
	targetPlayerUsername: string;
	creationTime: string;
	action:
		| 'BLACKLIST_ADDED'
		| 'BLACKLIST_REMOVED'
		| 'JOIN_REQUEST_SENT_BY_CLAN'
		| 'JOIN_REQUEST_SENT_BY_EXTERNAL_PLAYER'
		| 'JOIN_REQUEST_ACCEPTED'
		| 'JOIN_REQUEST_DECLINED_BY_CLAN'
		| 'JOIN_REQUEST_DECLINED_BY_EXTERNAL_PLAYER'
		| 'JOIN_REQUEST_WITHDRAWN'
		| 'LEADER_CHANGED'
		| 'CO_LEADER_PROMOTED'
		| 'CO_LEADER_DEMOTED'
		| 'CO_LEADER_RESIGNED'
		| 'PLAYER_LEFT'
		| 'PLAYER_KICKED'
		| 'PLAYER_JOINED'
		| 'PLAYER_QUEST_PARTICIPATION_ENABLED'
		| 'PLAYER_QUEST_PARTICIPATION_DISABLED';
}

export interface APIClanLogsEntry {
	playerBotId: string;
	playerBotUsername: string;
	targetPlayerId: string;
	targetPlayerUsername: string;
	creationTime: string;
	action:
		| 'BLACKLIST_ADDED'
		| 'BLACKLIST_REMOVED'
		| 'JOIN_REQUEST_SENT_BY_CLAN'
		| 'JOIN_REQUEST_SENT_BY_EXTERNAL_PLAYER'
		| 'JOIN_REQUEST_ACCEPTED'
		| 'JOIN_REQUEST_DECLINED_BY_CLAN'
		| 'JOIN_REQUEST_DECLINED_BY_EXTERNAL_PLAYER'
		| 'JOIN_REQUEST_WITHDRAWN'
		| 'LEADER_CHANGED'
		| 'CO_LEADER_PROMOTED'
		| 'CO_LEADER_DEMOTED'
		| 'CO_LEADER_RESIGNED'
		| 'PLAYER_LEFT'
		| 'PLAYER_KICKED'
		| 'PLAYER_JOINED'
		| 'PLAYER_QUEST_PARTICIPATION_ENABLED'
		| 'PLAYER_QUEST_PARTICIPATION_DISABLED';
}
