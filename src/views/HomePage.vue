<template>
	<div>
		<b-tabs v-if="posts.length > 0" id="sq-the-all-paid-post-tabs" align="left" nav-wrapper-class="sq-shadow">
			<b-tab title="All posts" title-item-class="sq-nav-item">
				<div class="sq-background-gray pt-3">
					<PostComp v-for="post in posts" :key="post.id" :post="post"></PostComp>
				</div>
			</b-tab>
			<b-tab title="Paid posts" title-item-class="sq-nav-item"></b-tab>
		</b-tabs>
		<div v-else>
			<b-img id="sq-the-feed-empty-img" src="@/assets/feed-empty-state.jpg"></b-img>
			<div class="sq-empty-state-text sq-text">Support creators to see their posts in your feed</div>
			<b-button id="sq-the-find-creators-btn" class="sq-btn sq-btn-cta">Find creators you may know</b-button>
		</div>
	</div>
</template>

<script>
import PostComp from '@/components/PostComp.vue';

export default {
	data() {
		return {
			posts: [{
				id: 1,
				creator: 'Brown Paperbag',
				description: 'New comic exclusive pre-release for you guys! Let me know your thoughts in the comments',
				time: '3d',
				path: 'brownpaperbag-comic.png',
				num_comments: 4,
				num_likes: 30,
			},
			{
				id: 2,
				creator: 'Tushar Sawant',
				description: 'New comic exclusive pre-release for you guys! Let me know your thoughts in the comments',
				time: '3d',
				path: 'brownpaperbag-comic.png',
				num_comments: 4,
				num_likes: 30,
			}],
		};
	},
	components: {
		PostComp,
	},
};
</script>

<style lang="scss">
#sq-the-feed-empty-img {
	height: 35vh;
	margin-top: 9vh;
	margin-bottom: 3rem;
}

#sq-the-find-creators-btn {
	background-image: linear-gradient(22deg, $mulberry-crayola, $french-rose, $mulberry-crayola);
	margin-top: 1.25rem;
	//box-shadow: 2px 6px 20px 0 rgba($color: $mulberry-crayola, $alpha: 0.5);
}

#sq-the-all-paid-post-tabs {
	width: 100%;
}

#sq-the-all-paid-post-tabs .nav-tabs {
	border: none;
}

#sq-the-all-paid-post-tabs .nav-link {
	padding: 0.75rem 0 0.75rem 0.75rem;
}

</style>
