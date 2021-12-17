import api from './api.service';
import handleError from './errorHandler.service';

export default {
	getPostsFromMyCreators() {
		api.get('/private/fetch-feed')
			.catch((err) => {
				handleError(err);
			});
	},
	createPost(post) {
		return api.post('/post', post)
			.catch((err) => handleError(err));
	},
	getAllPostsByCreator(creatorUserId) {
		return api.get(`/posts/${creatorUserId}`)
			.catch((err) => handleError(err));
	},
};
