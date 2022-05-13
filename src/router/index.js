import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

// Pages
import HomePage from '../views/HomePage.vue';
import LandingPage from '../views/LandingPage.vue';
import PostPage from '../views/PostPage.vue';
import AccountSettingsPage from '../views/AccountSettingsPage.vue';
import CreatorPage from '../views/CreatorPage.vue';
import BecomeCreatorPage from '../views/BecomeCreatorPage.vue';
import PageSettingsPage from '../views/PageSettingsPage.vue';
import VerifyEmailPage from '../views/VerifyEmailPage.vue';
import VerifyEmailSentPage from '../views/VerifyEmailSentPage.vue';
import CreatePostPage from '../views/CreatePostPage.vue';

// Children components
import LoginModal from '../components/LoginModal.vue';
import PageSettingsCreatorInfo from '../components/PageSettingsCreatorInfo.vue';
import PageSettingsSquads from '../components/PageSettingsSquads.vue';
import PageSettingsGoals from '../components/PageSettingsGoals.vue';

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
		path: '/post/:postId',
		name: 'PostPage',
		component: PostPage,
	},
	{
		path: '/creator',
		name: 'CreatorPage',
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
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
	},
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
