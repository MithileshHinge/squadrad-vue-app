import api from './api.service';
import handleError from './errorHandler.service';

export default {
	joinWaitlist(email) {
		return api.post('/waitlist', { email })
			.catch((err) => handleError(err));
	},
	submitFeatures(email, features) {
		return api.post('/waitlist', { email, features })
			.catch((err) => handleError(err));
	},
};
