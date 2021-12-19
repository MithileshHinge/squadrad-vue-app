import api from './api.service';
import handleError from './errorHandler.service';

export default {
	getCreatorSelf() {
		return api.get('/creator')
			.catch((err) => handleError(err));
	},
	getCreatorById(userId) {
		return api.get(`/creator/${userId}`)
			.catch((err) => handleError(err));
	},
	becomeCreator(pageName, isPlural, bio) {
		return api.post('/creator', {
			pageName,
			isPlural,
			bio,
		}).catch((err) => handleError(err));
	},
	updateCreator(creator) {
		return api.patch('/creator', creator)
			.catch((err) => handleError(err));
	},
	updateCreatorProfilePic(blob) {
		const formData = new FormData();
		formData.append('profilePic', blob);
		return api.put('/creator/profile-pic', formData, {
			headers: {
				'content-type': 'multipart/form-data',
			},
		});
	},
};
