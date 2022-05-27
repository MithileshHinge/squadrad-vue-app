<template>
	<div>
		<b-navbar-nav v-if="$route.path == '/creator/settings'" id="sq-the-page-settings-menu">
			<b-nav-item to="/creator/settings/info" class="sq-menu-item"><b-icon-person class="sq-menu-icon"/>Creator info</b-nav-item>
			<b-nav-item to="/creator/settings/squads" class="sq-menu-item"><b-icon-lightning class="sq-menu-icon"/>Squads</b-nav-item>
			<b-nav-item to="/creator/settings/goals" class="sq-menu-item"><b-icon-trophy class="sq-menu-icon"/>Goals</b-nav-item>
			<b-nav-item to="/creator/settings/payments" class="sq-menu-item"><b-icon-credit-card class="sq-menu-icon"/>Payments</b-nav-item>
			<b-nav-item to="/creator/settings/stats" class="sq-menu-item"><b-icon-bar-chart-line class="sq-menu-icon"/>Creator stats</b-nav-item>
			<b-nav-item class="sq-menu-item" link-classes="sq-link" @click="$bvModal.show('sq-the-modal-submit-review')"><b-icon-check2-circle class="sq-menu-icon"/>Submit for review</b-nav-item>
		</b-navbar-nav>
		<router-view id="sq-the-page-settings-form"></router-view>
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

</style>
