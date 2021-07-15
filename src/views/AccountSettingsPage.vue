<template>
	<div>
		<div class="sq-page-title">Account settings</div>
		<b-form class="overflow-auto" @submit.prevent="saveUser">
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
				<FormInputGroup label="Name" inputId="sq-the-form-name" inputClass="sq-form-input" v-model="userInfoForm.name" :validationModel="$v.userInfoForm.name" size="lg" trim
					:invalidFeedbacks="{
						required: 'Please enter your full name',
						alphaSplit: 'Are you sure you entered your name correctly?',
						maxLength: 'Exceeded max character limit',
					}"
				/>
				<b-form-group label="Email" label-class="sq-form-label" label-for="sq-the-form-email" label-align="left">
					<b-form-input id="sq-the-form-email" class="sq-form-input" v-model="userInfoForm.email" size="lg" readonly/>
				</b-form-group>
			</b-card>
			<div class="sq-form-card">
				<b-form-group label="Danger zone" label-class="sq-form-label sq-color-danger" label-align="left">
					<div class="sq-card-flat sq-card-flat-lg p-4">
						<b-button class="sq-btn sq-shadow w-75 mb-2">Change password</b-button>
						<b-button class="sq-btn sq-shadow w-75 mb-2">Deactivate account</b-button>
						<b-button class="sq-btn sq-shadow w-75 sq-color-danger">Delete account</b-button>
					</div>
				</b-form-group>
			</div>
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
	alpha,
} from 'vuelidate/lib/validators';
import FormInputGroup from '@/components/FormInputGroup.vue';
import ButtonSubmit from '@/components/ButtonSubmit.vue';

export default {
	data() {
		return {
			userInfoForm: {},
			isSaving: false,
			isSaved: true,
		};
	},
	methods: {
		saveUser() {

		},
	},
	validations() {
		return {
			userInfoForm: {
				name: {
					required,
					maxLength: maxLength(50),
					alphaSplit: (value) => (value ? value.split(' ').every((word) => (word ? alpha(word) : false)) : true),
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

</style>
