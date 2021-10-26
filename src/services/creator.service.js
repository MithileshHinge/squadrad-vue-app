import api from './api.service';
import handleError from './errorHandler.service';

export default {
	getCreatorSelf() {
		return api.get('/private/creator')
			.catch((err) => handleError(err));
	},
	getCreatorById(userId) {
		return api.get(`/public/creator/${userId}`)
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
		return api.put('/private/creator', creator)
			.catch((err) => handleError(err));
	},
};
