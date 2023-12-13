import Client from '../client/Client';
import Util from '../util/Util';
import { Collection } from '@discordjs/collection';
import BaseManager from '../base/BaseManager';
import ClanAnnouncement, { APIClanAnnouncement } from '../structures/ClanAnnouncement';
import Clan from '../structures/Clan';

export default class ClanAnnouncementManager extends BaseManager<ClanAnnouncement> {
	readonly clan: Clan;

	constructor(client: Client, clan: Clan) {
		super(client);

		this.clan = clan;
	}

	async fetch(force: boolean = false, cache: boolean = true) {
		if (this.cache.size === 0 || force) {
			const data: APIClanAnnouncement[] = await Util.request(
				{
					method: 'GET',
					endpoint: `/clans/${this.clan.id}/announcements`,
				},
				this.client.token,
			);

			const announcements = data.map((element) => new ClanAnnouncement(this.client, this.clan, element));
			const entries = Util.transformRequestResult(announcements, 'id');
			const collection = new Collection(entries);

			if (cache) this.cache.concat(collection);
			return collection;
		}

		return this.cache;
	}

	async post(annoucement: string) {
		await Util.request(
			{
				method: 'POST',
				endpoint: `/clans/${this.clan.id}/announcements`,
				data: {
					message: annoucement,
				},
			},
			this.client.token,
		);
	}
}
