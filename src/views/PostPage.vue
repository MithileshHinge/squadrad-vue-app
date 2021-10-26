<template>
	<div>
		<PostComp :post="post"></PostComp>
		<b-container>
			<CommentComp v-for="comment in comments" :key="comment.commentId" :comment="comment" class="mb-2"></CommentComp>
		</b-container>
		<CommentInputBox/>
	</div>
</template>

<script>
import PostComp from '@/components/PostComp.vue';
import CommentComp from '@/components/CommentComp.vue';
import CommentInputBox from '@/components/CommentInputBox.vue';

export default {
	data() {
		return {
			comments: [
				{
					commentId: 1,
					userId: 1,
					userFullName: 'Mithilesh Hinge',
					rootId: null,
					isReply: false,
					comment: 'Dhaapu',
					timestamp: '2h',
					likes: 54,
					replies: 2,
				},
				{
					commentId: 3,
					userId: 1,
					userFullName: 'Mithilesh Hinge',
					rootId: 1,
					isReply: true,
					comment: 'Khudka comic bana',
					timestamp: '7m',
					likes: 0,
					replies: 0,
				},
				{
					commentId: 2,
					userId: 1,
					userFullName: 'Mithilesh Hinge',
					rootId: null,
					isReply: false,
					comment: 'Boooooo',
					timestamp: '1h',
					likes: 2,
					replies: 4,
				},

			],
			post: {
				id: 1,
				creator: 'Brown Paperbag',
				description: 'New comic exclusive pre-release for you guys! Let me know your thoughts in the comments',
				time: '3d',
				path: 'brownpaperbag-comic.png',
				numComments: 4,
				numLikes: 30,
			},
		};
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
