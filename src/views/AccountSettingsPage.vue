<template>
	<div>
		<div class="sq-page-title">Account settings</div>
		<b-row no-gutters align-h="center">
			<b-col sm="12" lg="6">
				<b-form class="overflow-auto" @submit.prevent="saveUser">
					<b-card class="sq-form-card">
						<b-form-group>
							<b-form-file ref="sqRefUserProfilePicFileInput" id="sq-the-profile-pic-file-input" accept="image/bmp, image/jpeg, image/png, image/tiff" style="display: none;" @change="selectProfilePic"/>
							<b-avatar size="8.5rem">
								<b-img :src="getProfilePicSrc($store.state.user.profilePicSrc, false)" class="w-100 h-100"></b-img>
								<b-button class="sq-btn-change-profile-pic" @click="onEditProfilePicBtnClick">
									<b-icon-pencil-fill/>
								</b-button>
							</b-avatar>
						</b-form-group>
						<FormInputGroup label="Name" inputId="sq-the-form-fullName" v-model="userInfoForm.fullName" :validationModel="$v.userInfoForm.fullName" size="lg" trim autocomplete="off"
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
								<b-button class="sq-btn sq-shadow w-75 mb-2" v-b-modal.sq-the-modal-change-password>Change password</b-button>
								<b-button class="sq-btn sq-shadow w-75 mb-2">Deactivate account</b-button>
								<b-button class="sq-btn sq-shadow w-75 sq-color-danger" v-b-modal.sq-the-modal-delete-user>Delete account</b-button>
							</div>
						</b-form-group>
					</div>
					<ButtonSubmit :isProcessing="isSaving" :isProcessed="isSaved"/>
					<!-- div to clear fixed submit button from occluding last card-->
					<div style="height: 3.5rem;"/>
				</b-form>
			</b-col>
		</b-row>
		<CustomModal modalId="sq-the-modal-change-password" modalTitle="Change password">
			<b-form @submit.prevent="changePassword">
				<FormInputGroup label="Old password" modal v-model="changePasswordForm.oldPassword" :validationModel="$v.changePasswordForm.oldPassword" type="password"
					:invalidFeedbacks="{
						required: 'Please enter your old password',
					}"
				/>
				<FormInputGroup label="New password" modal v-model="changePasswordForm.newPassword" :validationModel="$v.changePasswordForm.newPassword" type="password"
					:invalidFeedbacks="{
						required: 'Please enter a new password',
						minLength: `Password must have at least ${$v.changePasswordForm.newPassword.$params.minLength.min} characters`,
					}"
				/>
				<ButtonSubmit :isProcessing="isPasswordChanging" :isProcessed="isPasswordChanged" modal buttonText="Change password" buttonTextDone="Password changed"/>
			</b-form>
		</CustomModal>
		<CustomModal modalId="sq-the-modal-delete-user" modalTitle="Delete account">
			<b-form @submit.prevent="deleteUser">
				<div class="sq-text">Please enter your password to confirm deletion.</div>
				<div class="sq-text sq-subtext sq-color-danger mb-2">Warning: This action cannot be undone. If you want temporary deactivation, you can click the Deactivate account button instead.</div>
				<FormInputGroup modal v-model="deleteUserForm.password" :validationModel="$v.deleteUserForm.password" type="password"
					:invalidFeedbacks="{
						required: 'Password is required to delete your account',
					}"
				/>
				<ButtonSubmit :isProcessing="isAccountDeleting" :isProcessed="isAccountDeleted" modal buttonText="Delete account" buttonTextDone="Account deleted"/>
			</b-form>
		</CustomModal>
		<ImageCropModal modalId="sq-the-modal-cropper" @hide="resetFileInput" :imgDataURL="userProfilePic" :isUpdating="isProfilePicUpdating" @cropped="updateProfilePic">
		</ImageCropModal>

	</div>
</template>

<script>
// eslint-disable
import {
	required,
	minLength,
	maxLength,
	alpha,
} from 'vuelidate/lib/validators';
// import VueCropper from 'vue-cropperjs';
import FormInputGroup from '@/components/FormInputGroup.vue';
import ButtonSubmit from '@/components/ButtonSubmit.vue';
import CustomModal from '@/components/CustomModal.vue';
import ImageCropModal from '@/components/ImageCropModal.vue';
import userService from '@/services/user.service';
import getProfilePicSrc from '../common/getProfilePicSrc';

export default {
	data() {
		return {
			getProfilePicSrc,
			userInfoForm: {
				fullName: this.$store.state.user.fullName,
				email: this.$store.state.user.email,
			},
			changePasswordForm: {
				oldPassword: '',
				newPassword: '',
			},
			deleteUserForm: {
				password: '',
			},
			isSaving: false,
			isSaved: true,
			isPasswordChanging: false,
			isPasswordChanged: false,
			isAccountDeleting: false,
			isAccountDeleted: false,
			userProfilePic: getProfilePicSrc(this.$store.state.user.profilePicSrc),
			isProfilePicUpdating: false,
		};
	},
	watch: {
		// eslint-disable-next-line
		'userInfoForm.fullName': function () {
			this.isSaved = (this.userInfoForm.fullName === this.$store.state.user.fullName);
		},
		// eslint-disable-next-line
		'changePasswordForm.newPassword': function () {
			this.isPasswordChanged = false;
		},
	},
	methods: {
		onEditProfilePicBtnClick() {
			document.getElementById('sq-the-profile-pic-file-input').click();
		},
		selectProfilePic(event) {
			const reader = new FileReader();
			reader.onload = (e) => {
				this.$bvModal.show('sq-the-modal-cropper');
				this.userProfilePic = e.target.result;
			};

			reader.readAsDataURL(event.target.files[0]);
			return false;
		},
		updateProfilePic(blob) {
			this.isProfilePicUpdating = true;
			userService.updateProfilePic(blob).then((res) => {
				if (res.status === 200) {
					this.$bvModal.hide('sq-the-modal-cropper');
					this.$store.dispatch('fetchUser');
				}
			}).catch((err) => {
				console.log(err);
			}).finally(() => {
				this.isProfilePicUpdating = false;
			});
		},
		resetFileInput() {
			this.$refs.sqRefUserProfilePicFileInput.reset();
		},
		saveUser() {
			this.isSaving = true;
			this.isSaved = false;
			const user = {
				fullName: this.userInfoForm.fullName,
			};
			this.$store.dispatch('updateUser', user).then(() => {
				this.isSaved = true;
				this.isSaving = false;
			});
		},
		changePassword() {
			this.isPasswordChanging = true;
			this.isPasswordChanged = false;
			userService.changePassword(this.changePasswordForm.oldPassword, this.changePasswordForm.newPassword).then((res) => {
				if (res && res.status === 200) {
					this.isPasswordChanged = true;
				}
				this.isPasswordChanging = false;
			}).catch((err) => {
				const res = err.response;
				this.$bvToast.toast(res.data.msg, {
					noCloseButton: true,
					variant: 'danger',
					toaster: 'b-toaster-bottom-center',
				});
				this.isPasswordChanging = false;
			});
		},
		deleteUser() {
			this.isAccountDeleting = true;
			this.isAccountDeleted = false;
			userService.deleteUser(this.deleteUserForm.password).then((res) => {
				if (res && res.status === 200) {
					this.isAccountDeleted = true;
					this.$router.push('/');
				}
				this.isAccountDeleting = false;
			}).catch((err) => {
				const res = err.response;
				this.$bvToast.toast(res.data.msg, {
					noCloseButton: true,
					variant: 'danger',
					toaster: 'b-toaster-bottom-center',
				});
				this.isAccountDeleting = false;
			});
		},
	},
	validations() {
		return {
			userInfoForm: {
				fullName: {
					required,
					maxLength: maxLength(50),
					alphaSplit: (value) => (value ? value.split(' ').every((word) => (word ? alpha(word) : false)) : true),
				},
			},
			changePasswordForm: {
				oldPassword: {
					required,
				},
				newPassword: {
					required,
					minLength: minLength(8),
				},
			},
			deleteUserForm: {
				password: {
					required,
				},
			},
		};
	},
	components: {
		FormInputGroup,
		ButtonSubmit,
		CustomModal,
		// VueCropper,
		ImageCropModal,
	},
};
</script>
