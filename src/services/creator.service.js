import api from './api.service';
import handleError from './errorHandler.service';

export default {
	getCreatorSelf() {
		return api.get('/private/creator')
			.catch((err) => handleError(err));
	},
};
