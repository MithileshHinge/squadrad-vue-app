<template>
	<div v-if="post">
		<PostComp :post="post" :profilePic="creatorProfilePicSrc" :pageName="creator.pageName"></PostComp>
		<b-container>
			<CommentComp v-for="comment in comments" :key="comment.commentId" :comment="comment" :isReply="false" class="mb-2"></CommentComp>
		</b-container>
		<CommentInputBox @submit="submitComment"/>
		<!-- div to clear fixed commentinputbox from occluding last comment-->
		<div style="height: 3.5rem;"/>
	</div>
</template>

<script>
/* eslint-disable no-param-reassign */
import PostComp from '@/components/PostComp.vue';
import CommentComp from '@/components/CommentComp.vue';
import CommentInputBox from '@/components/CommentInputBox.vue';
import postService from '../services/post.service';
import creatorService from '../services/creator.service';
import commentService from '../services/comment.service';
import userService from '../services/user.service';
import store from '../store';
import { BASE_DOMAIN } from '../config';
import { forEachAsync } from '../common/helpers';

function getProfilePicSrc(profilePic, isCreator) {
	if (isCreator && store.state.creator && profilePic === store.state.creator.profilePicSrc) return store.state.creator.profilePicSrc;
	if (store.state.user && profilePic === store.state.user.profilePicSrc) return store.state.user.profilePicSrc;
	return `${BASE_DOMAIN}/images/profilePics/${isCreator ? '/creators' : '/users'}/${profilePic}`;
}

export default {
	data() {
		return {
			comments: undefined,
			post: undefined,
			creator: undefined,
		};
	},
	computed: {
		creatorProfilePicSrc() {
			if (this.creator.userId === this.$store.state.creator.userId) return this.$store.state.creator.profilePicSrc;
			return `${BASE_DOMAIN}/images/profilePics/creators/${this.creator.profilePicSrc}`;
		},
	},
	methods: {
		submitComment(text) {
			commentService.addComment(this.post.postId, text).then((res) => {
				if (res && res.status === 200) {
					commentService.getCommentsOnPost(this.post.postId).then((resComments) => {
						if (resComments && resComments.status === 200) {
							this.comments = resComments.data;
						}
					}).catch((err) => {
						console.log(err);
						this.$bvToast.toast((err.response.msg, {
							noCloseButton: true,
							variant: 'danger',
							toaster: 'b-toaster-bottom-center',
						}));
					});
				}
			}).catch((err) => {
				console.log(err);
				this.$bvToast.toast((err.response.msg, {
					noCloseButton: true,
					variant: 'danger',
					toaster: 'b-toaster-bottom-center',
				}));
			});
		},
	},
	beforeRouteEnter(to, from, next) {
		postService.getPostById(to.params.postId).then(async (resPost) => {
			if (resPost && resPost.status === 200 && !resPost.data.locked) {
				if (resPost.data.userId === store.state.creator.userId) { // post is from self
					return [resPost.data, store.state.creator];
				}
				const resCreator = await creatorService.getCreatorById(resPost.data.userId);
				if (resCreator && resCreator.status === 200) {
					return [resPost.data, resCreator.data];
				}
				throw new Error('Could not fetch creator');
			}
			throw new Error('Post is locked');
		}).then(async ([post, creator]) => {
			const resComments = await commentService.getCommentsOnPost(post.postId);
			if (resComments && resComments.status === 200) {
				const comments = resComments.data;
				await forEachAsync(comments, async (comment) => {
					await forEachAsync([comment, ...comment.replies], async (c) => {
						if (c.userId === creator.userId) { // Comment is from the creator of the post
							c.name = creator.pageName;
							c.profilePicSrc = getProfilePicSrc(creator.profilePicSrc, true);
						} else if (c.userId === store.state.user.userId) { // Comment is from self on another creator's post
							c.name = store.state.user.fullName;
							c.profilePicSrc = getProfilePicSrc(store.state.user.profilePicSrc, false);
						} else { // Comment is from some new user we haven't fetched
							const resUser = await userService.getUserById(c.userId);
							if (resUser && resUser.status === 200) {
								c.name = resUser.data.fullName;
								c.profilePicSrc = getProfilePicSrc(resUser.data.profilePicSrc, false);
							} else throw new Error('Could not fetch commentor');
						}
					});
				});
				return [post, creator, comments];
			}
			throw new Error('Could not fetch comments');
		}).then(([post, creator, comments]) => {
			next((vm) => {
				vm.post = post;
				vm.creator = creator;
				vm.comments = comments;
			});
		})
			.catch((err) => {
				console.log(err);
				next((vm) => {
					vm.$bvToast.toast((err.response.msg, {
						noCloseButton: true,
						variant: 'danger',
						toaster: 'b-toaster-bottom-center',
					}));
				});
			});
	},
	components: {
		PostComp,
		CommentComp,
		CommentInputBox,
	},
};
</script>

<style lang="scss" scoped>

.sq-post-menu-button {
	font-size: 1.25rem;
	color: $my-color-gray1;
	float: right;
	margin-right: 0.5rem;
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

.bi-heart-fill {
	color: $radical-red;
}

</style>
