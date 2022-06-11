<template>
	<div class="col-lg-6 m-auto">
		<div class="sq-page-title">Start your membership page</div>
		<b-form @submit.prevent="becomeCreator">
			<b-card class="sq-form-card">
				<div class="w-100 mt-3"/>
				<FormInputGroup label="Name of your page" inputId="sq-the-form-creator-name" v-model="creatorInfoForm.pageName" :validationModel="$v.creatorInfoForm.pageName" placeholder="e.g. John Doe" size="lg" trim
					:invalidFeedbacks="{
						required: 'Please tell us the name of your page',
						maxLength: 'Exceeded max character limit',
					}"
				/>
				<FormInputGroup label="What are you creating?" inputId="sq-the-form-is-creating" v-model="creatorInfoForm.creatingWhat" :validationModel="$v.creatorInfoForm.creatingWhat" placeholder="e.g. Entertainment videos, comics, music, etc" size="lg" trim
					:invalidFeedbacks="{
						required: 'Please tell us what you create',
						maxLength: 'Exceeded max character limit',
					}"
				/>
				<b-form-group class="text-left" label="Which sounds correct?" label-class="sq-form-label" label-align="left">
					<b-form-radio name="plural" v-model="creatorInfoForm.plural" :value="false" class="sq-text">
						{{creatorInfoForm.pageName}} is creating {{creatorInfoForm.creatingWhat}}
					</b-form-radio>
					<b-form-radio name="plural" v-model="creatorInfoForm.plural" :value="true" class="sq-text">
						{{creatorInfoForm.pageName}} are creating {{creatorInfoForm.creatingWhat}}
					</b-form-radio>
				</b-form-group>
			</b-card>
			<ButtonSubmit :isProcessing="formSubmitted" isRouted/>
		</b-form>
	</div>
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators';
import creatorService from '@/services/creator.service';
import FormInputGroup from '@/components/FormInputGroup.vue';
import ButtonSubmit from '@/components/ButtonSubmit.vue';

export default {
	data() {
		return {
			creatorInfoForm: {
				pageName: null,
				creatingWhat: null,
				plural: false,
			},
			formSubmitted: false,
		};
	},
	methods: {
		becomeCreator() {
			this.$v.creatorInfoForm.$touch();
			if (this.$v.creatorInfoForm.$anyError) {
				return;
			}
			this.formSubmitted = true;
			creatorService.becomeCreator(this.creatorInfoForm.pageName, this.creatorInfoForm.plural, this.creatorInfoForm.creatingWhat)
				.then((res) => {
					if (res.status === 200) {
						this.$router.push('/creator');
					}
					this.formSubmitted = false;
				})
				.catch((err) => {
					this.formSubmitted = false;
					const res = err.response;
					this.$bvToast.toast(res.data.msg, {
						noCloseButton: true,
						variant: 'danger',
						toaster: 'b-toaster-bottom-center',
					});
				});
		},
	},
	validations() {
		return {
			creatorInfoForm: {
				pageName: {
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
