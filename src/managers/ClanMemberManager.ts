import Client from '../client/Client';
import Util from '../util/Util';
import { Collection } from '@discordjs/collection';
import BaseManager from '../base/BaseManager';
import ClanMember, { APIClanMember } from '../structures/ClanMember';
import Clan from '../structures/Clan';

export default class ClanMemberManager extends BaseManager<ClanMember> {
	readonly clan: Clan;

	constructor(client: Client, clan: Clan) {
		super(client);

		this.clan = clan;
	}

	async fetch(force: boolean = false, cache: boolean = true) {
		if (this.cache.size === 0 || force) {
			const data: APIClanMember[] = await Util.request(
				{
					method: 'GET',
					endpoint: `/clans/${this.clan.id}/members`,
				},
				this.client.token,
			);

			const members = data.map((element) => new ClanMember(this.client, this.clan, element));
			const entries = Util.transformRequestResult(members, 'playerId');
			const collection = new Collection(entries);

			if (cache) this.cache.concat(collection);
			return collection;
		}

		return this.cache;
	}
}
