import BaseStructure from '../base/BaseStructure';
import Client from '../client/Client';
import Image from '../util/Image';

export default class RoleIcon extends BaseStructure {
	readonly id: string;
	readonly rarity: string;
	readonly image: Image;
	readonly roleId: string;

	constructor(client: Client, data: APIRoleIcon) {
		super(client);

		this.id = data.id;
		this.rarity = data.rarity;
		this.image = data.image;
		this.roleId = data.roleId;
	}
}

export interface APIRoleIcon {
	id: string;
	rarity: string;
	image: Image;
	roleId: string;
}
