<template>
	<div>
		<div class="sq-page-title">Creator info</div>
		<b-form id="sq-the-creator-info-form" @submit.prevent>
			<div class="sq-form-section">
				<b-form-group label="Creator name:" label-class="sq-form-label" label-for="sq-the-form-creator-name" label-align="left">
					<b-form-input id="sq-the-form-creator-name" class="sq-form-input" v-model="creatorInfoForm.creatorName" trim placeholder="e.g. John Doe" size="lg"></b-form-input>
				</b-form-group>
				<b-form-group label="is creating:" label-class="sq-form-label" label-for="sq-the-form-is-creating" label-align="left">
					<b-form-input id="sq-the-form-is-creating" class="sq-form-input" v-model="creatorInfoForm.creatingWhat" trim placeholder="e.g. Entertainment videos" size="lg"></b-form-input>
				</b-form-group>
			</div>
			<div class="sq-form-section">
				<b-form-group class="align-items-center" label="Display number of members:" label-class="sq-form-label" label-for="sq-the-supporters-visibility" label-align="left" label-cols="auto">
					<b-form-checkbox id="sq-the-supporters-visibility" v-model="creatorInfoForm.supportersVisibility" switch size="lg" class="text-left"/>
				</b-form-group>
				<b-form-group class="align-items-center" label="Display monthly earnings:" label-class="sq-form-label" label-for="sq-the-earnings-visibility" label-align="left" label-cols="auto">
					<b-form-checkbox id="sq-the-earnings-visibility" v-model="creatorInfoForm.earningsVisibility" switch size="lg" class="text-left"/>
				</b-form-group>
				<b-form-group class="align-items-center" label="Display one time earnings:" label-class="sq-form-label" label-for="sq-the-otp-visibility" label-align="left" label-cols="auto">
					<b-form-checkbox id="sq-the-otp-visibility" v-model="creatorInfoForm.otpVisibility" switch size="lg" class="text-left"/>
				</b-form-group>
			</div>
			<div class="sq-form-section">
				<b-form-group class="align-items-center" label="About section:" label-class="sq-form-label" label-for="sq-the-otp-visibility" label-align="left">
					<b-form-textarea id="sq-the-form-about-section" class="sq-form-textarea text-center" v-model="creatorInfoForm.about" placeholder="Tell your fans about this page" rows="3" size="lg"/>
				</b-form-group>
			</div>
		</b-form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			creatorInfoForm: {
				creatorName: '',
				creatingWhat: '',
				supportersVisibility: true,
				earningsVisibility: false,
				otpVisibility: true,
				about: '',
			},
		};
	},
};
</script>

<style lang="scss" scoped>

</style>
