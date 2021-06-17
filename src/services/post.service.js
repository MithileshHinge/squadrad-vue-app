import api from './api.service';
import handleError from './errorHandler.service';

export default {
	getPostsFromMyCreators() {
		api.get('/private/fetch-feed')
			.catch((err) => {
				handleError(err);
			});
	},
};