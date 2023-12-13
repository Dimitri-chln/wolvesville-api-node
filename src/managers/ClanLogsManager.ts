import Client from '../client/Client';
import Util from '../util/Util';
import { Collection } from '@discordjs/collection';
import BaseManager from '../base/BaseManager';
import ClanLogsEntry, { APIClanLogsEntry } from '../structures/ClanLogsEntry';
import Clan from '../structures/Clan';

export default class ClanLogsManager extends BaseManager<ClanLogsEntry> {
	readonly clan: Clan;

	constructor(client: Client, clan: Clan) {
		super(client);

		this.clan = clan;
	}

	async fetch() {
		const data: APIClanLogsEntry[] = await Util.request(
			{
				method: 'GET',
				endpoint: `/clans/${this.clan.id}/logs`,
			},
			this.client.token,
		);

		const logsEntries = data.map((element) => new ClanLogsEntry(this.client, this.clan, element));
		const entries = Util.transformRequestResult(logsEntries);
		const collection = new Collection(entries);

		return collection;
	}
}
