import api from './api.service';
import handleError from './errorHandler.service';

export default {
	registerUser(name, email, password, password2) {
		return api.post('/public/user', {
			name,
			email,
			password,
			password2,
		}).catch((err) => {
			handleError(err);
		});
	},
	verifyEmail(token) {
		return api.get(`/public/auth/verify-email?token=${token}`)
			.catch((err) => {
				handleError(err);
			});
	},
	loginWithEmail(email, password) {
		return api.post('/public/login', { email, password })
			.catch((err) => {
				handleError(err);
			});
	},
	loginWithGoogle() {
		return api.get('/auth/google')
			.catch((err) => {
				handleError(err);
			});
	},
	logout() {
		return api.get('/private/logout')
			.catch((err) => {
				handleError(err);
			});
	},
	getUserSelf() {
		return api.get('/private/user')
			.catch((err) => {
				handleError(err);
			});
	},
	validate() {
		return api.get('/public/validate')
			.then((res) => (res.data.isValid))
			.catch((err) => {
				handleError(err);
			});
	},
};
