<template>
	<b-navbar id="sq-the-navbar" class="pl-lg-3" toggleable="lg" fixed="top">
		<b-navbar-brand id="sq-the-navbrand">
			<b-img id="sq-the-navlogo" src="@/assets/squadrad-fav.png" fluid left></b-img>
		</b-navbar-brand>
		<b-navbar-toggle id="sq-the-navmenubtn" target="sq-the-navmenu">
			<!--span class="sq-icon-bar sq-top-bar"></span>
			<span class="sq-icon-bar sq-middle-bar"></span>
			<span class="sq-icon-bar sq-bottom-bar"></span-->
			<b-avatar v-if="isAuthenticated" id="sq-the-menubtn-avatar" src="@/assets/tushar.png" size="2rem"></b-avatar>
			<span v-else class="sq-icon-bar"></span>
		</b-navbar-toggle>
		<b-navbar-nav v-if="isAuthenticated" class="d-none d-lg-flex">
		</b-navbar-nav>
		<b-navbar-nav v-else class="d-none d-lg-flex w-100 align-items-center">
			<b-nav-item class="sq-navbar-nav-item">Explore creators</b-nav-item>
			<b-nav-item class="sq-navbar-nav-item">Pricing</b-nav-item>
			<b-nav-item class="sq-navbar-nav-item mr-auto">Help and FAQ</b-nav-item>
			<b-nav-item id="sq-the-navbar-login-button" class="sq-navbar-nav-item mr-2" link-classes="sq-btn-cta sq-btn" to="/login">Log in</b-nav-item>
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
				<b-nav-item v-if="isCreator" to="/creator/settings" class="sq-menu-item">Page settings</b-nav-item>
				<b-nav-item class="sq-menu-item" to="/feed">Post from my Creators</b-nav-item>
				<b-nav-item class="sq-menu-item">My Squads</b-nav-item>
				<b-nav-item v-if="!isCreator" class="sq-menu-item">Start a membership page</b-nav-item>
				<b-nav-item class="sq-menu-item">Account settings</b-nav-item>
				<b-nav-item class="sq-menu-item">Billing</b-nav-item>
				<b-nav-item class="sq-menu-item">Help and FAQ</b-nav-item>
				<b-nav-item class="sq-menu-item">Contact us</b-nav-item>
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
				<b-nav-item class="sq-menu-item">Explore creators</b-nav-item>
				<b-nav-item class="sq-menu-item">Pricing</b-nav-item>
				<b-nav-item class="sq-menu-item">Help and FAQ</b-nav-item>
				<b-nav-item class="sq-menu-item">Contact us</b-nav-item>
			</b-navbar-nav>
		</b-sidebar>
	</b-navbar>
</template>

<script>
import userService from '@/services/user.service';

export default {
	props: {
		isAuthenticated: Boolean,
		isCreator: Boolean,
	},
	methods: {
		logout() {
			userService.logout().then((res) => {
				if (res && res.status === 200) {
					this.$store.commit('updateUser', {});
					this.$router.push('/');
				}
			});
		},
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

</style>
