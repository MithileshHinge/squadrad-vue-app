<template>
	<div>
		<b-navbar-nav v-if="$route.path == '/creator/settings'" id="sq-the-page-settings-menu">
			<b-nav-item to="/creator/settings/info" class="sq-menu-item"><b-icon-person class="sq-menu-icon"/>Creator info</b-nav-item>
			<b-nav-item to="/creator/settings/squads" class="sq-menu-item"><b-icon-lightning class="sq-menu-icon"/>Squads</b-nav-item>
			<b-nav-item to="/creator/settings/goals" class="sq-menu-item"><b-icon-trophy class="sq-menu-icon"/>Goals</b-nav-item>
			<b-nav-item class="sq-menu-item"><b-icon-credit-card class="sq-menu-icon"/>Payments</b-nav-item>
			<b-nav-item class="sq-menu-item"><b-icon-bar-chart-line class="sq-menu-icon"/>Creator stats</b-nav-item>
			<b-nav-item class="sq-menu-item" link-classes="sq-link"><b-icon-check2-circle class="sq-menu-icon"/>Submit for review</b-nav-item>
		</b-navbar-nav>
		<router-view id="sq-the-page-settings-form"></router-view>
	</div>
</template>

<style lang="scss" scoped>

#sq-the-page-settings-menu {
	position: absolute;
	width: 100%;
}

</style>
