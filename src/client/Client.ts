import Items from './Items';
import RoleRotationManager from '../managers/RoleRotationManager';
import BattlePass from './BattlePass';
import Shop from './Shop';
import PlayerManager from '../managers/PlayerManager';
import ClanManager from '../managers/ClanManager';
import QuestManager from '../managers/QuestManager';

export default class Client {
	readonly id: string;
	readonly token: string;

	readonly items: Items;
	readonly roleRotations: RoleRotationManager;
	readonly battlePass: BattlePass;
	readonly shop: Shop;
	readonly players: PlayerManager;
	readonly clans: ClanManager;
	readonly quests: QuestManager;

	constructor(id: string, token: string, options: ClientOptions = {}) {
		this.id = id;
		this.token = token;

		this.items = new Items(this);
		this.roleRotations = new RoleRotationManager(this);
		this.battlePass = new BattlePass(this);
		this.shop = new Shop(this);
		this.players = new PlayerManager(this);
		this.clans = new ClanManager(this);
		this.quests = new QuestManager(this);
	}
}

interface ClientOptions {}
