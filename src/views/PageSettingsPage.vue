<template>
	<div>
		<b-row no-gutters align-h="center">
			<b-col sm="12" lg="2">
				<div class="p-5 d-none d-lg-block"/>
				<b-navbar-nav id="sq-the-page-settings-menu">
					<b-nav-item to="/creator/settings/info" class="sq-menu-item">
						<b-icon-person-fill v-if="$route.path == '/creator/settings/info'" class="sq-menu-icon"/>
						<b-icon-person v-else class="sq-menu-icon"/>
						Creator info
					</b-nav-item>
					<b-nav-item to="/creator/settings/squads" class="sq-menu-item">
						<b-icon-lightning-fill v-if="$route.path == '/creator/settings/squads'" class="sq-menu-icon"/>
						<b-icon-lightning v-else class="sq-menu-icon"/>
						Squads
					</b-nav-item>
					<b-nav-item to="/creator/settings/goals" class="sq-menu-item">
						<b-icon-trophy-fill v-if="$route.path == '/creator/settings/goals'" class="sq-menu-icon"/>
						<b-icon-trophy v-else class="sq-menu-icon"/>
						Goals
					</b-nav-item>
					<b-nav-item to="/creator/settings/payments" class="sq-menu-item">
						<b-icon-credit-card-fill v-if="$route.path == '/creator/settings/payments'" class="sq-menu-icon"/>
						<b-icon-credit-card v-else class="sq-menu-icon"/>
						Payments
					</b-nav-item>
					<b-nav-item to="/creator/settings/stats" class="sq-menu-item">
						<b-icon-bar-chart-line-fill v-if="$route.path == '/creator/settings/stats'" class="sq-menu-icon"/>
						<b-icon-bar-chart-line v-else class="sq-menu-icon"/>
						Creator stats
					</b-nav-item>
					<b-nav-item class="sq-menu-item" link-classes="sq-link" @click="$bvModal.show('sq-the-modal-submit-review')"><b-icon-check2-circle class="sq-menu-icon"/>Submit for review</b-nav-item>
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
	}

	#sq-the-page-settings-menu .sq-menu-item .nav-link {
		font-size: 1rem;
		padding: 1rem 0 0 0;
	}
}

#sq-the-page-settings-form {
	background: $my-color-light;
}

</style>
