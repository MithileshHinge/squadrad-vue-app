<template>
	<b-row no-gutters align-h="center" class="sq-background-gray">
		<b-col sm="12" lg="4" class="m-lg-4">
			<div v-if="post" class="sq-background-light">
				<PostComp :post="post" :creator="creator" @deleted="$router.push('/creator')"></PostComp>
				<b-container>
					<CommentComp v-for="comment in comments" :key="comment.commentId" :comment="comment" :post="post" :isReply="false" class="mb-2" @replyClick="setReplyTo($event, comment.commentId)" @deleteClick="deleteComment($event)"></CommentComp>
				</b-container>
				<CommentInputBox id="sq-the-post-page-comment-input-box-sm" class="d-block d-lg-none fixed-bottom" :post="post" :isReplying="isReplying" :replyingTo="replyingToName" @submit="submitComment" @resetReplyTo="resetReplyTo"/>
				<CommentInputBox id="sq-the-post-page-comment-input-box-lg" class="d-none d-lg-block" :post="post" :isReplying="isReplying" :replyingTo="replyingToName" @submit="submitComment" @resetReplyTo="resetReplyTo"/>
				<!-- div to clear fixed commentinputbox from occluding last comment-->
				<div style="height: 3.5rem;" class="d-block d-lg-none"/>
			</div>
		</b-col>
	</b-row>
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
import { forEachAsync } from '../common/helpers';
import getProfilePicSrc from '../common/getProfilePicSrc';

async function populateComments(postId, creator) {
	const resComments = await commentService.getCommentsOnPost(postId);
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
			comment.replies.sort((a, b) => a.timestamp - b.timestamp);
		});
		comments.sort((a, b) => a.timestamp - b.timestamp);
		return comments;
	}
	throw new Error('Could not fetch comments');
}

export default {
	data() {
		return {
			comments: undefined,
			post: undefined,
			creator: undefined,
			isReplying: false,
			replyingToName: undefined,
			replyingToCommentId: undefined,
		};
	},
	methods: {
		async submitComment(text) {
			try {
				if (this.replyingToCommentId) {
					const res = await commentService.addReply(this.post.postId, this.replyingToCommentId, text);
					if (!(res && res.status === 200)) {
						throw new Error('Could not add reply');
					}
				} else {
					const res = await commentService.addComment(this.post.postId, text);
					if (!(res && res.status === 200)) {
						throw new Error('Could not add comment');
					}
				}
				this.resetReplyTo();
				this.comments = await populateComments(this.post.postId, this.creator);
			} catch (err) {
				console.log(err);
				this.$bvToast.toast((err.response.msg, {
					noCloseButton: true,
					variant: 'danger',
					toaster: 'b-toaster-bottom-center',
				}));
			}
		},
		setReplyTo(name, commentId) {
			this.isReplying = true;
			this.replyingToName = name;
			this.replyingToCommentId = commentId;
			// Check if lg screen comment input box is displayed (only for lg+ screens)
			const commentInputBoxLg = document.querySelector('#sq-the-post-page-comment-input-box-lg');
			const commentInputFormInputLg = commentInputBoxLg.querySelector('.sq-comment-input-form-input');
			const commentInputFormInputSm = document.querySelector('#sq-the-post-page-comment-input-box-sm .sq-comment-input-form-input');
			const cssLg = window.getComputedStyle(commentInputBoxLg);
			if (cssLg.display === 'block') {
				commentInputFormInputLg.focus();
			} else {
				commentInputFormInputSm.focus();
			}
		},
		resetReplyTo() {
			this.isReplying = false;
			this.replyingToName = undefined;
			this.replyingToCommentId = undefined;
		},
		async deleteComment(commentId) {
			try {
				await commentService.deleteComment(commentId);
				this.comments = await populateComments(this.post.postId, this.creator);
			} catch (err) {
				console.log(err);
			}
		},
	},
	mounted() {
		postService.getPostById(this.$route.params.postId).then(async (resPost) => {
			if (resPost && resPost.status === 200 && !resPost.data.locked) {
				if (resPost.data.userId === this.$store.state.creator.userId) { // post is from self
					return [resPost.data, this.$store.state.creator];
				}
				const resCreator = await creatorService.getCreatorById(resPost.data.userId);
				if (resCreator && resCreator.status === 200) {
					return [resPost.data, resCreator.data];
				}
				throw new Error('Could not fetch creator');
			}
			throw new Error('Post is locked');
		}).then(async ([post, creator]) => {
			const comments = await populateComments(post.postId, creator);
			return [post, creator, comments];
		}).then(([post, creator, comments]) => {
			this.post = post;
			this.creator = creator;
			this.comments = comments;
		})
			.catch((err) => {
				console.log(err);
				this.$bvToast.toast((err.response.msg, {
					noCloseButton: true,
					variant: 'danger',
					toaster: 'b-toaster-bottom-center',
				}));
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
