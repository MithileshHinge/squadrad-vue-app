<template>
	<div>
		<div class="sq-page-title">Create post</div>
		<b-form class="overflow-auto" @submit.prevent="createPost">
			<b-form-group id="sq-the-post-form-squad-select-group" label="Squad access" v-helptext="'Only members of selected squad or higher squads will have access to this post'">
				<b-form-select v-model="postForm.squadId" :options="squads"/>
			</b-form-group>
			<b-card class="sq-form-card">
				<b-form-group class="m-0">
					<b-form-textarea id="sq-the-form-post-description" class="sq-form-textarea" v-model="$v.postForm.description.$model" :state="validateState($v.postForm.description)" placeholder="Write a description" size="lg" rows="3" trim/>
					<b-form-invalid-feedback class="sq-form-invalid-feedback">
						Exceeded max character limit
					</b-form-invalid-feedback>
				</b-form-group>
			</b-card>
			<ButtonSubmit :isProcessing="isCreating" isRouted buttonText="Create post"/>
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
			},
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
	methods: {
		createPost() {
			this.$v.postForm.$touch();
			if (this.$v.postForm.$anyError) return;

			this.isCreating = true;
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
		};
	},
	mixins: [validateStateMixin],
	components: {
		ButtonSubmit,
	},
};
</script>

<style lang="scss" scoped>
#sq-the-post-form-squad-select-group {
	margin-right: 1.25rem;
	margin-left: 1.25rem;
}
</style>
