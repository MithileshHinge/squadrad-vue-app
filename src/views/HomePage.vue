<template>
	<div>
		<b-tabs v-if="posts && posts.length > 0" id="sq-the-all-paid-post-tabs" align="left" nav-wrapper-class="sq-shadow">
			<b-tab title="All posts" title-item-class="sq-nav-item">
				<div class="sq-background-gray">
					<div class="pt-3">
						<PostComp v-for="{ creator, squad, squadNo, totalSquads, ...post } in posts" :key="post.id" :post="post" :creator="creator" :squad="squad" :squadNo="squadNo" :totalSquads="totalSquads"></PostComp>
					</div>
				</div>
			</b-tab>
			<b-tab title="Paid posts" title-item-class="sq-nav-item">
				<div class="sq-background-gray">
					<div class="pt-3">
						<PostComp v-for="{ creator, squad, squadNo, totalSquads, ...post } in paidPosts" :key="post.id" :post="post" :creator="creator" :squad="squad" :squadNo="squadNo" :totalSquads="totalSquads"></PostComp>
					</div>
				</div>
			</b-tab>
		</b-tabs>
		<div v-else-if="posts && posts.length === 0">
			<b-img id="sq-the-feed-empty-img" src="@/assets/feed-empty-state.jpg"></b-img>
			<div class="sq-empty-state-text sq-text text-center">Support creators to see their posts in your feed</div>
			<b-button id="sq-the-find-creators-btn" class="sq-btn sq-btn-cta" to="/explore">Find creators you may know</b-button>
		</div>
	</div>
</template>

<script>
import PostComp from '@/components/PostComp.vue';
import postService from '../services/post.service';
import manualSubService from '../services/manualSubs.service';
import { forEachAsync } from '../common/helpers';
import manualSubStatuses from '../common/manualSubStatuses';
import creatorService from '../services/creator.service';
import squadService from '../services/squad.service';

export default {
	data() {
		return {
			posts: undefined,
		};
	},
	computed: {
		paidPosts() {
			return this.posts.filter((post) => (post.squad !== undefined && post.locked === false));
		},
	},
	components: {
		PostComp,
	},
	methods: {
		populateFeed() {
			const feed = [];
			manualSubService.getAllManualSubs().then(async (resManualSubs) => {
				if (resManualSubs && resManualSubs.status === 200) {
					await forEachAsync(resManualSubs.data, async (manualSub) => {
						if (manualSub.subscriptionStatus === manualSubStatuses.ACTIVE) {
							const resCreator = await creatorService.getCreatorById(manualSub.creatorUserId);
							const resSquads = await squadService.getAllSquads(manualSub.creatorUserId);
							const resPosts = await postService.getAllPostsByCreator(manualSub.creatorUserId);

							if (resCreator && resSquads && resPosts && resCreator.status === 200 && resSquads.status === 200 && resPosts.status === 200) {
								const creator = resCreator.data;
								const squads = resSquads.data;
								squads.sort((a, b) => a.amount - b.amount);
								const postsOfCreator = resPosts.data.map((post) => ({
									...post,
									creator,
									squad: squads.find((s) => s.squadId === post.squadId),
									squadNo: squads.findIndex((s) => s.squadId === post.squadId),
									totalSquads: squads.length,
								}));
								feed.push(...postsOfCreator);
							}
						}
					});
				}
			}).catch((err) => {
				this.$bvToast.toast((err.response.msg, {
					noCloseButton: true,
					variant: 'danger',
					toaster: 'b-toaster-bottom-center',
				}));
			});
			this.posts = feed;
		},
	},
	mounted() {
		this.populateFeed();
	},
	watch: {
		// eslint-disable-next-line quote-props
		'$route': 'populateFeed',
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
