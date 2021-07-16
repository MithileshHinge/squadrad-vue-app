<template>
	<b-modal id="sq-the-login-modal" centered modal-class="sq-shadow" :visible="true" @hide="$router.push('/')">
		<template #modal-header-close>
			<span class="sq-close-icon-bar"></span>
		</template>
		<template #default>
			<h4 v-if="!isModalSignUp" class="sq-login-title">Log in</h4>
			<h4 v-if="isModalSignUp" class="sq-login-title">Sign up</h4>
			<div class="sq-login-body">
				<b-button class="sq-btn-social-login sq-btn sq-shadow" href="http://localhost:3000/auth/google">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" viewBox="0 0 48 48" class="abcRioButtonSvg sq-social-login-icon"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>
					Continue with Google
				</b-button>
				<b-button class="sq-btn-social-login sq-btn sq-shadow">
					<svg class="sq-social-login-icon" width="1.25rem" height="1.25rem" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="9" r="9" fill="#F25656"/><path d="M14.6236 9.0092C14.6236 9.0092 14.6236 10.8344 14.3921 11.7146C14.2623 12.1963 13.8824 12.5762 13.4007 12.7058C12.5206 12.9375 8.99998 12.9375 8.99998 12.9375C8.99998 12.9375 5.48862 12.9375 4.59927 12.6966C4.11752 12.567 3.73767 12.187 3.60789 11.7052C3.37622 10.8344 3.37622 9 3.37622 9C3.37622 9 3.37622 7.1749 3.60789 6.29475C3.73753 5.813 4.12672 5.42381 4.59927 5.29417C5.47942 5.0625 8.99998 5.0625 8.99998 5.0625C8.99998 5.0625 12.5206 5.0625 13.4007 5.30338C13.8824 5.43301 14.2623 5.813 14.3921 6.29475C14.6329 7.1749 14.6236 9.0092 14.6236 9.0092Z" fill="white"/><path d="M7.87903 10.6861L10.8066 9L7.87903 7.31387V10.6861Z" fill="#F25656"/></svg>
					Continue with Youtube
				</b-button>
				<div class="sq-or-container">
					<span class="sq-or-hidebox"></span>
					<span class="sq-or-text">or</span>
					<span class="sq-or-separator"></span>
				</div>

				<b-form @submit.prevent="onSubmit">
					<FormInputGroup v-if="isModalSignUp" name="fullname" v-model="form.fullname" :validationModel="$v.form.fullname" inputClass="sq-modal-form-input" placeholder="Full name" trim
						:invalidFeedbacks="{
							required: 'Please enter your full name',
							alphaSplit: 'Are you sure you entered your name correctly?',
							maxLength: 'Exceeded max character limit',
						}"
					/>
					<FormInputGroup name="email" v-model="form.email" :validationModel="$v.form.email" inputClass="sq-modal-form-input" placeholder="Email" type="email" autocomplete="off" trim
						:invalidFeedbacks="{
							required: 'Please enter your email address',
							email: 'Please enter a valid email address',
							maxLength: 'Exceeded max character limit',
						}"
					/>
					<FormInputGroup v-if="!isModalSignUp" name="loginPassword" v-model="form.loginPassword" :validationModel="$v.form.loginPassword" inputClass="sq-modal-form-input" placeholder="Password" type="password"
						:invalidFeedbacks="{
							required: 'Please enter your password',
						}"
					/>
					<FormInputGroup v-if="isModalSignUp" name="signupPassword" v-model="form.signupPassword" :validationModel="$v.form.signupPassword" inputClass="sq-modal-form-input" placeholder="Password" type="password"
						:invalidFeedbacks="{
							required: 'Please enter a new password',
							minLength: `Password must have at least ${$v.form.signupPassword.$params.minLength.min} characters`,
						}"
					/>
					<FormInputGroup v-if="isModalSignUp" name="confirmPassword" v-model="form.confirmPassword" :validationModel="$v.form.confirmPassword" inputClass="sq-modal-form-input" placeholder="Confirm password" type="password"
						:invalidFeedbacks="{
							default: 'Please re-enter the same password',
						}"
					/>
					<b-button id="sq-the-login-submit-btn" class="sq-btn-social-login sq-btn sq-shadow" type="submit" :disabled="formSubmitted">
						<b-overlay :show="formSubmitted" rounded="pill" opacity="0.6" spinner-small spinner-variant="primary" class="d-inline-block" no-wrap/>
						{{ submitText }}
					</b-button>
				</b-form>
			</div>
			<div v-if="!isModalSignUp" class="sq-text text-center">New to Squadrad? <b-link class="sq-link" to="/signup">Sign up</b-link></div>
			<div v-if="isModalSignUp" class="sq-text text-center">Already on Squadrad? <b-link class="sq-link" to="/login">Log in</b-link></div>
		</template>
	</b-modal>
</template>

<script>
import userService from '@/services/user.service';
import {
	required,
	requiredIf,
	alpha,
	email,
	minLength,
	maxLength,
	sameAs,
} from 'vuelidate/lib/validators';
import FormInputGroup from '@/components/FormInputGroup.vue';

export default {
	props: {
		isModalSignUp: Boolean,
	},
	computed: {
		submitText() {
			if (this.isModalSignUp) {
				return 'Sign up with email';
			}
			return 'Log in with email';
		},
	},
	data() {
		return {
			form: {
				fullname: null,
				email: null,
				loginPassword: null,
				signupPassword: null,
				confirmPassword: null,
			},
			formSubmitted: false,
		};
	},
	validations() {
		return {
			form: {
				fullname: {
					required: requiredIf(() => this.isModalSignUp),
					maxLength: maxLength(50),
					alphaSplit: (value) => (value ? value.split(' ').every((word) => (word ? alpha(word) : false)) : true),
				},
				email: {
					required,
					maxLength: maxLength(320),
					email,
				},
				loginPassword: {
					required: requiredIf(() => !this.isModalSignUp),
				},
				signupPassword: {
					required: requiredIf(() => this.isModalSignUp),
					minLength: minLength(8),
				},
				confirmPassword: {
					required: requiredIf(() => this.isModalSignUp),
					sameAsPassword: sameAs('signupPassword'),
				},
			},
		};
	},
	methods: {
		loginWithGoogle() {
			this.$router.push('/api/auth/google');
		},
		onSubmit() {
			console.log('onSubmit');
			this.$v.form.$touch();
			if (this.$v.form.$anyError) {
				return;
			}
			if (this.isModalSignUp) {
				console.log('sign up submitted');
				userService.registerUser(this.form.fullname, this.form.email, this.form.signupPassword, this.form.confirmPassword)
					.then((res) => {
						this.formSubmitted = false;
						if (res.status === 200) {
							this.$bvModal.hide('sq-the-login-modal');
							this.$router.push('/auth/verify-email/sent');
						}
					})
					.catch((err) => {
						const res = err.response;
						this.formSubmitted = false;
						this.$bvToast.toast(res.data.msg, {
							noCloseButton: true,
							variant: 'danger',
							toaster: 'b-toaster-bottom-center',
						});
					});
				this.formSubmitted = true;
			} else {
				console.log('log in submitted');
				userService.loginWithEmail(this.form.email, this.form.loginPassword)
					.then((res) => {
						this.formSubmitted = false;
						console.log(res);
						if (res.status === 200) {
							this.$store.commit('updateUser', res.data.user);
							this.$bvModal.hide('sq-the-login-modal');
							this.$router.push('/feed');
						}
					})
					.catch((err) => {
						const res = err.response;
						this.formSubmitted = false;
						this.$bvToast.toast(res.data.msg, {
							noCloseButton: true,
							variant: 'danger',
							toaster: 'b-toaster-bottom-center',
						});
					});
				this.formSubmitted = true;
			}
		},
	},
	components: {
		FormInputGroup,
	},
};
</script>

<style lang="scss">
#sq-the-login-modal .modal-dialog {
	max-width: 18.75rem;
	margin: auto;
}

#sq-the-login-modal .modal-body {
	padding: 0.25rem 2rem 0.5rem 2rem;
	text-align: center;
}

#sq-the-login-modal .sq-login-title {
	font-weight: 600;
	color: $my-color-dark;
}

#sq-the-login-modal .sq-login-body {
	padding: 1rem 0 2rem 0;
	color: $my-color-dark;
	position: relative;
}

#sq-the-login-modal .sq-btn-social-login {
	width: 100%;
	margin-bottom: 0.5rem;
	position: relative;
}

#sq-the-login-modal .sq-social-login-icon {
	position: absolute;
	top: 50%;
	left: 0;
	margin: 0 0 0 0.5rem;
	transform: translateY(-50%);
}

#sq-the-login-modal .sq-or-container {
	position: relative;
	padding-top: 1.5rem;
	padding-bottom: 1rem;
}

#sq-the-login-modal .sq-or-separator {
	width: 100%;
	height: 1px;
	background-color: rgba($color: $my-color-dark, $alpha: 0.15);
	display: block;
}

#sq-the-login-modal .sq-or-text {
	position: absolute;
	top: 0.75rem;
	left: calc(50% - 1.166rem);
	color: $my-color-gray4;
	font-size: 0.875rem;
	padding-left: 0.75rem;
	padding-right: 0.75rem;
}

#sq-the-login-modal .sq-or-hidebox {
	position: absolute;
	height: 2px;
	top: calc(50%+0.75rem);
	left: calc(50% - 1.166rem);
	padding-left: 1.166rem;
	padding-right: 1.166rem;
	background-color: $my-color-gray8;
}

#sq-the-login-modal .sq-text {
	font-size: 0.75rem;
	color: $my-color-gray1;
}

#sq-the-login-modal .sq-form-group {
	margin-bottom: 0.5rem;
}

#sq-the-login-submit-btn {
	margin-top: 0.125rem;
}
</style>
