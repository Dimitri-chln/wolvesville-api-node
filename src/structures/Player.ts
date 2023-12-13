import BaseStructure from '../base/BaseStructure';
import Client from '../client/Client';
import Image from '../util/Image';
import { Collection } from '@discordjs/collection';

export default class Player extends BaseStructure {
	readonly id: string;
	readonly username: string;
	readonly creationTime?: Date;
	readonly personalMessage: string;
	readonly level: number;
	readonly status: 'DEFAULT' | string;
	readonly lastOnline: string;
	readonly rankedSeasonSkill: number;
	readonly rankedSeasonMaxSkill: number;
	readonly rankedSeasonPlayedCount: number;
	readonly receivedRosesCount: number;
	readonly sentRosesCount: number;
	readonly profileIconId: string;
	readonly profileIconColor: `#${string}`;
	readonly equippedAvatar: Image;
	readonly avatars: Image[];
	readonly badgeIds: string[];
	readonly roleCards: unknown[];
	readonly clanId: string;
	readonly gameStats: GameStats;

	constructor(client: Client, data: APIPlayer) {
		super(client);

		this.id = data.id;
		this.username = data.username;
		this.creationTime = new Date(data.creationTime ?? '2018-08-03T00:00:00.000Z');
		this.personalMessage = data.personalMessage;
		this.level = data.level;
		this.status = data.status;
		this.lastOnline = data.lastOnline;
		this.rankedSeasonSkill = data.rankedSeasonSkill;
		this.rankedSeasonMaxSkill = data.rankedSeasonMaxSkill;
		this.rankedSeasonPlayedCount = data.rankedSeasonPlayedCount;
		this.receivedRosesCount = data.receivedRosesCount;
		this.sentRosesCount = data.sentRosesCount;
		this.profileIconId = data.profileIconId;
		this.profileIconColor = data.profileIconColor;
		this.equippedAvatar = data.equippedAvatar;
		this.avatars = data.avatars;
		this.badgeIds = data.badgeIds;
		this.roleCards = data.roleCards;
		this.clanId = data.clanId;
		this.gameStats = {
			...data.gameStats,
			achievements: new Collection(data.gameStats.achievements.map((achievement) => [achievement.roleId, achievement])),
		};
	}
}

export interface APIPlayer {
	id: string;
	username: string;
	creationTime?: string;
	personalMessage: string;
	level: number;
	status: 'DEFAULT' | 'OFFLINE' | 'PLAY' | 'DND';
	lastOnline: string;
	rankedSeasonSkill: number;
	rankedSeasonMaxSkill: number;
	rankedSeasonPlayedCount: number;
	receivedRosesCount: number;
	sentRosesCount: number;
	profileIconId: string;
	profileIconColor: `#${string}`;
	equippedAvatar: Image;
	avatars: Image[];
	badgeIds: string[];
	roleCards: unknown[];
	clanId: string;
	gameStats: {
		totalWinCount: number;
		totalLoseCount: number;
		totalTieCount: number;
		villageWinCount: number;
		villageLoseCount: number;
		werewolfWinCount: number;
		werewolfLoseCount: number;
		votingWinCount: number;
		votingLoseCount: number;
		soloWinCount: number;
		soloLoseCount: number;
		exitGameBySuicideCount: number;
		exitGameAfterDeathCount: number;
		gamesSurvivedCount: number;
		gamesKilledCount: number;
		totalPlayTimeInMinutes: number;
		achievements: {
			roleId: string;
			level: number;
			points: number;
			pointsNextLevel: number;
			category: 'EASY' | 'NORMAL' | 'HARD';
		}[];
	};
}

interface GameStats {
	totalWinCount: number;
	totalLoseCount: number;
	totalTieCount: number;
	villageWinCount: number;
	villageLoseCount: number;
	werewolfWinCount: number;
	werewolfLoseCount: number;
	votingWinCount: number;
	votingLoseCount: number;
	soloWinCount: number;
	soloLoseCount: number;
	exitGameBySuicideCount: number;
	exitGameAfterDeathCount: number;
	gamesSurvivedCount: number;
	gamesKilledCount: number;
	totalPlayTimeInMinutes: number;
	achievements: Collection<string, RoleAchievement>;
}

interface RoleAchievement {
	roleId: string;
	level: number;
	points: number;
	pointsNextLevel: number;
	category: 'EASY' | 'NORMAL' | 'HARD';
}
