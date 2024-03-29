<template>
	<b-container class="sq-post-container p-0 mb-3">
		<UsernameMediaComp :name="creator.pageName" :profilePicSrc="getProfilePicSrc(creator.profilePicSrc, true)" :subtext="timestamp" @click="$router.push(`/creator/${creator.userId}`)" :showMenuButton="menu.length > 0" :menu="menu" @menuItemClick="menuItemClicked"/>
		<b-row no-gutters class="p-2">
			<b-col align-self="center">
				<div class="sq-text">
					{{ post.description }}
				</div>
			</b-col>
		</b-row>
		<b-row v-if="(post.link || post.attachment) && post.locked" no-gutters class="p-2">
			<b-col>
				<div class="sq-post-locked-attachment">
					<b-row>
						<b-col>
							<b-row class="justify-content-center">
								<div class="sq-post-locked-text w-100">This post is for squad members only</div>
							</b-row>
							<b-row class="justify-content-center">
								<b-icon-lock-fill font-scale="2" class="sq-post-locked-text sq-post-locked-icon m-4"/>
							</b-row>
							<b-row class="justify-content-center">
								<JoinButton :ref="`sqRefJoinBtn${post.postId}`" :squad="squad" :creator="creator" :squadNo="squadNo" :totalSquads="totalSquads" @joined="$emit('joined')"/>
							</b-row>
						</b-col>
					</b-row>
				</div>
			</b-col>
		</b-row>
		<b-row v-else-if="post.link" no-gutters class="p-2">
			<b-col>
				<a :href="urlNormalized" target="_blank" class="text-decoration-none">
					<LinkAttachment :url="post.link"/>
				</a>
			</b-col>
		</b-row>
		<b-row v-else-if="post.attachment && post.attachment.type === 'image'" no-gutters @click="openPost">
			<b-col>
				<b-img :src="`${BASE_DOMAIN}/api/${post.attachment.src}`" fluid-grow></b-img>
			</b-col>
		</b-row>
		<b-row v-else-if="post.attachment && post.attachment.type === 'video'" no-gutters @click="openPost">
			<b-col>
				<video class="w-100 h-100" :src="`${BASE_DOMAIN}/api/${post.attachment.src}`" controls></video>
			</b-col>
		</b-row>
		<b-row no-gutters class="p-2 mt-1" align-v="center">
			<b-col @click="openPost">
				<b-link class="sq-text float-left sq-post-num-comments">{{ totalComments === 0 ? '' : totalComments }} Comments</b-link>
			</b-col>
			<b-col cols="auto" class="px-1 sq-text">
				{{ totalLikes === 0 ? '' : totalLikes }}
			</b-col>
			<b-col cols="auto" class="sq-post-action-icon cursor-pointer">
				<b-icon-heart-fill v-if="liked" @click="toggleLike"></b-icon-heart-fill>
				<b-icon-heart v-else @click="toggleLike"></b-icon-heart>
			</b-col>
		</b-row>
		<CustomModal :modalId="`sq-the-modal-post-delete-${post.postId}`" modalTitle="Delete post?">
			<div>
				<div class="sq-text mb-2">
					This action cannot be undone. Are you sure you want to delete this post?
				</div>
				<ButtonSubmit modal :isProcessing="isDeleting" :isProcessed="isDeleted" buttonText="Confirm delete" buttonTextDone="Post deleted" @click="deletePost"/>
			</div>
		</CustomModal>
	</b-container>
</template>

<script>
import { BASE_DOMAIN } from '../config';
import LinkAttachment from './LinkAttachment.vue';
import postLikeService from '../services/postLike.service';
import JoinButton from './JoinButton.vue';
import commentService from '../services/comment.service';
import getProfilePicSrc from '../common/getProfilePicSrc';
import UsernameMediaComp from './UsernameMediaComp.vue';
import CustomModal from './CustomModal.vue';
import ButtonSubmit from './ButtonSubmit.vue';
import postService from '../services/post.service';
import moment from '../plugins/moment';

export default {
	props: {
		post: Object,
		creator: Object,
		squad: Object,
		squadNo: Number,
		totalSquads: Number,
	},
	data() {
		return {
			BASE_DOMAIN,
			getProfilePicSrc,
			liked: false,
			totalLikes: 0,
			totalComments: 0,
			menu: [],
			isDeleting: false,
			isDeleted: false,
		};
	},
	computed: {
		urlNormalized() {
			if (this.post.link) {
				let urlNormalized = this.post.link;
				if (!urlNormalized.startsWith('https://') && !urlNormalized.startsWith('http://')) urlNormalized = `https://${urlNormalized}`;
				return urlNormalized;
			}
			return undefined;
		},
		timestamp() {
			return moment().to(this.post.timestamp);
		},
	},
	methods: {
		toggleLike() {
			postLikeService.toggleLike(this.post.postId)
				.then((res) => {
					if (res.status === 200) {
						this.liked = !this.liked;
						this.totalLikes = res.data.numLikes;
					}
				}).catch((err) => {
					const res = err.response;
					this.formSubmitted = false;
					this.$bvToast.toast(res.data.msg, {
						noCloseButton: true,
						variant: 'danger',
						toaster: 'b-toaster-bottom-center',
					});
				});
		},
		openPost() {
			if (this.post.locked) {
				this.$refs[`sqRefJoinBtn${this.post.postId}`].joinSquad();
			} else {
				this.$router.push(`/post/${this.post.postId}`);
			}
		},
		menuItemClicked(menuItem) {
			switch (menuItem) {
			case 'edit':
				this.$router.push(`/edit-post/${this.post.postId}`);
				break;
			case 'delete':
				this.$bvModal.show(`sq-the-modal-post-delete-${this.post.postId}`);
				break;
			default:
				break;
			}
		},
		deletePost() {
			this.isDeleting = true;
			postService.deletePostById(this.post.postId).then((res) => {
				if (res && res.status === 200) {
					this.isDeleted = true;
					this.$emit('deleted');
					this.$bvModal.hide(`sq-the-modal-post-delete-${this.post.postId}`);
				}
			}).catch((err) => {
				console.log(err);
			}).finally(() => {
				this.isDeleting = false;
			});
		},
	},
	beforeMount() {
		postLikeService.getTotalLikes(this.post.postId)
			.then((res) => {
				if (res.status === 200) {
					this.totalLikes = res.data.numLikes;
				}
			}).catch((err) => {
				const res = err.response;
				this.formSubmitted = false;
				this.$bvToast.toast(res.data.msg, {
					noCloseButton: true,
					variant: 'danger',
					toaster: 'b-toaster-bottom-center',
				});
			});
		postLikeService.checkLiked(this.post.postId)
			.then((res) => {
				if (res.status === 200) {
					this.liked = res.data.isPostLiked;
				}
			}).catch((err) => {
				const res = err.response;
				this.formSubmitted = false;
				this.$bvToast.toast(res.data.msg, {
					noCloseButton: true,
					variant: 'danger',
					toaster: 'b-toaster-bottom-center',
				});
			});
		commentService.countNumCommentsOnPost(this.post.postId)
			.then((res) => {
				if (res && res.status === 200) {
					this.totalComments = res.data;
				}
			}).catch((err) => {
				const res = err.response;
				this.formSubmitted = false;
				this.$bvToast.toast(res.data.msg, {
					noCloseButton: true,
					variant: 'danger',
					toaster: 'b-toaster-bottom-center',
				});
			});

		if (this.creator.userId === this.$store.state.creator.userId) {
			this.menu = [{
				id: 'edit',
				text: 'Edit post',
			}, {
				id: 'delete',
				text: 'Delete post',
			}];
		}
	},
	components: {
		LinkAttachment,
		JoinButton,
		UsernameMediaComp,
		CustomModal,
		ButtonSubmit,
	},
};
</script>

<style lang="scss" scoped>

.sq-post-container {
	background-color: $my-color-light;
	border-radius: 0.25rem;
}

.sq-post-num-comments {
	line-height: 1.25rem;
	color: $my-color-gray1;
	text-decoration: underline;
	text-decoration-color: $my-color-gray1;
}

.sq-post-action-icon {
	font-size: 1.25rem;
	line-height: 1.25rem;
	color: $my-color-gray1;
}

.sq-post-locked-attachment {
	background-color: $my-color-gray1;
	width: 100%;
	height: 100%;
	padding: 2rem;
}

.sq-post-locked-text {
	color: $my-color-light;
}

.sq-post-locked-icon {
	transform: scaleX(1.3);
}

</style>
