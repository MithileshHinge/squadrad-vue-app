import api from './api.service';
import handleError from './errorHandler.service';

export default {
	addComment(postId, text) {
		return api.post(`/comment/${postId}`, { text })
			.catch((err) => handleError(err));
	},
	addReply(postId, commentId, text) {
		return api.post(`/comment/${postId}`, { text, replyToCommentId: commentId })
			.catch((err) => handleError(err));
	},
	getCommentsOnPost(postId) {
		return api.get(`/comments/${postId}`)
			.catch((err) => handleError(err));
	},
	countNumCommentsOnPost(postId) {
		return api.get(`/comments/count/${postId}`)
			.catch((err) => handleError(err));
	},
};
