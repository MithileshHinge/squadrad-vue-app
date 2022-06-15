import api from './api.service';
import handleError from './errorHandler.service';

export default {
	addComment(postId, text) {
		return api.post(`/comment/post/${postId}`, { text })
			.catch((err) => handleError(err));
	},
	addReply(postId, commentId, text) {
		return api.post(`/comment/post/${postId}`, { text, replyToCommentId: commentId })
			.catch((err) => handleError(err));
	},
	getCommentById(commentId) {
		return api.get(`/comment/${commentId}`)
			.catch((err) => handleError(err));
	},
	getCommentsOnPost(postId) {
		return api.get(`/comments/post/${postId}`)
			.catch((err) => handleError(err));
	},
	countNumCommentsOnPost(postId) {
		return api.get(`/comments/count/post/${postId}`)
			.catch((err) => handleError(err));
	},
	deleteComment(commentId) {
		return api.delete(`/comment/${commentId}`)
			.catch((err) => handleError(err));
	},
};
