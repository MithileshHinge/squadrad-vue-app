<template>
	<b-row no-gutters align-h="center" align-v="center">
		<b-col cols="12">
			<b-row>
				<b-col>
					<b-img src="@/assets/buno3.png" fluid center></b-img>
				</b-col>
			</b-row>
			<b-row>
				<b-col class="sq-text text-center pb-5">
					Squadrad is under maintenance<br>We thank you for your patience
				</b-col>
			</b-row>
		</b-col>
		<router-view></router-view>
	</b-row>
</template>

<script>
import beaconService from '../services/beacon.service';

export default {
	props: {
		isAuthenticated: Boolean,
	},
	methods: {
		redirectIfAuthenticated() {
			if (this.isAuthenticated) {
				this.$router.push('/feed');
			}
		},
	},
	watch: {
		isAuthenticated: 'redirectIfAuthenticated',
	},
	mounted() {
		if (this.$route.query.ref) {
			beaconService.landingTrigger(this.$route.query.ref);
		}
	},
};
</script>
