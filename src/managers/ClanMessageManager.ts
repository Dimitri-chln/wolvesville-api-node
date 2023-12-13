import Client from '../client/Client';
import Util from '../util/Util';
import { Collection } from '@discordjs/collection';
import BaseManager from '../base/BaseManager';
import ClanMessage, { APIClanMessage } from '../structures/ClanMessage';
import Clan from '../structures/Clan';

export default class ClanMessageManager extends BaseManager<ClanMessage> {
	readonly clan: Clan;

	constructor(client: Client, clan: Clan) {
		super(client);

		this.clan = clan;
	}

	async fetch(before?: Date) {
		const data: APIClanMessage[] = await Util.request(
			{
				method: 'GET',
				endpoint: `/clans/${this.clan.id}/chat${before ? `?oldest=${before.toISOString()}` : ''}`,
			},
			this.client.token,
		);

		const messages = data.map((element) => new ClanMessage(this.client, this.clan, element));
		const entries = Util.transformRequestResult(messages);
		const collection = new Collection(entries);

		return collection;
	}

	async post(message: string) {
		await Util.request(
			{
				method: 'POST',
				endpoint: `/clans/${this.clan.id}/chat`,
				data: {
					message: message,
				},
			},
			this.client.token,
		);
	}
}
