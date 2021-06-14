import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: {},
		creator: {},
	},
	mutations: {
		updateUser(state, user) {
			state.user = user;
		},
		updateCreator(state, creator) {
			state.creator = creator;
		},
	},
});
