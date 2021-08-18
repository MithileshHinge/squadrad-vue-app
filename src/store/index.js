import Vue from 'vue';
import Vuex from 'vuex';
import userService from '@/services/user.service';
import creatorService from '@/services/creator.service';
import squadService from '@/services/squad.service';

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
		squads: [],
	},
	mutations: {
		updateUser(state, user) {
			state.user = { ...state.user, ...user };
		},
		updateCreator(state, creator) {
			state.creator = { ...state.creator, ...creator };
		},
		updateAllSquads(state, squads) {
			state.squads = squads;
		},
		addNewSquad(state, squad) {
			state.squads.push(squad);
		},
		updateSquad(state, squad) {
			const i = state.squads.findIndex((s) => s.squadId === squad.squadId);
			if (i >= 0) state.squads[i] = { ...state.squad, ...squad };
		},
		deleteSquad(state, squadId) {
			const i = state.squads.findIndex((s) => s.squadId === squadId);
			if (i >= 0) state.squads.splice(i, 1);
		},
	},
	actions: {
		async fetchUser({ commit }) {
			try {
				const resUser = await userService.getUserSelf();
				if (resUser && resUser.status === 200) {
					await commit('updateUser', resUser.data.user);
				} else {
					console.log(resUser);
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
				} else {
					console.log(res);
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
				} else {
					console.log(resCreator);
				}
			} catch (err) {
				console.log(err);
			}
		},
		async updateCreator({ commit }, creator) {
			try {
				const res = await creatorService.updateCreator(creator);
				if (res && res.status === 200) {
					await commit('updateCreator', creator);
				} else {
					console.log(res);
				}
			} catch (err) {
				console.error(err);
			}
		},
		async addNewSquad({ commit }, squad) {
			try {
				const res = await squadService.addNewSquad(squad);
				if (res && res.status === 200) {
					await commit('addNewSquad', res.data.squad);
				} else {
					console.log(res);
				}
			} catch (err) {
				console.error(err);
			}
		},
		async fetchAllSquads({ commit, state }) {
			try {
				const resSquads = await squadService.getAllSquads(state.user.userId);
				if (resSquads && resSquads.status === 200) {
					await commit('updateAllSquads', resSquads.data);
				} else {
					console.log(resSquads);
				}
			} catch (err) {
				console.error(err);
			}
		},
		async updateSquad({ commit }, squad) {
			try {
				const res = await squadService.updateSquad(squad);
				if (res && res.status === 200) {
					await commit('updateSquad', squad);
				} else {
					console.log(res);
				}
			} catch (err) {
				console.error(err);
			}
		},
		async deleteSquad({ commit }, squadId) {
			try {
				const res = await squadService.deleteSquad(squadId);
				if (res && res.status === 200) {
					await commit('deleteSquad', squadId);
				} else {
					console.log(res);
				}
			} catch (err) {
				console.error(err);
			}
		},
	},
});
