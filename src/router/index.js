import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

// Pages
import HomePage from '../views/HomePage.vue';
import ExplorePage from '../views/ExplorePage.vue';
import LandingPage from '../views/LandingPage.vue';
import PostPage from '../views/PostPage.vue';
import AccountSettingsPage from '../views/AccountSettingsPage.vue';
import CreatorPage from '../views/CreatorPage.vue';
import BecomeCreatorPage from '../views/BecomeCreatorPage.vue';
import PageSettingsPage from '../views/PageSettingsPage.vue';
import VerifyEmailPage from '../views/VerifyEmailPage.vue';
import VerifyEmailSentPage from '../views/VerifyEmailSentPage.vue';
import CreatePostPage from '../views/CreatePostPage.vue';
import EditPostPage from '../views/EditPostPage.vue';
import MessagesPage from '../views/MessagesPage.vue';
import MySquadsPage from '../views/MySquadsPage.vue';
import NotificationsPage from '../views/NotificationsPage.vue';

// Children components
import LoginModal from '../components/LoginModal.vue';
import PageSettingsCreatorInfo from '../components/PageSettingsCreatorInfo.vue';
import PageSettingsSquads from '../components/PageSettingsSquads.vue';
import PageSettingsGoals from '../components/PageSettingsGoals.vue';
import PageSettingsPayments from '../components/PageSettingsPayments.vue';
import PageSettingsCreatorStats from '../components/PageSettingsCreatorStats.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Landing',
		component: LandingPage,
		children: [
			{
				path: 'login',
				component: LoginModal,
				props: { isModalSignUp: false },
			},
			{
				path: 'signup',
				component: LoginModal,
				props: { isModalSignUp: true },
			},
		],
	},
	{
		path: '/feed',
		name: 'Feed',
		component: HomePage,
	},
	{
		path: '/explore',
		name: 'Explore',
		component: ExplorePage,
	},
	{
		path: '/messages',
		name: 'Messages',
		component: MessagesPage,
	},
	{
		path: '/notifications',
		name: 'Notifications',
		component: NotificationsPage,
	},
	{
		path: '/post/:postId',
		name: 'PostPage',
		component: PostPage,
	},
	{
		path: '/creator',
		name: 'CreatorPageSelf',
		component: CreatorPage,
	},
	{
		path: '/creator/start',
		name: 'BecomeCreatorPage',
		component: BecomeCreatorPage,
	},
	{
		path: '/creator/settings',
		name: 'PageSettings',
		component: PageSettingsPage,
		children: [
			{
				path: 'info',
				component: PageSettingsCreatorInfo,
			},
			{
				path: 'squads',
				component: PageSettingsSquads,
				beforeEnter(to, from, next) {
					store.dispatch('fetchAllSquads').finally(() => {
						next();
					});
				},
			},
			{
				path: 'goals',
				component: PageSettingsGoals,
				beforeEnter(to, from, next) {
					store.dispatch('fetchAllGoals').finally(() => {
						next();
					});
				},
			},
			{
				path: 'payments',
				component: PageSettingsPayments,
			},
			{
				path: 'stats',
				component: PageSettingsCreatorStats,
			},
		],
	},
	{
		path: '/creator/:userId',
		name: 'CreatorPage',
		component: CreatorPage,
		beforeEnter(to, from, next) {
			if (to.params.userId === store.state.creator.userId) {
				return next('/creator');
			}
			return next();
		},
	},
	{
		path: '/auth/verify-email/check',
		name: 'VerifyEmailPage',
		component: VerifyEmailPage,
	},
	{
		path: '/auth/verify-email/sent',
		name: 'VerifyEmailSentPage',
		component: VerifyEmailSentPage,
	},
	{
		path: '/user/squads',
		name: 'MySquadsPage',
		component: MySquadsPage,
	},
	{
		path: '/user/settings',
		name: 'AccountsSettingsPage',
		component: AccountSettingsPage,
	},
	{
		path: '/create-post',
		name: 'CreatePostPage',
		component: CreatePostPage,
	},
	{
		path: '/edit-post/:postId',
		name: 'EditPostPage',
		component: EditPostPage,
	},
	// {
	// 	path: '/about',
	// 	name: 'About',
	// 	// route level code-splitting
	// 	// this generates a separate chunk (about.[hash].js) for this route
	// 	// which is lazy-loaded when the route is visited.
	// 	component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
	// },
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (to.hash) return { selector: to.hash };
		if (savedPosition) return savedPosition;
		return { x: 0, y: 0 };
	},
});

// Fetch User and Creator data before entering route
router.beforeEach((to, from, next) => {
	store.dispatch('fetchUser').then(() => {
		store.dispatch('fetchCreator').finally(() => {
			next();
		});
	});
});

export default router;
