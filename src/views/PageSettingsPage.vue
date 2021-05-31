<template>
	<div class="sq-page-settings-page">
		<b-navbar-nav id="sq-the-page-settings-menu">
			<b-nav-item to="/creator/settings/info" class="sq-menu-item"><b-icon-person class="sq-menu-icon"/>Creator info</b-nav-item>
			<b-nav-item class="sq-menu-item"><b-icon-lightning class="sq-menu-icon"/>Squads</b-nav-item>
			<b-nav-item class="sq-menu-item"><b-icon-trophy class="sq-menu-icon"/>Goals</b-nav-item>
			<b-nav-item class="sq-menu-item"><b-icon-credit-card class="sq-menu-icon"/>Payments</b-nav-item>
			<b-nav-item class="sq-menu-item"><b-icon-bar-chart-line class="sq-menu-icon"/>Creator stats</b-nav-item>
			<b-nav-item class="sq-menu-item" link-classes="sq-link"><b-icon-check2-circle class="sq-menu-icon"/>Submit for review</b-nav-item>
		</b-navbar-nav>
		<div v-if="$route.path != '/creator/settings'" id="sq-the-page-settings-menu-hide"/>
		<router-view id="sq-the-page-settings-form"></router-view>
	</div>
</template>

<style lang="scss" scoped>

#sq-the-page-settings-form {
	z-index: 2;
}

#sq-the-page-settings-menu-hide {
	position: absolute;
	width: 100vw;
	height: calc(100vh - 3.375rem);
	background-color: $my-color-light;
	z-index: -1;
}

#sq-the-page-settings-menu {
	position: absolute;
	width: 100%;
	z-index: -10;
}

</style>
