<template>
	<b-navbar id="the-navbar" toggleable="lg" fixed="top" class="px-md-5">
		<b-navbar-brand id="the-navbrand">
			<b-img id="the-navlogo" src="@/assets/impactme-logo.png" fluid left></b-img>
		</b-navbar-brand>

		<b-navbar-toggle id="the-navmenubtn" target="the-navmenu">
			<span class="s-icon-bar s-top-bar"></span>
			<span class="s-icon-bar s-middle-bar"></span>
			<span class="s-icon-bar s-bottom-bar"></span>
		</b-navbar-toggle>

		<b-collapse id="the-navmenu" is-nav>
			<b-navbar-nav class="ml-auto">
				<b-nav-form id="the-searchbar" class="mt-auto mb-auto" action="https://google.com" autocomplete="off">
					<b-input-group id="the-searchbar-wrapper">
						<b-input-group-prepend id="the-searchbtn" size="sm" class="my-1 my-sm-0 p-0" is-text type="submit">
							<b-icon size="sm" icon="search"></b-icon>
						</b-input-group-prepend>
						<b-form-input id="the-searchinput" size="sm" class="p-0" placeholder="search"></b-form-input>
					</b-input-group>
				</b-nav-form>

				<b-nav-item class="s-nav-item" right href="#">Create My Page</b-nav-item>
				<b-nav-item class="s-nav-item" right href="#">Explore Creators</b-nav-item>
				<b-nav-item class="s-nav-item" right href="#">Log In</b-nav-item>
				<b-nav-item class="s-nav-item" right href="#">Sign Up</b-nav-item>
			</b-navbar-nav>
		</b-collapse>
	</b-navbar>
</template>

<style lang="scss" scoped>
	#the-navbar {
		background: #fff;
	}

	#the-navbar .s-nav-item a {
		font-size: 0.9rem;
		margin: 0 0.5rem;
		font-weight: 300;
		color: $my-text-color-secondary;
		//color: #0d1b2a;
	}

	#the-navbar .s-nav-item a:hover {
		color: $my-text-color-primary;
	}

	#the-searchbtn div {
		background: $my-color-background;
		color: $my-text-color-secondary;
		box-shadow: none;
		border: none;
		border-radius: 0;
	}

	#the-navmenubtn {
		border: none;
		outline: none;
		background-image: none;
	}

	#the-navmenubtn .s-icon-bar {
		background-color: #8e9ea9;
		display: block;
		width: 22px;
		height: 2px;
		border-radius: 1px;
		transition: all 0.2s;
	}

	#the-navmenubtn .s-icon-bar+.s-icon-bar {
		margin-top: 4px;
	}

	#the-navmenubtn .s-top-bar {
		transform: rotate(45deg);
		transform-origin: 10% 10%;
	}

	#the-navmenubtn .s-middle-bar {
		opacity: 0;
	}

	#the-navmenubtn .s-bottom-bar {
		transform: rotate(-45deg);
		transform-origin: 10% 90%;
	}

	#the-navmenubtn.collapsed .s-top-bar {
		transform: rotate(0);
	}

	#the-navmenubtn.collapsed .s-middle-bar {
		opacity: 1;
	}

	#the-navmenubtn.collapsed .s-bottom-bar {
		transform: rotate(0);
	}
</style>
