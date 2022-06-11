<template>
	<div>
		<b-row no-gutters align-h="center">
			<b-col sm="0" lg="1" class="d-none d-lg-block"/>
			<b-col sm="0" lg="2" class="d-none d-lg-block pt-5 mx-5">
				<b-card class="sq-card-user-info-flat sq-card-flat-lg">
					<b-card-img :src="getProfilePicSrc($store.state.user.profilePicSrc)" class="rounded-circle mb-2 sq-card-img" top/>
					<b-card-title :title="$store.state.user.fullName" class="sq-card-heading"/>
					<b-card-body class="p-0">
						<div class="sq-text text-center p-2">My Creators</div>
						<div class="sq-card-creators-list">
							<UserList v-if="creators && creators.length > 0" :loading="false" size="sm" :users="creators.map((creator) => ({ userId: creator.userId, name: creator.pageName, profilePicSrc: creator.profilePicSrc }))" :showSubtext="false" :showBorders="false" @click="$router.push(`/creator/${$event.userId}`)"/>
							<div v-else class="sq-text sq-subtext p-3">You are not a member of any squad</div>
						</div>
					</b-card-body>
				</b-card>
			</b-col>
			<b-col sm="12" lg="4">
				<b-tabs v-if="posts && posts.length > 0" id="sq-the-all-paid-post-tabs" align="left">
					<b-tab title="All posts" title-item-class="sq-nav-item">
						<div class="sq-card-flat sq-card-flat-lg">
							<div class="pt-3 pb-1 px-3">
								<PostComp v-for="{ creator, squad, squadNo, totalSquads, ...post } in posts" :key="post.id" :post="post" :creator="creator" :squad="squad" :squadNo="squadNo" :totalSquads="totalSquads"></PostComp>
							</div>
						</div>
					</b-tab>
					<b-tab title="Paid posts" title-item-class="sq-nav-item">
						<div class="sq-card-flat sq-card-flat-lg">
							<div class="pt-3 pb-1 px-3">
								<PostComp v-for="{ creator, squad, squadNo, totalSquads, ...post } in paidPosts" :key="post.id" :post="post" :creator="creator" :squad="squad" :squadNo="squadNo" :totalSquads="totalSquads"></PostComp>
							</div>
						</div>
					</b-tab>
				</b-tabs>
				<div v-else-if="posts && posts.length === 0">
					<b-img class="sq-empty-state-img-full" src="@/assets/feed-empty-state.jpg"></b-img>
					<div class="sq-empty-state-text sq-text text-center">Support creators to see their posts in your feed</div>
					<b-button id="sq-the-find-creators-btn" class="sq-btn sq-btn-cta sq-btn-empty-state" to="/explore">Find creators you may know</b-button>
				</div>
			</b-col>
			<b-col sm="0" lg="3">
			</b-col>
		</b-row>
	</div>
</template>

<script>
import PostComp from '@/components/PostComp.vue';
import UserList from '../components/UserList.vue';
import postService from '../services/post.service';
import manualSubService from '../services/manualSubs.service';
import { forEachAsync } from '../common/helpers';
import manualSubStatuses from '../common/manualSubStatuses';
import creatorService from '../services/creator.service';
import squadService from '../services/squad.service';
import getProfilePicSrc from '../common/getProfilePicSrc';

export default {
	data() {
		return {
			getProfilePicSrc,
			posts: null,
			creators: [],
		};
	},
	computed: {
		paidPosts() {
			return this.posts.filter((post) => (post.squad !== undefined && post.locked === false));
		},
	},
	components: {
		PostComp,
		UserList,
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
					this.posts = feed;
				}
			}).catch((err) => {
				this.$bvToast.toast((err.response.msg, {
					noCloseButton: true,
					variant: 'danger',
					toaster: 'b-toaster-bottom-center',
				}));
			});
		},
		async fetchCreators() {
			try {
				const res = await manualSubService.getAllManualSubbedCreatorsInfo();
				if (res && res.status === 200) {
					this.creators = res.data;
				}
			} catch (err) {
				console.log(err);
			}
		},
	},
	mounted() {
		this.populateFeed();
		this.fetchCreators();

		if (document.getElementById('myRzpScript')) return;
		const src = 'https://checkout.razorpay.com/v1/checkout.js';
		const script = document.createElement('script');
		script.setAttribute('src', src);
		script.setAttribute('type', 'text/javascript');
		script.setAttribute('id', 'myRzpScript');
		document.head.appendChild(script);
	},
	beforeDestroy() {
		const el = document.getElementById('myRzpScript');
		if (el) el.remove();
	},
	watch: {
		// eslint-disable-next-line quote-props
		'$route': 'populateFeed',
	},
};
</script>

<style lang="scss">

#sq-the-find-creators-btn {
	background-image: linear-gradient(22deg, $mulberry-crayola, $french-rose, $mulberry-crayola);
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

.sq-card-user-info-flat {
	background: $my-color-light;
	border: 1px solid $my-color-gray5;
}

.sq-card-creators-list {
	background: $my-color-gray7;
	border-radius: 0.5rem;
	border: 1px solid rgba(0, 0, 0, 0.125);
}

</style>
