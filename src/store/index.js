import Vue from 'vue';
import Vuex from 'vuex';
import userService from '@/services/user.service';
import creatorService from '@/services/creator.service';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: {
			userId: 0,
			email: '',
			name: '',
			profilePic: '',
			emailVerified: null,
			deactivated: null,
			blocked: null,
		},
		creator: {
			creatorId: 0,
			userId: 0,
			pageName: '',
			plural: null,
			creatingWhat: '',
			profilePic: '',
			coverPic: '',
			about: '',
			introVideo: '',
			slug: '',
			supportersVisibility: null,
			earningsVisibility: null,
			otpVisibility: null,
			thanksMessage: '',
			goalsTypeEarnings: null,
			youtubeLink: '',
			instagramLink: '',
			facebookLink: '',
			reviewSubmitted: null,
			reviewSubmitTimestamp: '',
			reviewAccepted: null,
			deactivated: null,
			blocked: null,
		},
	},
	mutations: {
		updateUser(state, user) {
			state.user = { ...state.user, ...user };
		},
		updateCreator(state, creator) {
			state.creator = { ...state.creator, ...creator };
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
		async fetchCreator({ commit }) {
			try {
				const resCreator = await creatorService.getCreatorSelf();
				if (resCreator && resCreator.status === 200) {
					await commit('updateCreator', resCreator.data.creator);
				}
			} catch (err) {
				console.log(err);
			}
		},
	},
});
