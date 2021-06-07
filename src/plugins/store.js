export default {
	debug: !(process.env.NODE_ENV === 'production'),
	state: {
		user: null,
	},
	updateUser(user) {
		if (this.debug) {
			console.log(`User update ${user}`);
		}
		this.state.user = user;
	},
};
