import api from './api.service';
import handleError from './errorHandler.service';

export default {
	landingTrigger(ref) {
		return api.get(`/beacon/landing/${ref}`)
			.catch((err) => handleError(err));
	},
};
