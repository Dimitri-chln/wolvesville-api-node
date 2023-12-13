import Client from './Client';
import Util from '../util/Util';

import AdvancedRoleCardOfferManager from '../managers/AdvancedRoleCardOfferManager';
import AvatarItems from '../managers/AvatarItemManager';
import AvatarItemCollectionManager from '../managers/AvatarItemCollectionManager';
import AvatarItemSetManager from '../managers/AvatarItemSetManager';
import BackgroundManager from '../managers/BackgroundManager';
import EmojiManager from '../managers/EmojiManager';
import EmojiCollectionManager from '../managers/EmojiCollectionManager';
import LoadingScreenManager from '../managers/LoadingScreenManager';
import ProfileIconManager from '../managers/ProfileIconManager';
import RoleIconManager from '../managers/RoleIconManager';
import RoseManager from '../managers/RoseManager';
import TalismanManager from '../managers/TalismanManager';

export default class Items {
	readonly client: Client;

	readonly advancedRoleCardOffers: AdvancedRoleCardOfferManager;
	readonly avatarItems: AvatarItems;
	readonly avatarItemCollections: AvatarItemCollectionManager;
	readonly avatarItemSets: AvatarItemSetManager;
	readonly backgrounds: BackgroundManager;
	readonly emojis: EmojiManager;
	readonly emojiCollections: EmojiCollectionManager;
	readonly loadingScreens: LoadingScreenManager;
	readonly profileIcons: ProfileIconManager;
	readonly roleIcons: RoleIconManager;
	readonly roses: RoseManager;
	readonly talismans: TalismanManager;

	constructor(client: Client) {
		this.client = client;

		this.advancedRoleCardOffers = new AdvancedRoleCardOfferManager(client);
		this.avatarItems = new AvatarItems(client);
		this.avatarItemCollections = new AvatarItemCollectionManager(client);
		this.avatarItemSets = new AvatarItemSetManager(client);
		this.backgrounds = new BackgroundManager(client);
		this.emojis = new EmojiManager(client);
		this.emojiCollections = new EmojiCollectionManager(client);
		this.loadingScreens = new LoadingScreenManager(client);
		this.profileIcons = new ProfileIconManager(client);
		this.roleIcons = new RoleIconManager(client);
		this.roses = new RoseManager(client);
		this.talismans = new TalismanManager(client);
	}

	async fetchAll() {
		await Promise.all([
			this.advancedRoleCardOffers.fetch(),
			this.avatarItems.fetch(),
			this.avatarItemCollections.fetch(),
			this.avatarItemSets.fetch(),
			this.backgrounds.fetch(),
			this.emojis.fetch(),
			this.emojiCollections.fetch(),
			this.loadingScreens.fetch(),
			this.profileIcons.fetch(),
			this.roleIcons.fetch(),
			this.roses.fetch(),
			this.talismans.fetch(),
		]);
	}

	async redeemApiHat() {
		await Util.request(
			{
				method: 'POST',
				endpoint: '/items/redeemApiHat',
			},
			this.client.token,
		);
	}
}
