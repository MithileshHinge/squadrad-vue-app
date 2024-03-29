import api from './api.service';
import handleError from './errorHandler.service';

export default {
	registerUser(fullName, email, password) {
		return api.post('/user', {
			fullName,
			email,
			password,
		}).catch((err) => handleError(err));
	},
	verifyEmail(token) {
		return api.patch('/user/verify', {
			token,
		}).catch((err) => handleError(err));
	},
	loginWithEmail(email, password) {
		return api.post('/user/login', { email, password })
			.catch((err) => handleError(err));
	},
	loginWithGoogle() {
		return api.get('/auth/google')
			.catch((err) => handleError(err));
	},
	logout() {
		// TODO: should log out even if there is error on server side (case: offline user should be able to logout)
		return api.post('/user/logout')
			.catch((err) => handleError(err));
	},
	validate() {
		return api.get('/public/validate')
			.then((res) => (res.data.isValid))
			.catch((err) => handleError(err));
	},
	getUserSelf() {
		return api.get('/user')
			.catch((err) => handleError(err));
	},
	getUserById(userId) {
		return api.get(`/user/${userId}`)
			.catch((err) => handleError(err));
	},
	updateUser(user) {
		return api.patch('/user', user)
			.catch((err) => handleError(err));
	},
	updateProfilePic(blob) {
		const formData = new FormData();
		formData.append('profilePic', blob);
		return api.put('/user/profile-pic', formData, {
			headers: {
				'content-type': 'multipart/form-data',
			},
		});
	},
	changePassword(oldPassword, newPassword) {
		return api.patch('/user/password', { oldPassword, newPassword })
			.catch((err) => handleError(err));
	},
	deleteUser(password) {
		return api.post('/private/user/delete', { password })
			.catch((err) => handleError(err));
	},
};
