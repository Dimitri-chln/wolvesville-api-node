import Client from '../client/Client';
import Util from '../util/Util';
import { Collection } from '@discordjs/collection';
import BaseManager from '../base/BaseManager';
import ProfileIcon, { APIProfileIcon } from '../structures/ProfileIcon';

export default class ProfileIconManager extends BaseManager<ProfileIcon> {
	constructor(client: Client) {
		super(client);
	}

	async fetch(force: boolean = false, cache: boolean = true) {
		if (this.cache.size === 0 || force) {
			const data: APIProfileIcon[] = await Util.request(
				{
					method: 'GET',
					endpoint: '/items/profileIcons',
				},
				this.client.token,
			);

			const profileIcons = data.map((element) => new ProfileIcon(this.client, element));
			const entries = Util.transformRequestResult(profileIcons, 'id');
			const collection = new Collection(entries);

			if (cache) this.cache.concat(collection);
			return collection;
		}

		return this.cache;
	}
}
