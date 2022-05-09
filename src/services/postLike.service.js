import api from './api.service';
import handleError from './errorHandler.service';

export default {
	checkLiked(postId) {
		return api.get(`/like/${postId}`)
			.catch((err) => handleError(err));
	},
	getTotalLikes(postId) {
		return api.get(`/likes/${postId}`)
			.catch((err) => handleError(err));
	},
	toggleLike(postId) {
		return api.post(`/like/${postId}`)
			.catch((err) => handleError(err));
	},
};
