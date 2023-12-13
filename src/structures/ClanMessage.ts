import BaseStructure from '../base/BaseStructure';
import Client from '../client/Client';
import Clan from './Clan';

export default class ClanMessage extends BaseStructure {
	readonly clan: Clan;
	readonly authorId: string; // TODO: Transform this into the actual Player object if possible
	readonly timestamp: Date;
	readonly content: string;
	readonly isSystem: boolean;
	readonly isPinned;

	constructor(client: Client, clan: Clan, data: APIClanMessage) {
		super(client);

		this.clan = clan;
		this.authorId = data.playerId;
		this.timestamp = new Date(data.date);
		this.content = data.msg;
		this.isSystem = data.isSystem;
		this.isPinned = data.isPinned;
	}
}

export interface APIClanMessage {
	playerId: string;
	date: string;
	msg: string;
	isSystem: boolean;
	isPinned: boolean;
}
