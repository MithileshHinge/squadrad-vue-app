<template>
	<b-container class="sq-post-container p-0 mb-3">
		<b-row no-gutters class="p-2">
			<b-col cols="auto" class="px-0">
				<b-avatar src="@/assets/tushar.png"></b-avatar>
			</b-col>
			<b-col align-self="center" class="pl-2">
				<div class="sq-text">
					{{ post.pageName }}
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
		<b-row v-if="post.attachment && post.attachment.type === 'image'" no-gutters @click="openPost">
			<b-col>
				<b-img :src="`${BASE_DOMAIN}/api/${post.attachment.src}`" fluid-grow></b-img>
			</b-col>
		</b-row>
		<b-row v-if="post.attachment && post.attachment.type === 'video'" no-gutters @click="openPost">
			<b-col>
				<video class="w-100 h-100" :src="`${BASE_DOMAIN}/api/${post.attachment.src}`" controls></video>
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
import { BASE_DOMAIN } from '../config';

export default {
	props: {
		post: null,
	},
	data() {
		return {
			BASE_DOMAIN,
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
