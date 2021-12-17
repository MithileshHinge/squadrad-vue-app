<template>
	<b-container class="sq-post-container p-0 mb-3">
		<b-row no-gutters class="p-2">
			<b-col cols="auto" class="px-0">
				<b-avatar src="@/assets/tushar.png"></b-avatar>
			</b-col>
			<b-col align-self="center" class="pl-2">
				<div class="sq-text">
					{{ post.creator }}
				</div>
				<div class="sq-subtext sq-text">
					{{ post.time }}
				</div>
			</b-col>
			<b-col align-self="center">
				<b-icon-three-dots-vertical class="sq-post-menu-button"/>
			</b-col>
		</b-row>
		<b-row no-gutters class="p-2" @click="openPost">
			<b-col align-self="center">
				<div class="sq-text">
					{{ post.description }}
				</div>
			</b-col>
		</b-row>
		<b-row no-gutters @click="openPost">
			<b-col>
				<!--b-img :src="require('@/assets/'+post.path)" fluid-grow></b-img-->
			</b-col>
		</b-row>
		<b-row no-gutters class="p-2 mt-1" align-v="center">
			<b-col @click="openPost">
				<b-link class="sq-text float-left sq-post-num-comments">{{ post.numComments }} Comments</b-link>
			</b-col>
			<b-col cols="auto" class="px-1 sq-text">
				{{ post.numLikes }}
			</b-col>
			<b-col cols="auto" class="sq-post-action-icon">
				<b-icon-heart-fill v-if="liked" @click="toggleLike"></b-icon-heart-fill>
				<b-icon-heart v-else @click="toggleLike"></b-icon-heart>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
export default {
	props: {
		post: null,
	},
	data() {
		return {
			liked: false,
		};
	},
	methods: {
		toggleLike() {
			this.liked = !this.liked;
		},
		openPost() {
			this.$router.push('/post');
		},
	},
};
</script>

<style lang="scss" scoped>

.sq-post-container {
	background-color: $my-color-light;
}

.sq-post-menu-button {
	font-size: 1.25rem;
	color: $my-color-gray1;
	float: right;
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

</style>
