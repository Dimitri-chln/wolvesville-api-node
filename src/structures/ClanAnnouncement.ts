import BaseStructure from '../base/BaseStructure';
import Client from '../client/Client';
import Clan from './Clan';

export default class ClanAnnouncement extends BaseStructure {
	readonly clan: Clan;
	readonly id: string;
	readonly content: string;
	readonly authorUsername: string; // TODO: Transform this into the actual Player object if possible
	readonly timestamp: Date;
	readonly editAuthorUsername?: string; // TODO: Transform this into the actual Player object if possible
	readonly editTimestamp?: Date;

	constructor(client: Client, clan: Clan, data: APIClanAnnouncement) {
		super(client);

		this.clan = clan;
		this.id = data.id;
		this.content = data.content;
		this.authorUsername = data.author;
		this.timestamp = new Date(data.timestamp);
		this.editAuthorUsername = data.editAuthor;
		this.editTimestamp = data.editTimestamp ? new Date(data.editTimestamp) : undefined;
	}
}

export interface APIClanAnnouncement {
	id: string;
	content: string;
	author: string; // TODO: Transform this into the actual Player object if possible
	timestamp: string;
	editAuthor?: string; // TODO: Transform this into the actual Player object if possible
	editTimestamp?: string;
}
