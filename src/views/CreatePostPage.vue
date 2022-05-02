<template>
	<div>
		<div class="sq-page-title">Create post</div>
		<b-form class="overflow-auto" @submit.prevent="createPost">
			<b-form-group id="sq-the-post-form-squad-select-group" label="Squad access" v-helptext="'Only members of selected squad or higher squads will have access to this post'">
				<b-form-select v-model="postForm.squadId" :options="squads"/>
			</b-form-group>
			<b-card class="sq-form-card">
				<b-form-row class="m-0">
					<b-form-textarea id="sq-the-form-post-description" class="sq-form-textarea" v-model="$v.postForm.description.$model" :state="validateState($v.postForm.description)" placeholder="Write a description" size="lg" rows="3" trim/>
					<b-form-invalid-feedback class="sq-form-invalid-feedback">
						Exceeded max character limit
					</b-form-invalid-feedback>
				</b-form-row>
				<b-form-row v-if="!postForm.postImage && !postForm.postVideo && !postForm.link" class="float-left m-0 mt-3">
					<b-col class="sq-attach-btn sq-attach-btn1 sq-shadow" @click="selectImage"><b-icon-image-fill class="sq-attach-icon"/></b-col>
					<b-col class="sq-attach-btn sq-attach-btn2 sq-shadow" @click="selectVideo"><b-icon-camera-video-fill class="sq-attach-icon"/></b-col>
					<b-col class="sq-attach-btn sq-attach-btn3 sq-shadow" @click="showAttachLinkModal"><b-icon-link font-scale="1.4" rotate="-45" class="sq-attach-icon"/></b-col>
				</b-form-row>
				<b-form-row style="display: none;">
					<b-form-file ref="sqRefPostImageFileInput" id="sq-the-post-image-file-input" accept="image/bmp, image/jpeg, image/png, image/tiff" @change="cropImage"/>
					<b-form-file ref="sqRefPostVideoFileInput" id="sq-the-post-video-file-input" accept="video/mp4, video/quicktime, video/x-msvideo, video/x-ms-wmv" @change="attachVideo"/>
				</b-form-row>
				<b-form-row v-if="postForm.postImage || postForm.postVideo || postForm.link" class="m-0 mt-3 position-relative">
					<span class="sq-btn-remove-attachment sq-shadow" @click="removeAttachment">
						<span class="sq-close-icon-bar"></span>
					</span>
					<b-img v-if="postForm.postImage" :src="attachmentURL" fluid-grow/>
					<video v-if="postForm.postVideo" class="w-100 h-100" :src="attachmentURL" controls/>
					<LinkAttachment v-if="postForm.link" :url="postForm.link"/>
				</b-form-row>
			</b-card>
			<ButtonSubmit :isProcessing="isCreating" isRouted buttonText="Create post"/>
			<!-- div to clear fixed submit button from occluding last card-->
			<div style="height: 3.5rem;"/>
		</b-form>
		<ImageCropModal modalId="sq-the-modal-cropper" buttonText="Attach image" :aspectRatio="NaN" :cropBoxResizable="true" :cropBoxRectangular="true" @hide="resetImageFileInput" :imgDataURL="selectedPostImage" @cropped="attachImage">
		</ImageCropModal>
		<CustomModal modalId="sq-the-post-url-modal" modalTitle="Attach link">
			<b-form @submit.prevent="attachLink">
				<FormInputGroup modal placeholder="Enter URL" v-model="linkModalInput" size="lg" :validationModel="$v.linkModalInput" trim autocomplete="off"
					:invalidFeedbacks="{
						default: 'Please enter a URL to attach',
					}"/>
				<ButtonSubmit modal buttonText="Attach link"/>
			</b-form>
		</CustomModal>
	</div>
</template>

<script>
/* eslint-disable no-param-reassign */
import { maxLength, required } from 'vuelidate/lib/validators';
import validateStateMixin from '@/mixins/validateStateMixin';
import ButtonSubmit from '@/components/ButtonSubmit.vue';
import ImageCropModal from '@/components/ImageCropModal.vue';
import postService from '@/services/post.service';
import FormInputGroup from '../components/FormInputGroup.vue';
import CustomModal from '../components/CustomModal.vue';
import LinkAttachment from '../components/LinkAttachment.vue';

export default {
	beforeRouteEnter(to, from, next) {
		next((vm) => {
			vm.$store.dispatch('fetchAllSquads').finally(() => {
				vm.squads = [
					{ value: '', text: 'Free post' },
					...vm.$store.state.squads.map((squad) => ({
						value: squad.squadId,
						text: squad.title,
					})),
				];
			});
		});
	},
	data() {
		return {
			postForm: {
				squadId: '',
				description: '',
				type: '',
				postImage: undefined,
				postVideo: undefined,
				link: undefined,
			},
			selectedPostImage: undefined,
			linkModalInput: undefined,
			isCreating: false,
			squads: [
				{ value: '', text: 'Free post' },
				...this.$store.state.squads.map((squad) => ({
					value: squad.squadId,
					text: squad.title,
				})),
			],
		};
	},
	computed: {
		attachmentURL() {
			const urlCreator = window.URL || window.webkitURL;
			if (this.postForm.postImage) {
				return urlCreator.createObjectURL(this.postForm.postImage);
			}
			if (this.postForm.postVideo) {
				return urlCreator.createObjectURL(this.postForm.postVideo);
			}
			return undefined;
		},
	},
	methods: {
		selectImage() {
			document.getElementById('sq-the-post-image-file-input').click();
		},
		cropImage(event) {
			const reader = new FileReader();
			reader.onload = (e) => {
				this.$bvModal.show('sq-the-modal-cropper');
				this.selectedPostImage = e.target.result;
			};
			reader.readAsDataURL(event.target.files[0]);
			return false;
		},
		attachImage(blob) {
			this.$bvModal.hide('sq-the-modal-cropper');
			this.postForm.postImage = blob;
			this.postForm.type = 'image';
		},
		resetImageFileInput() {
			this.$refs.sqRefPostImageFileInput.reset();
		},
		selectVideo() {
			document.getElementById('sq-the-post-video-file-input').click();
		},
		attachVideo(event) {
			[this.postForm.postVideo] = event.target.files;
			this.postForm.type = 'video';
		},
		resetVideoFileInput() {
			this.$refs.sqRefPostVideoFileInput.reset();
		},
		removeAttachment() {
			this.postForm.postImage = undefined;
			this.postForm.postVideo = undefined;
			this.postForm.link = undefined;
			this.postForm.type = '';
		},
		showAttachLinkModal() {
			this.$bvModal.show('sq-the-post-url-modal');
		},
		attachLink() {
			this.postForm.link = this.linkModalInput;
			this.$bvModal.hide('sq-the-post-url-modal');
		},
		createPost() {
			this.$v.postForm.$touch();
			if (this.$v.postForm.$anyError) return;

			this.isCreating = true;
			console.log(this.postForm);
			postService.createPost(this.postForm).then((res) => {
				if (res && res.status === 200) {
					this.isCreating = false;
					this.$router.push('/creator');
				}
			}).catch((err) => {
				console.log(err);
				this.isCreating = false;
			});
		},
	},
	validations() {
		return {
			postForm: {
				description: {
					maxLength: maxLength(2000),
				},
			},
			linkModalInput: {
				required,
			},
		};
	},
	mixins: [validateStateMixin],
	components: {
		ButtonSubmit,
		ImageCropModal,
		FormInputGroup,
		CustomModal,
		LinkAttachment,
	},
};
</script>

<style lang="scss" scoped>
#sq-the-post-form-squad-select-group {
	margin-right: 1.25rem;
	margin-left: 1.25rem;
}

.sq-attach-btn {
	display: flex;
	height: 2.75rem;
	width: 2.75rem;
	background-color: #ffffff;
	color: $my-color-dark;
	//box-shadow: 0px 5px 20px rgba($color: $my-color-dark, $alpha: 0.15);
	border-radius: 50%;
	margin: 0.625rem 0.3125rem 0.625rem 0.3125rem;
}

.sq-attach-btn > svg {
	margin: auto;
}

.sq-attach-btn1 {
	background-color: $french-rose;
}
.sq-attach-btn2 {
	background-color: $mulberry-crayola;
}
.sq-attach-btn3 {
	background-color: $dodger-blue;
}

.sq-attach-icon {
	color: $my-color-light;
}

.sq-btn-remove-attachment {
	border-radius: 50%;
	background: $my-color-light;
	position: absolute;
	padding: 0.5rem 0.41rem;
	top: 0.5rem;
	right: 0.5rem;
	z-index: 100;
}
</style>
