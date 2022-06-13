import api from './api.service';
import handleError from './errorHandler.service';

export default {
	fetchNotifs() {
		return api.get('/notifs')
			.catch((err) => handleError(err));
	},
	fetchIsUnseenNotifs() {
		return api.get('/notifs/unseen/check')
			.catch((err) => handleError(err));
	},
};
