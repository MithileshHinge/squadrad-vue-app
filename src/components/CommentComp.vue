<template>
	<div>
		<b-media :class="isReply && 'sq-comment-isreply'" class="mt-2 mr-2" no-body>
			<b-media-aside class="mx-2">
				<b-avatar :src="comment.profilePicSrc" size="2rem"></b-avatar>
			</b-media-aside>
			<b-media-body>
				<b-container class="sq-comment-container sq-text">
					<b-row no-gutters>
						<b-col class="sq-font-regular">
							{{ comment.name }}
						</b-col>
						<b-col cols="auto" class="sq-subtext">
							{{ '2h' }}
						</b-col>
					</b-row>
					<b-row no-gutters>
						<b-col>
							{{ comment.text }}
						</b-col>
					</b-row>
					<b-row no-gutters class="mt-2">
						<b-col cols="auto" class="cursor-pointer">
							<b-icon-heart-fill v-if="liked" @click="toggleLikeComment"></b-icon-heart-fill>
							<b-icon-heart v-else @click="toggleLikeComment"></b-icon-heart>
						</b-col>
						<!--b-col v-if="comment.likes > 1" cols="auto" class="ml-1 mr-3" @click="toggleLikeComment">
							{{ comment.likes }} likes
						</b-col>
						<b-col v-else-if="comment.likes > 0" cols="auto" class="ml-1 mr-3" @click="toggleLikeComment">
							{{ comment.likes }} like
						</b-col>
						<b-col v-else cols="auto" class="ml-1 mr-3" @click="toggleLikeComment">
							Like
						</b-col-->
						<b-col cols="auto" class="ml-1 mr-3 cursor-pointer" @click="toggleLikeComment">
							Like
						</b-col>
						<b-col cols="auto" class="cursor-pointer" @click="$emit('replyClick', comment.name)">
							<b-icon-reply></b-icon-reply>
						</b-col>
						<b-col cols="auto" class="ml-1 mr-3 cursor-pointer" @click="$emit('replyClick', comment.name)">
							Reply
						</b-col>
						<b-col v-if="showDelete" cols="auto" class="cursor-pointer">
							<b-icon-trash/>
						</b-col>
						<b-col v-if="showDelete" cols="auto" class="ml-1 mr-3 cursor-pointer" @click="$emit('deleteClick', comment.commentId)">
							Delete
						</b-col>
					</b-row>
				</b-container>
			</b-media-body>
		</b-media>
		<div v-if="!isReply">
			<CommentComp v-for="reply in comment.replies" :key="reply.commentId" :comment="reply" :post="post" :isReply="true" class="mb-2" @replyClick="$emit('replyClick', $event)" @deleteClick="$emit('deleteClick', $event)"/>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CommentComp',
	props: {
		post: Object,
		comment: Object,
		isReply: Boolean,
	},
	data() {
		return {
			liked: false,
		};
	},
	computed: {
		showDelete() {
			return this.post.userId === this.$store.state.creator.userId || this.comment.userId === this.$store.state.user.userId;
		},
	},
	methods: {
		toggleLikeComment() {
			this.liked = !this.liked;
		},
	},
};
</script>

<style lang="scss" scoped>

.sq-comment-container {
	background-color: $my-color-gray7;
	border-radius: 0.3125rem;
	padding: 0.375rem 0.5rem 0.5rem 0.5rem;
}

.sq-comment-isreply {
	margin-left: 3rem;
}

</style>
