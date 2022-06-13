<template>
	<div class="col-lg-6 m-auto">
		<div class="sq-page-title">Edit post</div>
		<b-form class="overflow-auto" @submit.prevent="editPost">
			<b-form-group id="sq-the-post-form-squad-select-group" label="Squad access" v-helptext="'Only members of selected squad or higher squads will have access to this post'">
				<b-form-select disabled v-model="post.squadId" :options="squads"/>
			</b-form-group>
			<b-card class="sq-form-card">
				<b-form-row class="m-0">
					<b-form-textarea id="sq-the-form-post-description" class="sq-form-textarea" v-model="$v.postForm.description.$model" :state="validateState($v.postForm.description)" placeholder="Write a description" size="lg" rows="8"/>
					<b-form-invalid-feedback class="sq-form-invalid-feedback">
						Exceeded max character limit
					</b-form-invalid-feedback>
				</b-form-row>
				<b-form-row v-if="post.postImage || post.postVideo || post.link" class="m-0 mt-3 position-relative">
					<b-img v-if="post.postImage" :src="`${BASE_DOMAIN}/api/${post.postImage}`" fluid-grow/>
					<video v-if="post.postVideo" class="w-100 h-100" :src="`${BASE_DOMAIN}/api/${post.postVideo}`" controls/>
					<LinkAttachment v-if="post.link" :url="post.link"/>
				</b-form-row>
			</b-card>
			<ButtonSubmit :isProcessing="isEditing" isRouted buttonText="Edit post"/>
			<!-- div to clear fixed submit button from occluding last card-->
			<div style="height: 3.5rem;"/>
		</b-form>
	</div>
</template>

<script>
/* eslint-disable no-param-reassign */
import { maxLength } from 'vuelidate/lib/validators';
import validateStateMixin from '@/mixins/validateStateMixin';
import ButtonSubmit from '@/components/ButtonSubmit.vue';
import postService from '@/services/post.service';
import LinkAttachment from '../components/LinkAttachment.vue';
import { BASE_DOMAIN } from '../config';

export default {
	data() {
		return {
			BASE_DOMAIN,
			postForm: {
				description: '',
			},
			post: {
				postId: '',
				squadId: '',
				postImage: undefined,
				postVideo: undefined,
				link: undefined,
			},
			isEditing: false,
			squads: [
				{ value: '', text: 'Free post' },
				...this.$store.state.squads.map((squad) => ({
					value: squad.squadId,
					text: squad.title,
				})),
			],
		};
	},
	methods: {
		editPost() {
			this.$v.postForm.$touch();
			if (this.$v.postForm.$anyError) return;

			this.isEditing = true;
			console.log(this.postForm);
			postService.editPost(this.post.postId, this.postForm).then((res) => {
				if (res && res.status === 200) {
					this.isEditing = false;
					this.$router.push(`/post/${this.post.postId}`);
				}
			}).catch((err) => {
				console.log(err);
				this.isEditing = false;
			});
		},
	},
	mounted() {
		postService.getPostById(this.$route.params.postId).then((res) => {
			if (res && res.status === 200) {
				const post = res.data;
				this.postForm = {
					description: post.description,
				};
				this.post = {
					postId: post.postId,
					squadId: post.squadId,
					postImage: post.attachment && post.attachment.type === 'image' ? post.attachment.src : undefined,
					postVideo: post.attachment && post.attachment.type === 'video' ? post.attachment.src : undefined,
					link: post.link ? post.link : undefined,
				};
			}
		}).catch((err) => {
			console.log(err);
		});
		this.$store.dispatch('fetchAllSquads').finally(() => {
			this.squads = [
				{ value: '', text: 'Free post' },
				...this.$store.state.squads.map((squad) => ({
					value: squad.squadId,
					text: squad.title,
				})),
			];
		});
	},
	validations() {
		return {
			postForm: {
				description: {
					maxLength: maxLength(2000),
				},
			},
		};
	},
	mixins: [validateStateMixin],
	components: {
		ButtonSubmit,
		LinkAttachment,
	},
};
</script>

<style lang="scss" scoped>
#sq-the-post-form-squad-select-group {
	margin-right: 1.25rem;
	margin-left: 1.25rem;
}
</style>
