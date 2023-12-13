import BaseStructure from '../base/BaseStructure';
import Client from '../client/Client';

export default class Talisman extends BaseStructure {
	readonly id: string;
	readonly roleId: string;
	readonly deprecated: boolean;

	constructor(client: Client, data: APITalisman) {
		super(client);

		this.id = data.id;
		this.roleId = data.roleId;
		this.deprecated = data.deprecated;
	}
}

export interface APITalisman {
	id: string;
	roleId: string;
	deprecated: boolean;
}
