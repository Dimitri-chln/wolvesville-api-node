import Client from '../client/Client';
import Util from '../util/Util';
import { Collection } from '@discordjs/collection';
import BaseManager from '../base/BaseManager';
import Player, { APIPlayer } from '../structures/Player';

export default class PlayerManager extends BaseManager<Player> {
	constructor(client: Client) {
		super(client);
	}

	async fetch(id: string, force: boolean = false, cache: boolean = true) {
		if (this.cache.size > 0 && !force) return this.cache.get(id);

		const data: APIPlayer = await Util.request(
			{
				method: 'GET',
				endpoint: `/players/${id}`,
			},
			this.client.token,
		);

		const player = new Player(this.client, data);
		if (cache) this.cache.set(player.id, player);
		return player;
	}

	async search(username: string) {
		const data: APIPlayer = await Util.request(
			{
				method: 'GET',
				endpoint: `/players/search?username=${username}`,
			},
			this.client.token,
		);

		const player = new Player(this.client, data);
		return player;
	}
}
