<template>
	<b-media :class="comment.isReply && 'sq-comment-isreply'" class="mt-2 mr-2" no-body>
		<b-media-aside class="mx-2">
			<b-avatar src="@/assets/tushar.png" size="2rem"></b-avatar>
		</b-media-aside>
		<b-media-body>
			<b-container class="sq-comment-container sq-text">
				<b-row no-gutters>
					<b-col class="sq-font-regular">
						{{ comment.userfullName }}
					</b-col>
					<b-col cols="auto" class="sq-subtext">
						{{ comment.timestamp }}
					</b-col>
				</b-row>
				<b-row no-gutters>
					<b-col>
						{{ comment.comment }}
					</b-col>
				</b-row>
				<b-row no-gutters class="mt-2">
					<b-col cols="auto">
						<b-icon-heart-fill v-if="liked" @click="toggleLikeComment"></b-icon-heart-fill>
						<b-icon-heart v-else @click="toggleLikeComment"></b-icon-heart>
					</b-col>
					<b-col v-if="comment.likes > 1" cols="auto" class="ml-1 mr-3" @click="toggleLikeComment">
						{{ comment.likes }} likes
					</b-col>
					<b-col v-else-if="comment.likes > 0" cols="auto" class="ml-1 mr-3" @click="toggleLikeComment">
						{{ comment.likes }} like
					</b-col>
					<b-col v-else cols="auto" class="ml-1 mr-3" @click="toggleLikeComment">
						Like
					</b-col>
					<b-col cols="auto">
						<b-icon-reply></b-icon-reply>
					</b-col>
					<b-col cols="auto" class="ml-1 mr-3">
						Reply
					</b-col>
				</b-row>
			</b-container>
		</b-media-body>
	</b-media>
</template>

<script>
export default {
	props: {
		comment: Object,
	},
	data() {
		return {
			liked: false,
		};
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
