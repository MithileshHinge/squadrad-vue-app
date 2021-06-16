<template>
	<div>
		<div class="sq-page-title">Creator info</div>
		<b-form id="sq-the-creator-info-form" @submit.prevent>
			<div class="sq-form-section">
				<b-form-group>
					<b-form-file style="display: none;"></b-form-file>
					<b-avatar size="8.5rem">
						<b-img src="@/assets/tushar.png"></b-img>
						<b-button class="sq-btn-change-profile-pic">
							<b-icon-pencil-fill/>
						</b-button>
					</b-avatar>
				</b-form-group>
				<!--b-form-group>
					<b-form-input id="sq-the-form-creator-name-1" placeholder="John Doe" size="lg"/>
					<b-row align-h="center">
						<b-col cols="auto" class="pr-0" align-self="center">
							<span id="sq-the-form-is-creating-text">is creating</span>
						</b-col>
						<b-col cols="auto" class="pl-1" align-self="center">
							<span id="sq-the-form-is-creating-hide"/><b-form-input id="sq-the-form-is-creating-1"  v-model="creatorInfoForm.creatingWhat" trim placeholder="Entertainment videos" size="lg" @input="adjustWidth"/>
						</b-col>
					</b-row>
				</b-form-group-->
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
			<div class="sq-form-section pb-2">
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
	methods: {
		/*
		adjustWidth() {
			const hide = document.getElementById('sq-the-form-is-creating-hide');
			const input = document.getElementById('sq-the-form-is-creating-1');
			hide.textContent = this.creatorInfoForm.creatingWhat;
			input.style.width = `${hide.offsetWidth}px`;
		},
		*/
	},
};
</script>

<style lang="scss" scoped>
/*
#sq-the-form-creator-name-1 {
	font-size: 1.375rem;
	font-weight: 700;
	letter-spacing: -0.01em;
	color: $my-color-dark;
	text-align: center;
}

#sq-the-form-is-creating-1,
#sq-the-form-is-creating-text,
#sq-the-form-is-creating-hide {
	font-size: 1rem;
	font-weight: 500;
	color: $my-color-gray2;
	padding: 0;
	border: none;
	min-width: 2rem;
	height: 100%;
}

#sq-the-form-is-creating-1:focus,
#sq-the-form-is-creating-text:focus,
#sq-the-form-is-creating-hide:focus {
	font-size: 1rem;
	font-weight: 500;
	color: $my-color-gray2;
	padding: 0;
	border: none;
}

#sq-the-form-is-creating-1 {
	border-bottom: 1px solid $my-color-gray2;
}

#sq-the-form-is-creating-1:focus {
	box-shadow: none;
	border-bottom: 1px solid $french-rose;
}

#sq-the-form-is-creating-hide {
	position: absolute;
	top: -100vh;
	height: 0;
	overflow: hidden;
	white-space: pre;
}

#sq-the-form-is-creating-hide:focus-visible {
	outline: none;
}
*/

</style>
