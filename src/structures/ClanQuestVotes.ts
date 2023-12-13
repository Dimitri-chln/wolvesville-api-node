import BaseStructure from '../base/BaseStructure';
import Client from '../client/Client';
import Clan from './Clan';
import { Collection } from '@discordjs/collection';

export default class ClanQuestVotes extends BaseStructure {
	readonly clan: Clan;
	readonly votes: Collection<string, Collection<string, string>>;
	readonly shuffleVotes: Collection<string, string>; // TODO: Transform this into the actual Player object if possible

	constructor(client: Client, clan: Clan, data: APIQuestVotes) {
		super(client);

		this.clan = clan;
		this.votes = new Collection(
			Object.keys(data.votes).map((questId) => [
				questId,
				new Collection(data.votes[questId].map((playerId) => [playerId, playerId])),
			]),
		);
		this.shuffleVotes = new Collection(data.shuffleVotes.map((playerId) => [playerId, playerId]));
	}
}

export interface APIQuestVotes {
	votes: {
		[K: string]: string[];
	};
	shuffleVotes: string[];
}
