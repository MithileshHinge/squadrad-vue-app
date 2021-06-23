<template>
	<div>
		<div class="sq-page-title">Creator info</div>
		<b-form id="sq-the-creator-info-form" class="overflow-auto" @submit.prevent="saveCreator">
			<b-card class="sq-form-card">
				<b-form-group>
					<b-form-file style="display: none;"></b-form-file>
					<b-avatar size="8.5rem">
						<b-img src="@/assets/tushar.png" class="w-100 h-100"></b-img>
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
				<FormInputGroup label="Name of your page" inputId="sq-the-form-creator-name" inputClass="sq-form-input" v-model="creatorInfoForm.creatorName" :validationModel="$v.creatorInfoForm.creatorName" placeholder="e.g. John Doe" size="lg" trim
					:invalidFeedbacks="{
						required: 'Please tell us the name of your page',
						maxLength: 'Exceeded max character limit',
					}"
				/>
				<FormInputGroup label="What are you creating?" inputId="sq-the-form-is-creating" inputClass="sq-form-input" v-model="creatorInfoForm.creatingWhat" :validationModel="$v.creatorInfoForm.creatingWhat" placeholder="e.g. Entertainment videos, comics, music, etc" size="lg" trim
					:invalidFeedbacks="{
						required: 'Please tell us what you create',
						maxLength: 'Exceeded max character limit',
					}"
				/>
				<b-form-group class="text-left" label="Which sounds correct?" label-class="sq-form-label" label-align="left">
					<b-form-radio name="plural" v-model="creatorInfoForm.plural" :value="false" class="sq-text">
						{{creatorInfoForm.creatorName}} is creating {{creatorInfoForm.creatingWhat}}
					</b-form-radio>
					<b-form-radio name="plural" v-model="creatorInfoForm.plural" :value="true" class="sq-text">
						{{creatorInfoForm.creatorName}} are creating {{creatorInfoForm.creatingWhat}}
					</b-form-radio>
				</b-form-group>
			</b-card>
			<b-card class="sq-form-card">
				<b-form-group class="align-items-center" label="Display number of members:" label-class="sq-form-label" label-for="sq-the-supporters-visibility" label-align="left" label-cols="auto">
					<b-form-checkbox id="sq-the-supporters-visibility" v-model="creatorInfoForm.supportersVisibility" switch size="lg" class="text-right"/>
				</b-form-group>
				<b-form-group class="align-items-center" label="Display monthly earnings:" label-class="sq-form-label" label-for="sq-the-earnings-visibility" label-align="left" label-cols="auto">
					<b-form-checkbox id="sq-the-earnings-visibility" v-model="creatorInfoForm.earningsVisibility" switch size="lg" class="text-right"/>
				</b-form-group>
				<b-form-group class="align-items-center mb-0" label="Display one time earnings:" label-class="sq-form-label" label-for="sq-the-otp-visibility" label-align="left" label-cols="auto">
					<b-form-checkbox id="sq-the-otp-visibility" v-model="creatorInfoForm.otpVisibility" switch size="lg" class="text-right"/>
				</b-form-group>
			</b-card>
			<b-card class="sq-form-card">
				<b-form-group class="align-items-center" label="About section:" label-class="sq-form-label" label-for="sq-the-form-about-section" label-align="left">
					<b-form-textarea id="sq-the-form-about-section" class="sq-form-textarea text-center" v-model="creatorInfoForm.about" placeholder="Tell your fans about this page" rows="3" size="lg"/>
				</b-form-group>
			</b-card>
			<ButtonSubmit :isSaving="isSaving" :isSaved="isSaved"/>
			<!-- div to clear fixed submit button from occluding last card-->
			<div style="height: 3.5rem;"/>
		</b-form>
	</div>
</template>

<script>
import {
	required,
	maxLength,
} from 'vuelidate/lib/validators';
import FormInputGroup from '@/components/FormInputGroup.vue';
import ButtonSubmit from '@/components/ButtonSubmit.vue';

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
			isSaved: false,
			isSaving: false,
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
		saveCreator() {
			if (this.isSaved) return;
			this.isSaving = true;
			setTimeout(() => {
				this.isSaving = false;
				this.isSaved = true;
			}, 1000);
		},
	},
	validations() {
		return {
			creatorInfoForm: {
				creatorName: {
					required,
					maxLength: maxLength(50),
				},
				creatingWhat: {
					required,
					maxLength: maxLength(50),
				},
			},
		};
	},
	components: {
		FormInputGroup,
		ButtonSubmit,
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
