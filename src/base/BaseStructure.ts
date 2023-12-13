import Client from '../client/Client';

export default class BaseStructure {
	readonly client: Client;

	constructor(client: Client) {
		this.client = client;
	}
}
