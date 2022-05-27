import api from './api.service';
import handleError from './errorHandler.service';

export default {
	createManualSub(squadId) {
		return api.post('/manualSub', { squadId })
			.catch((err) => handleError(err));
	},
	getManualSubByCreatorId(creatorUserId) {
		return api.get(`/manualSub/${creatorUserId}`)
			.catch((err) => handleError(err));
	},
	getAllManualSubs() {
		return api.get('/manualSubs')
			.catch((err) => handleError(err));
	},
	getTotalManualSubsOfCreatorByUserId(creatorUserId) {
		return api.get(`/public/payments/subscription/manual/${creatorUserId}/total`)
			.catch((err) => handleError(err));
	},
	getAllManualSubbedCreatorsInfo() {
		return api.get('/manualSubs/active/creators')
			.catch((err) => handleError(err));
	},
};
