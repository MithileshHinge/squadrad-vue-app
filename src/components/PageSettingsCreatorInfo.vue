<template>
	<div>
		<div class="sq-page-title">Creator info</div>
		<b-form id="sq-the-creator-info-form" class="overflow-auto" @submit.prevent="saveCreator">
			<b-card class="sq-form-card">
				<b-form-group>
					<b-form-file ref="sqRefCreatorProfilePicFileInput" id="sq-the-creator-profile-pic-file-input" accept="image/bmp, image/jpeg, image/png, image/tiff" style="display: none;" @change="selectProfilePic"/>
					<b-avatar size="8.5rem">
						<b-img :src="getProfilePicSrc($store.state.creator.profilePicSrc, true)" class="w-100 h-100"></b-img>
						<b-button class="sq-btn-change-profile-pic" @click="onEditProfilePicBtnClick">
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
							<span id="sq-the-form-is-creating-hide"/><b-form-input id="sq-the-form-is-creating-1"  v-model="creatorInfoForm.bio" trim placeholder="Entertainment videos" size="lg" @input="adjustWidth"/>
						</b-col>
					</b-row>
				</b-form-group-->
				<FormInputGroup label="Name of your page" inputId="sq-the-form-creator-name" v-model="creatorInfoForm.pageName" :validationModel="$v.creatorInfoForm.pageName" placeholder="e.g. John Doe" size="lg" trim
					:invalidFeedbacks="{
						required: 'Please tell us the name of your page',
						maxLength: 'Exceeded max character limit',
					}"
				/>
				<FormInputGroup label="What are you creating?" inputId="sq-the-form-is-creating" v-model="creatorInfoForm.bio" :validationModel="$v.creatorInfoForm.bio" placeholder="e.g. Entertainment videos, comics, music, etc" size="lg" trim
					:invalidFeedbacks="{
						required: 'Please tell us what you create',
						maxLength: 'Exceeded max character limit',
					}"
				/>
				<b-form-group class="text-left" label="Which sounds correct?" label-class="sq-form-label" label-align="left">
					<b-form-radio name="isPlural" v-model="creatorInfoForm.isPlural" :value="false" class="sq-text">
						{{creatorInfoForm.pageName}} is creating {{creatorInfoForm.bio}}
					</b-form-radio>
					<b-form-radio name="isPlural" v-model="creatorInfoForm.isPlural" :value="true" class="sq-text">
						{{creatorInfoForm.pageName}} are creating {{creatorInfoForm.bio}}
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
			<ButtonSubmit class="d-lg-none" :isProcessing="isSaving" :isProcessed="isSaved"/>
			<b-row no-gutters class="d-none d-lg-flex fixed-bottom">
				<b-col cols="6"/>
				<b-col cols="3" class="d-flex">
					<ButtonSubmit class="position-relative" :isProcessing="isSaving" :isProcessed="isSaved"/>
				</b-col>
				<b-col cols="3"/>
			</b-row>
			<!-- div to clear fixed submit button from occluding last card-->
			<div style="height: 3.5rem;"/>
		</b-form>
		<ImageCropModal modalId="sq-the-modal-cropper" @hide="resetFileInput" :imgDataURL="creatorProfilePic" :isUpdating="isProfilePicUpdating" @cropped="updateProfilePic">
		</ImageCropModal>
	</div>
</template>

<script>
import {
	required,
	maxLength,
} from 'vuelidate/lib/validators';
import FormInputGroup from '@/components/FormInputGroup.vue';
import ButtonSubmit from '@/components/ButtonSubmit.vue';
import ImageCropModal from '@/components/ImageCropModal.vue';
import creatorService from '../services/creator.service';
import getProfilePicSrc from '../common/getProfilePicSrc';

export default {
	data() {
		return {
			getProfilePicSrc,
			creatorInfoForm: {
				pageName: this.$store.state.creator.pageName,
				bio: this.$store.state.creator.bio,
				isPlural: this.$store.state.creator.isPlural,
				supportersVisibility: this.$store.state.creator.supportersVisibility,
				earningsVisibility: this.$store.state.creator.earningsVisibility,
				otpVisibility: this.$store.state.creator.otpVisibility,
				about: this.$store.state.creator.about,
			},
			isSaved: true,
			isSaving: false,
			creatorProfilePic: getProfilePicSrc(this.$store.state.creator.profilePicSrc, true),
			isProfilePicUpdating: false,
		};
	},
	watch: {
		creatorInfoForm: {
			handler() {
				this.isSaved = true;
				// Compare form data with store state, if anything is different set isSaved to false
				Object.keys(this.creatorInfoForm).forEach((field) => {
					if (this.creatorInfoForm[field] !== this.$store.state.creator[field]) {
						this.isSaved = false;
					}
				});
			},
			deep: true,
		},
	},
	methods: {
		onEditProfilePicBtnClick() {
			document.getElementById('sq-the-creator-profile-pic-file-input').click();
		},
		selectProfilePic(event) {
			const reader = new FileReader();
			reader.onload = (e) => {
				this.$bvModal.show('sq-the-modal-cropper');
				this.creatorProfilePic = e.target.result;
			};

			reader.readAsDataURL(event.target.files[0]);
			return false;
		},
		updateProfilePic(blob) {
			this.isProfilePicUpdating = true;
			creatorService.updateCreatorProfilePic(blob).then((res) => {
				if (res.status === 200) {
					this.$bvModal.hide('sq-the-modal-cropper');
					this.$store.dispatch('fetchCreator');
				}
			}).catch((err) => {
				console.log(err);
			}).finally(() => {
				this.isProfilePicUpdating = false;
			});
		},
		resetFileInput() {
			this.$refs.sqRefCreatorProfilePicFileInput.reset();
		},
		saveCreator() {
			this.isSaving = true;
			this.$store.dispatch('updateCreator', this.creatorInfoForm).then(() => {
				this.isSaving = false;
				this.isSaved = true;
			}).catch((err) => {
				console.log(`error123: ${err}`);
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
				bio: {
					required,
					maxLength: maxLength(50),
				},
			},
		};
	},
	components: {
		FormInputGroup,
		ButtonSubmit,
		ImageCropModal,
	},
};
</script>
