import Vue from 'vue';
import Vuex from 'vuex';
import userService from '@/services/user.service';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: {
			user_id: 0,
			email: '',
			name: '',
			profile_pic: '',
			email_verified: null,
			deactivated: null,
			blocked: null,
		},
		creator: {
			creator_id: 0,
			user_id: 0,
			page_name: '',
			plural: null,
			creating_what: '',
			profile_pic: '',
			cover_pic: '',
			about: '',
			intro_video: '',
			slug: '',
			supporters_visibility: null,
			earnings_visibility: null,
			otp_visibility: null,
			thanks_message: '',
			goals_type_earnings: null,
			youtube_link: '',
			instagram_link: '',
			facebook_link: '',
			review_submitted: null,
			review_submit_timestamp: '',
			review_accepted: null,
			deactivated: null,
			blocked: null,
		},
	},
	mutations: {
		updateUser(state, user) {
			state.user = { ...state.user, ...user };
		},
		updateCreator(state, creator) {
			state.creator = creator;
		},
	},
	actions: {
		async fetchUser({ commit }) {
			try {
				const resUser = await userService.getUserSelf();
				if (resUser && resUser.status === 200) {
					await commit('updateUser', resUser.data.user);
				}
			} catch (err) {
				console.log(err);
			}
		},
		async updateUser({ commit }, user) {
			try {
				const res = await userService.updateUser(user);
				if (res && res.status === 200) {
					await commit('updateUser', user);
				}
			} catch (err) {
				console.error(err);
			}
		},
	},
});
