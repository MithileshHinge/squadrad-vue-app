<template>
	<b-navbar id="sq-the-navbar" type="dark" class="pl-lg-3" toggleable="lg" fixed="top">
		<b-navbar-brand id="sq-the-navbrand" class="cursor-pointer" :to="isAuthenticated ? (isCreator ? '/creator' : '/feed') : '/'">
			<b-img id="sq-the-navlogo" src="@/assets/squadrad-fav.png" fluid left></b-img>
		</b-navbar-brand>
		<b-navbar-toggle id="sq-the-navmenubtn" target="sq-the-navmenu">
			<!--span class="sq-icon-bar sq-top-bar"></span>
			<span class="sq-icon-bar sq-middle-bar"></span>
			<span class="sq-icon-bar sq-bottom-bar"></span-->
			<b-avatar v-if="isAuthenticated" id="sq-the-menubtn-avatar" :src='getProfilePicSrc($store.state.creator.profilePicSrc || $store.state.user.profilePicSrc, isCreator)' size="2rem"></b-avatar>
			<span v-else class="sq-icon-bar"></span>
		</b-navbar-toggle>
		<b-navbar-nav v-if="isAuthenticated" class="d-none d-lg-flex ml-auto align-items-center">
			<b-nav-item style="width: 15rem" class="position-relative">
				<SearchBar v-model="searchText" searchPlaceholder="Search creators" :renderFocused="false" size="sm" @focus="navSearchBarFocus" @blur="navSearchBarBlur"/>
				<div id="sq-the-nav-search-results" :class="`sq-shadow ${!creatorsSearchFiltered || creatorsSearchFiltered.length <= 0 ? 'd-none' : ''}`">
					<UserList :loading="loadingCreators" size="sm" :showSubtext="true" :users="creatorsSearchFiltered" @click="navSearchCreatorClicked"/>
				</div>
			</b-nav-item>
			<b-nav-item v-if="isCreator" class="px-1" link-classes="p-0" to="/create-post">
				<b-icon-plus font-scale="2.5"/>
			</b-nav-item>
			<b-nav-item-dropdown class="px-1 position-relative" right no-caret toggle-class="shadow-none bg-transparent border-0" menu-class="p-0 border-0" lazy @shown="showNewNotifsIndicator = false">
				<template #button-content>
					<b-icon-bell-fill/>
					<b-icon-circle-fill v-if="showNewNotifsIndicator" variant="primary" font-scale="0.375" class="position-absolute ml-n1"/>
				</template>
				<div id="sq-the-nav-notifications-list" class="sq-shadow">
					<NotificationsList />
				</div>
			</b-nav-item-dropdown>
			<b-nav-item class="px-1" to="/messages"><b-icon-chat-fill/></b-nav-item>
			<b-dropdown right no-caret toggle-class="shadow-none bg-transparent border-0" menu-class="my-n1 sq-shadow border-0">
				<template #button-content>
					<b-avatar v-if="isAuthenticated" :src='getProfilePicSrc($store.state.creator.profilePicSrc || $store.state.user.profilePicSrc, isCreator)' size="2rem"></b-avatar>
				</template>
				<b-dropdown-item class="sq-menu-item" link-class="py-2 px-3 sq-text sq-link" :to="isCreator ? '/creator' : '/feed'">{{ isCreator ? $store.state.creator.pageName : $store.state.user.fullName }}</b-dropdown-item>
				<b-dropdown-item class="sq-menu-item" link-class="py-2 px-3 sq-text" v-if="isCreator" to="/creator/settings/info">Page settings</b-dropdown-item>
				<b-dropdown-item class="sq-menu-item" link-class="py-2 px-3 sq-text" v-if="isCreator" to="/feed">Post from my Creators</b-dropdown-item>
				<b-dropdown-item class="sq-menu-item" link-class="py-2 px-3 sq-text" to="/user/squads">My Squads</b-dropdown-item>
				<b-dropdown-item class="sq-menu-item" link-class="py-2 px-3 sq-text" v-if="!isCreator" to="/creator/start">Start a membership page</b-dropdown-item>
				<b-dropdown-item class="sq-menu-item" link-class="py-2 px-3 sq-text" to="/user/settings">Account settings</b-dropdown-item>
				<!--b-nav-item class="sq-menu-item" to="/user/billing">Billing</b-nav-item-->
				<!-- <b-dropdown-item class="sq-menu-item" link-class="py-2 px-3 sq-text">Help and FAQ</b-dropdown-item> -->
				<b-dropdown-item class="sq-menu-item" link-class="py-2 px-3 sq-text" href="mailto:support@squadrad.com">Contact us</b-dropdown-item>
				<b-dropdown-item class="sq-menu-item" link-class="py-2 px-3 sq-text" @click="logout">Log out</b-dropdown-item>
			</b-dropdown>
		</b-navbar-nav>
		<b-navbar-nav v-else class="d-none d-lg-flex w-100 align-items-center">
			<b-nav-item class="sq-navbar-nav-item" to="/explore">Explore creators</b-nav-item>
			<!-- <b-nav-item class="sq-navbar-nav-item">Pricing</b-nav-item> -->
			<!-- <b-nav-item class="sq-navbar-nav-item">Help and FAQ</b-nav-item> -->
			<b-nav-item class="sq-navbar-nav-item mr-auto" href="mailto:support@squadrad.com">Contact us</b-nav-item>
			<b-nav-item class="sq-navbar-nav-item mr-2" id="sq-the-navbar-login-button" link-classes="sq-btn-cta sq-btn" to="/login">Log in</b-nav-item>
			<b-nav-item class="sq-navbar-nav-item mr-3" to="/signup">Sign up</b-nav-item>
		</b-navbar-nav>
		<b-sidebar id="sq-the-navmenu" is-nav right shadow no-header class="sq-sidebar">
			<b-navbar-nav v-if="isAuthenticated" class="ml-auto">
				<!--b-nav-form id="the-searchbar" class="mt-auto mb-auto" action="https://google.com" autocomplete="off">
					<b-input-group id="the-searchbar-wrapper">
						<b-input-group-prepend id="the-searchbtn" size="sm" class="my-1 my-sm-0 p-0" is-text type="submit">
							<b-icon size="sm" icon="search"></b-icon>
						</b-input-group-prepend>
						<b-form-input id="the-searchinput" size="sm" class="p-0" placeholder="search"></b-form-input>
					</b-input-group>
				</b-nav-form-->
				<b-nav-item class="sq-menu-item" link-classes="sq-link" :to="isCreator ? '/creator' : '/feed'">{{ isCreator ? $store.state.creator.pageName : $store.state.user.fullName }}</b-nav-item>
				<b-nav-item class="sq-menu-item" v-if="isCreator" to="/creator/settings">Page settings</b-nav-item>
				<b-nav-item class="sq-menu-item" v-if="isCreator" to="/feed">Post from my Creators</b-nav-item>
				<b-nav-item class="sq-menu-item" to="/user/squads">My Squads</b-nav-item>
				<b-nav-item class="sq-menu-item" v-if="!isCreator" to="/creator/start">Start a membership page</b-nav-item>
				<b-nav-item class="sq-menu-item" to="/user/settings">Account settings</b-nav-item>
				<!--b-nav-item class="sq-menu-item" to="/user/billing">Billing</b-nav-item-->
				<!-- <b-nav-item class="sq-menu-item">Help and FAQ</b-nav-item> -->
				<b-nav-item class="sq-menu-item" href="mailto:support@squadrad.com">Contact us</b-nav-item>
				<b-nav-item class="sq-menu-item" @click="logout">Log out</b-nav-item>
			</b-navbar-nav>
			<b-navbar-nav v-else class="ml-auto">
				<!--b-nav-form id="the-searchbar" class="mt-auto mb-auto" action="https://google.com" autocomplete="off">
					<b-input-group id="the-searchbar-wrapper">
						<b-input-group-prepend id="the-searchbtn" size="sm" class="my-1 my-sm-0 p-0" is-text type="submit">
							<b-icon size="sm" icon="search"></b-icon>
						</b-input-group-prepend>
						<b-form-input id="the-searchinput" size="sm" class="p-0" placeholder="search"></b-form-input>
					</b-input-group>
				</b-nav-form-->
				<b-nav-item class="sq-menu-item" to="/login">Log in</b-nav-item>
				<b-nav-item class="sq-menu-item" to="/signup">Sign up</b-nav-item>
				<b-nav-item class="sq-menu-item" to="/explore">Explore creators</b-nav-item>
				<!-- <b-nav-item class="sq-menu-item">Pricing</b-nav-item> -->
				<!-- <b-nav-item class="sq-menu-item">Help and FAQ</b-nav-item> -->
				<b-nav-item class="sq-menu-item" href="mailto:support@squadrad.com">Contact us</b-nav-item>
			</b-navbar-nav>
		</b-sidebar>
	</b-navbar>
</template>

<script>
import getProfilePicSrc from '../common/getProfilePicSrc';
import SearchBar from './SearchBar.vue';
import UserList from './UserList.vue';
import NotificationsList from './NotificationsList.vue';
import creatorService from '../services/creator.service';

export default {
	props: {
		isAuthenticated: Boolean,
		isCreator: Boolean,
		isUnseenNotifs: Boolean,
	},
	data() {
		return {
			getProfilePicSrc,
			isNavSearchBarFocused: false,
			searchText: '',
			creators: undefined,
			loadingCreators: false,
			showNewNotifsIndicator: this.isUnseenNotifs,
			showNotificationsList: false,
		};
	},
	watch: {
		isUnseenNotifs(val) {
			if (this.showNewNotifsIndicator === undefined) this.showNewNotifsIndicator = val;
		},
		'$route.path': function path() {
			this.showNewNotifsIndicator = undefined;
		},
	},
	computed: {
		creatorsSearchFiltered() {
			if (this.creators === undefined) return undefined;
			if (this.searchText.length < 2) return [];
			if (!this.isNavSearchBarFocused) return [];
			return this.creators.filter((creator) => creator.pageName.toLowerCase().includes(this.searchText.toLowerCase())).map((creator) => ({
				userId: creator.userId,
				name: creator.pageName,
				profilePicSrc: creator.profilePicSrc,
				subtext: `is creating ${creator.bio}`,
			}));
		},
	},
	methods: {
		async navSearchBarFocus() {
			this.isNavSearchBarFocused = true;
			if (!this.creators) {
				this.loadingCreators = true;
				try {
					const res = await creatorService.getAllCreators();
					if (res && res.status === 200) {
						this.creators = res.data;
						this.loadingCreators = false;
					}
				} catch (err) {
					console.log(err);
				}
			}
		},
		navSearchBarBlur() {
			setTimeout(() => {
				this.isNavSearchBarFocused = false;
			}, 200);
		},
		navSearchCreatorClicked($event) {
			this.searchText = '';
			this.$router.push(`/creator/${$event.userId}`);
		},
		logout() {
			this.$store.dispatch('logoutUser').then(() => {
				this.$router.push('/');
			});
		},
	},
	components: {
		SearchBar,
		UserList,
		NotificationsList,
	},
};
</script>

<style lang="scss" scoped>
	#sq-the-navbar {
		z-index: 1030;
		height: 3.375rem;
		background: $my-color-dark;
		padding: 0.125rem 0.5rem 0.125rem 0.75rem;
	}

	#sq-the-navbar .sq-menu-item .nav-link {
		color: $my-color-gray1;
	}

	#sq-the-navlogo {
		width: 2.5rem;
		height: 2.5rem;
	}

	/*
	#the-searchbtn div {
		background: $my-color-background;
		color: $my-text-color-secondary;
		box-shadow: none;
		border: none;
		border-radius: 0;
	}
	*/

	#sq-the-navmenubtn {
		border: none;
		outline: none;
		background-image: none;
	}

	#sq-the-navmenubtn .sq-icon-bar {
		display: block;
		width: 1.75rem;
		height: 0.125rem;
		border-radius: 1px;
		transition: all 0.2s;
	}

	#sq-the-navmenubtn .sq-icon-bar::before, #sq-the-navmenubtn .sq-icon-bar::after {
		content: '';
		position: absolute;
		background-color: $my-color-gray3;
		display: block;
		width: 1.75rem;
		height: 0.125rem;
		border-radius: 1px;
		transition: all 0.2s;
	}

	#sq-the-navmenubtn.collapsed .sq-icon-bar::before {
		transform: translateY(-0.625rem);
	}

	#sq-the-navmenubtn.collapsed .sq-icon-bar::after {
		transform: translateY(0.625rem);
	}

	#sq-the-navmenubtn.collapsed .sq-icon-bar {
		background-color: $my-color-gray3;
	}

	#sq-the-navmenubtn .sq-icon-bar {
		background-color: transparent;
	}

	#sq-the-navmenubtn .sq-icon-bar::before {
		transform: translateY(0) rotate(45deg);
	}

	#sq-the-navmenubtn .sq-icon-bar::after {
		transform: translateY(0) rotate(-45deg);
	}

	.sq-sidebar ::v-deep .b-sidebar {
		margin-top: 3.375rem;
		width: 100%;
		background-color: rgba($color: #ffffff, $alpha: 0.5) !important;
		backdrop-filter: blur(30px);
	}

	.navbar-nav .sq-navbar-nav-item .nav-link {
		color: $my-color-gray5;
		font-size: 0.875rem;
		&:focus, &:hover {
			color: $my-color-gray6;
		}
	}

	#sq-the-navbar-login-button .nav-link {
		background-image: linear-gradient(35deg, $mulberry-crayola, $french-rose, $mulberry-crayola);
		border-radius: 50px;
		color: $my-color-gray7;
		padding: 0.5rem 1rem;
		&::after {
			opacity: 0;
		}
	}

	#sq-the-nav-search-results {
		position: absolute;
		margin-top: 0.2rem;
		width: 90%;
		left: 50%;
		transform: translateX(-50%);
		max-height: 17rem;
		overflow: scroll;
	}

	#sq-the-nav-notifications-list {
		width: 20rem;
		max-height: 19rem;
		overflow: scroll;
	}

</style>
