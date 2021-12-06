import api from './api.service';
import handleError from './errorHandler.service';

export default {
	createManualSub(squadId) {
		return api.post('/manualSub', { squadId })
			.catch((err) => handleError(err));
	},
	getTotalManualSubsOfCreatorByUserId(creatorUserId) {
		return api.get(`/public/payments/subscription/manual/${creatorUserId}/total`)
			.catch((err) => handleError(err));
	},
};
