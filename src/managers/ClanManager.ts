import Client from '../client/Client';
import Util from '../util/Util';
import { Collection } from '@discordjs/collection';
import BaseManager from '../base/BaseManager';
import Clan, { APIClanInfo } from '../structures/Clan';

export default class ClanManager extends BaseManager<Clan> {
	constructor(client: Client) {
		super(client);
	}

	async fetch(id: string, force: boolean = false, cache: boolean = true) {
		if (this.cache.size > 0 && !force) return this.cache.get(id);

		const data: APIClanInfo = await Util.request(
			{
				method: 'GET',
				endpoint: `/clans/${id}/info`,
			},
			this.client.token,
		);

		const clan = new Clan(this.client, data);
		if (cache) this.cache.set(clan.id, clan);
		return clan;
	}

	async search(name: string) {
		const data: APIClanInfo[] = await Util.request(
			{
				method: 'GET',
				endpoint: `/clans/search?name=${name}`,
			},
			this.client.token,
		);

		const clans = data.map((element) => new Clan(this.client, element));
		return clans;
	}

	async authorized() {
		const data: APIClanInfo[] = await Util.request(
			{
				method: 'GET',
				endpoint: `/clans/authorized`,
			},
			this.client.token,
		);

		const clans = data.map((element) => new Clan(this.client, element));
		return clans;
	}
}
