import Client from '../client/Client';
import Util from '../util/Util';
import { Collection } from '@discordjs/collection';
import BaseManager from '../base/BaseManager';
import ClanLedgerEntry, { APIClanLedgerEntry } from '../structures/ClanLedgerEntry';
import Clan from '../structures/Clan';

export default class ClanLedgerManager extends BaseManager<ClanLedgerEntry> {
	readonly clan: Clan;

	constructor(client: Client, clan: Clan) {
		super(client);

		this.clan = clan;
	}

	async fetch() {
		const data: APIClanLedgerEntry[] = await Util.request(
			{
				method: 'GET',
				endpoint: `/clans/${this.clan.id}/ledger`,
			},
			this.client.token,
		);

		const ledgerEntries = data.map((element) => new ClanLedgerEntry(this.client, this.clan, element));
		const entries = Util.transformRequestResult(ledgerEntries);
		const collection = new Collection(entries);

		return collection;
	}
}
