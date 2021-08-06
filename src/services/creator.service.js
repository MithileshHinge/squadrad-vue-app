import api from './api.service';
import handleError from './errorHandler.service';

export default {
	getCreatorSelf() {
		return api.get('/private/creator')
			.catch((err) => handleError(err));
	},
	becomeCreator(pageName, plural, creatingWhat) {
		return api.post('/private/creator', {
			page_name: pageName,
			plural,
			creating_what: creatingWhat,
		}).catch((err) => handleError(err));
	},
};
