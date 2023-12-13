import Client from '../client/Client';
import { Collection } from '@discordjs/collection';

export default class BaseManager<T> {
	readonly client: Client;
	readonly cache: Collection<unknown, T>;

	constructor(client: Client) {
		this.client = client;
		this.cache = new Collection();
	}
}
