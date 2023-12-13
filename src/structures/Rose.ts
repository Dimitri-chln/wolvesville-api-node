import BaseStructure from '../base/BaseStructure';
import Client from '../client/Client';

export default class Rose extends BaseStructure {
	readonly id: string;
	readonly type: 'SINGLE_ROSE' | 'SERVER_ROSE';

	constructor(client: Client, data: APIRose) {
		super(client);

		this.id = data.id;
		this.type = data.type;
	}
}

export interface APIRose {
	id: string;
	type: 'SINGLE_ROSE' | 'SERVER_ROSE';
}
