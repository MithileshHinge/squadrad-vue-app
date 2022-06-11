/* eslint-disable prefer-object-spread */
import Vue from 'vue';
import Vuex from 'vuex';
import userService from '@/services/user.service';
import creatorService from '@/services/creator.service';
import squadService from '@/services/squad.service';
import goalService from '@/services/goal.service';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: {
			userId: 0,
			email: '',
			fullName: '',
			profilePicSrc: '',
			emailVerified: null,
			deactivated: null,
			blocked: null,
		},
		creator: {
			userId: 0,
			pageName: '',
			isPlural: null,
			bio: '',
			profilePicSrc: '',
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
			deactivated: null,
			blocked: null,
		},
		squads: [],
		goals: [],
		monthlyIncome: 0,
		totalMembers: 0,
	},
	mutations: {
		resetState(state) {
			state.user = {
				userId: 0,
				email: '',
				fullName: '',
				profilePicSrc: '',
				emailVerified: null,
				deactivated: null,
				blocked: null,
			};
			state.creator = {
				userId: 0,
				pageName: '',
				isPlural: null,
				bio: '',
				profilePicSrc: '',
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
				deactivated: null,
				blocked: null,
			};
			state.squads = [];
			state.goals = [];
			state.monthlyIncome = 0;
			state.totalMembers = 0;
		},
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
			if (i >= 0) Object.assign(state.squads[i], squad);
		},
		deleteSquad(state, squadId) {
			const i = state.squads.findIndex((s) => s.squadId === squadId);
			if (i >= 0) state.squads.splice(i, 1);
		},
		updateAllGoals(state, goals) {
			state.goals = goals;
		},
		addNewGoal(state, goal) {
			state.goals.push(goal);
		},
		updateGoal(state, goal) {
			const i = state.goals.findIndex((g) => g.goalId === goal.goalId);
			if (i >= 0) Object.assign(state.goals[i], goal);
		},
		deleteGoal(state, goalId) {
			const i = state.goals.findIndex((g) => g.goalId === goalId);
			if (i >= 0) state.goals.splice(i, 1);
		},
		updateMonthlyIncome(state, monthlyIncome) {
			state.monthlyIncome = monthlyIncome;
		},
		updateTotalMembers(state, totalMembers) {
			state.totalMembers = totalMembers;
		},
	},
	actions: {
		async fetchUser({ commit }) {
			try {
				const resUser = await userService.getUserSelf();
				if (resUser && resUser.status === 200) {
					await commit('updateUser', resUser.data);
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
		async logoutUser({ commit }) {
			try {
				const res = await userService.logout();
				if (res && res.status === 200) {
					await commit('resetState');
				}
			} catch (err) {
				console.log(err);
			}
		},
		async fetchCreator({ commit }) {
			try {
				const resCreator = await creatorService.getCreatorSelf();
				if (resCreator && resCreator.status === 200) {
					await commit('updateCreator', resCreator.data);
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
					await commit('addNewSquad', res.data);
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
		async addNewGoal({ commit }, goal) {
			try {
				const res = await goalService.addNewGoal(goal);
				if (res && res.status === 200) {
					await commit('addNewGoal', res.data);
				} else {
					console.log(res);
				}
			} catch (err) {
				console.error(err);
			}
		},
		async fetchAllGoals({ commit, state }) {
			try {
				const resGoals = await goalService.getAllGoals(state.user.userId);
				if (resGoals && resGoals.status === 200) {
					await commit('updateAllGoals', resGoals.data.goals);
					await commit('updateMonthlyIncome', resGoals.data.monthlyIncome);
					await commit('updateTotalMembers', resGoals.data.totalMembers);
				} else {
					console.log(resGoals);
				}
			} catch (err) {
				console.error(err);
			}
		},
		async updateGoal({ commit }, goal) {
			try {
				const res = await goalService.updateGoal(goal);
				if (res && res.status === 200) {
					await commit('updateGoal', goal);
				} else {
					console.log(res);
				}
			} catch (err) {
				console.error(err);
			}
		},
		async deleteGoal({ commit }, goalId) {
			try {
				const res = await goalService.deleteGoal(goalId);
				if (res && res.status === 200) {
					await commit('deleteGoal', goalId);
				} else {
					console.log(res);
				}
			} catch (err) {
				console.error(err);
			}
		},
	},
});
