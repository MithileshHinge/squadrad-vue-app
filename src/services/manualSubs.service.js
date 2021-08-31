import api from './api.service';
import handleError from './errorHandler.service';

export default {
	createManualSub(creatorUserId, squadId) {
		return api.post(`/private/payments/subscription/manual/${creatorUserId}/${squadId}`)
			.catch((err) => handleError(err));
	},
};
