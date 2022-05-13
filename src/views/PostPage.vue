<template>
	<div v-if="post">
		<PostComp :post="post" :profilePic="creatorProfilePicSrc" :pageName="pageName"></PostComp>
		<b-container>
			<CommentComp v-for="comment in comments" :key="comment.commentId" :comment="comment" :isReply="false" class="mb-2"></CommentComp>
		</b-container>
		<CommentInputBox/>
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
import store from '../store';
import { BASE_DOMAIN } from '../config';

export default {
	data() {
		return {
			comments: [
				{
					commentId: 1,
					userId: 1,
					text: 'Dhaapu',
					replies: [
						{
							commentId: 3,
							userId: 1,
							text: 'Khudka comic bana',
						},
					],
				},
				{
					commentId: 2,
					userId: 1,
					text: 'Boooooo',
				},

			],
			post: undefined,
			profilePic: undefined,
			pageName: undefined,

		};
	},
	computed: {
		creatorProfilePicSrc() {
			if (this.profilePic === this.$store.state.creator.profilePicSrc) return this.profilePic;
			return `${BASE_DOMAIN}/images/profilePics/creators/${this.profilePic}`;
		},
	},
	beforeRouteEnter(to, from, next) {
		postService.getPostById(to.params.postId).then((res) => {
			if (res && res.status === 200) {
				const post = res.data;
				if (!post.locked) {
					if (post.userId === store.state.creator.userId) {
						next((vm) => {
							vm.post = res.data;
							vm.profilePic = store.state.creator.profilePicSrc;
							vm.pageName = store.state.creator.pageName;
						});
					}
				} else {
					console.log('debug1111');
					next(new Error('Post is locked'));
				}
			}
		}).catch((err) => {
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
