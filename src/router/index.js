import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../views/HomePage.vue';
import LandingPage from '../views/LandingPage.vue';
import PostPage from '../views/PostPage.vue';
import CreatorPage from '../views/CreatorPage.vue';
import PageSettingsPage from '../views/PageSettingsPage.vue';
import PageSettingsCreatorInfo from '../components/PageSettingsCreatorInfo.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Landing',
		component: LandingPage,
	},
	{
		path: '/feed',
		name: 'Feed',
		component: HomePage,
	},
	{
		path: '/post',
		name: 'PostPage',
		component: PostPage,
	},
	{
		path: '/creator',
		name: 'CreatorPage',
		component: CreatorPage,
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
		],
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
});

export default router;
