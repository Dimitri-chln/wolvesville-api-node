import Client from '../client/Client';
import Util from '../util/Util';
import { Collection } from '@discordjs/collection';
import BaseManager from '../base/BaseManager';
import RoleRotation, { APIRoleRotation } from '../structures/RoleRotation';

export default class RoleRotationManager extends BaseManager<RoleRotation> {
	constructor(client: Client) {
		super(client);
	}

	async fetch(force: boolean = false, cache: boolean = true) {
		if (this.cache.size === 0 || force) {
			const data: APIRoleRotation[] = await Util.request(
				{
					method: 'GET',
					endpoint: '/roleRotations',
				},
				this.client.token,
			);

			const roleRotations = data.map((element) => new RoleRotation(this.client, element));
			const entries = Util.transformRequestResult(roleRotations, 'gameMode');
			const collection = new Collection(entries);

			if (cache) this.cache.concat(collection);
			return collection;
		}

		return this.cache;
	}
}
