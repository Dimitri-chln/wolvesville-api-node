import Client from '../client/Client';
import Util from '../util/Util';
import { Collection } from '@discordjs/collection';
import BaseManager from '../base/BaseManager';
import RoleIcon, { APIRoleIcon } from '../structures/RoleIcon';

export default class RoleIconManager extends BaseManager<RoleIcon> {
	constructor(client: Client) {
		super(client);
	}

	async fetch(force: boolean = false, cache: boolean = true) {
		if (this.cache.size === 0 || force) {
			const data: APIRoleIcon[] = await Util.request(
				{
					method: 'GET',
					endpoint: '/items/roleIcons',
				},
				this.client.token,
			);

			const roleIcons = data.map((element) => new RoleIcon(this.client, element));
			const entries = Util.transformRequestResult(roleIcons, 'id');
			const collection = new Collection(entries);

			if (cache) this.cache.concat(collection);
			return collection;
		}

		return this.cache;
	}
}
