<template>
	<div>
		<b-row no-gutters align-h="center">
			<b-col sm="12" lg="2" :class="routePath !== 'settings' ? 'd-none d-lg-block' : ''">
				<div class="p-5 d-none d-lg-block"/>
				<b-navbar-nav id="sq-the-page-settings-menu">
					<b-nav-item to="/creator/settings/info" :class="`sq-menu-item ${routePath == 'info' ? 'sq-menu-item-active' : ''}`">
						<b-icon-person-fill v-if="routePath == 'info'" class="sq-menu-icon"/>
						<b-icon-person v-else class="sq-menu-icon"/>
						Creator info
					</b-nav-item>
					<b-nav-item to="/creator/settings/squads" :class="`sq-menu-item ${routePath == 'squads' ? 'sq-menu-item-active' : ''}`">
						<b-icon-lightning-fill v-if="routePath == 'squads'" class="sq-menu-icon"/>
						<b-icon-lightning v-else class="sq-menu-icon"/>
						Squads
					</b-nav-item>
					<b-nav-item to="/creator/settings/goals" :class="`sq-menu-item ${routePath == 'goals' ? 'sq-menu-item-active' : ''}`">
						<b-icon-trophy-fill v-if="routePath == 'goals'" class="sq-menu-icon"/>
						<b-icon-trophy v-else class="sq-menu-icon"/>
						Goals
					</b-nav-item>
					<b-nav-item to="/creator/settings/payments" :class="`sq-menu-item ${routePath == 'payments' ? 'sq-menu-item-active' : ''}`">
						<b-icon-credit-card-fill v-if="routePath == 'payments'" class="sq-menu-icon"/>
						<b-icon-credit-card v-else class="sq-menu-icon"/>
						Payments
					</b-nav-item>
					<b-nav-item to="/creator/settings/stats" :class="`sq-menu-item ${routePath == 'stats' ? 'sq-menu-item-active' : ''}`">
						<b-icon-bar-chart-line-fill v-if="routePath == 'stats'" class="sq-menu-icon"/>
						<b-icon-bar-chart-line v-else class="sq-menu-icon"/>
						Creator stats
					</b-nav-item>
					<b-nav-item class="sq-menu-item" link-classes="sq-link" @click="$bvModal.show('sq-the-modal-submit-review')"><b-icon-check2-circle class="sq-menu-icon"/>Submit for review</b-nav-item>
					<div class="d-none d-lg-block sq-menu-item-selector">
						<div class="sq-menu-item-selector-bar"/>
					</div>
				</b-navbar-nav>
			</b-col>
			<b-col sm="0" lg="6">
				<router-view id="sq-the-page-settings-form"></router-view>
			</b-col>
		</b-row>
		<CustomModal modalId="sq-the-modal-submit-review" modalTitle="Submit for review">
			<div class="sq-text mb-3">
				The review process takes less than two days. You can continue editing your page in the meanwhile.
				Once reviewed, your page will be live on Squadrad.
			</div>
			<ButtonSubmit modal buttonText="Submit" @click="submitForReview"/>
		</CustomModal>
	</div>
</template>

<script>
import CustomModal from '../components/CustomModal.vue';
import ButtonSubmit from '../components/ButtonSubmit.vue';
import creatorService from '../services/creator.service';

export default {
	methods: {
		submitForReview() {
			creatorService.submitForReview().then((res) => {
				if (!res || res.status !== 200) throw new Error('Could not submit for review');
				this.$router.push('/creator');
			}).catch((err) => {
				console.log(err);
			});
		},
	},
	computed: {
		routePath() {
			const { path } = this.$route;
			if (['/creator/settings', '/creator/settings/'].includes(path)) return 'settings';
			if (['/creator/settings/info', '/creator/settings/info/'].includes(path)) return 'info';
			if (['/creator/settings/squads', '/creator/settings/squads/'].includes(path)) return 'squads';
			if (['/creator/settings/goals', '/creator/settings/goals/'].includes(path)) return 'goals';
			if (['/creator/settings/payments', '/creator/settings/payments/'].includes(path)) return 'payments';
			if (['/creator/settings/stats', '/creator/settings/stats/'].includes(path)) return 'stats';
			return null;
		},
	},
	components: {
		CustomModal,
		ButtonSubmit,
	},
};
</script>

<style lang="scss" scoped>

#sq-the-page-settings-menu {
	position: absolute;
	width: 100%;
}

@media (min-width: $lg) {
	#sq-the-page-settings-menu .sq-menu-item .nav-link.router-link-active {
		color: $my-color-dark;
		font-weight: 400;
		transform: translateX(5%);
	}

	#sq-the-page-settings-menu .sq-menu-item .nav-link {
		font-size: 1rem;
		padding: 0.5rem 0 0.5rem 0;
		transform: translateX(0);
		transition: transform 150ms ease-out;
	}

	.sq-menu-item-selector {
		padding-top: 0.3rem;
		padding-bottom: 0.3rem;
		position: absolute;
		left: -0.5rem;
		transform: translateY(50%);
		transition: transform 150ms ease-out;
	}

	.sq-menu-item-selector-bar {
		width: 2px;
		height: 1.9rem;
		background-color: $my-color-gray1;
	}

	.sq-menu-item:nth-child(1).sq-menu-item-active ~ .sq-menu-item-selector {
		transform: translateY(0);
	}

	.sq-menu-item:nth-child(2).sq-menu-item-active ~ .sq-menu-item-selector {
		transform: translateY(100%);
	}

	.sq-menu-item:nth-child(3).sq-menu-item-active ~ .sq-menu-item-selector {
		transform: translateY(200%);
	}

	.sq-menu-item:nth-child(4).sq-menu-item-active ~ .sq-menu-item-selector {
		transform: translateY(300%);
	}

	.sq-menu-item:nth-child(5).sq-menu-item-active ~ .sq-menu-item-selector {
		transform: translateY(400%);
	}
}

#sq-the-page-settings-form {
	background: $my-color-light;
}

</style>
