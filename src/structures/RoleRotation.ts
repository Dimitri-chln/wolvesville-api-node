import BaseStructure from '../base/BaseStructure';
import Client from '../client/Client';
import { Collection } from '@discordjs/collection';

export default class RoleRotation extends BaseStructure {
	readonly gameMode: 'quick' | 'sandbox' | 'advanced' | 'ranked-league-silver' | 'ranked-league-gold' | 'crazy-fun';
	readonly languages: string[];
	readonly roleRotations: Collection<string, RoleRotationSetup>;
	readonly minWinRequirement: number;
	readonly fontAwesomeIcon: string;

	constructor(client: Client, data: APIRoleRotation) {
		super(client);

		this.gameMode = data.gameMode;
		this.languages = data.languages;
		this.roleRotations = new Collection(
			data.roleRotations.map((roleRotation) => [
				roleRotation.roleRotation.id,
				{
					roleRotation: {
						id: roleRotation.roleRotation.id,
						roles: new Collection(
							roleRotation.roleRotation.roles.map((roleRotationRole) => [roleRotationRole.role, roleRotationRole]),
						),
					},
					probability: roleRotation.probability,
				},
			]),
		);
		this.minWinRequirement = data.minWinRequirement;
		this.fontAwesomeIcon = data.fontAwesomeIcon;
	}
}

export interface APIRoleRotation {
	gameMode: 'quick' | 'sandbox' | 'advanced' | 'ranked-league-silver' | 'ranked-league-gold' | 'crazy-fun';
	languages: string[];
	roleRotations: {
		roleRotation: {
			id: string;
			roles: {
				probability: number;
				role: string;
			}[];
		};
		probability: number;
	}[];
	minWinRequirement: number;
	fontAwesomeIcon: string;
}

interface RoleRotationSetup {
	readonly roleRotation: RoleRotationRoles;
	readonly probability: number;
}

interface RoleRotationRoles {
	readonly id: string;
	readonly roles: Collection<string, RoleRotationRole>;
}

interface RoleRotationRole {
	readonly probability: number;
	readonly role: string;
}
