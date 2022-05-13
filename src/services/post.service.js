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
		let postUrl = '/post';
		const formData = new FormData();
		formData.append('description', post.description);
		formData.append('squadId', post.squadId);
		if (post.link && post.link.trim().length > 2) {
			formData.append('link', post.link);
		} else if (post.type === 'image') {
			formData.append('postImage', post.postImage);
			postUrl = '/post/image';
		} else if (post.type === 'video') {
			formData.append('postVideo', post.postVideo);
			postUrl = '/post/video';
		}
		return api.post(postUrl, formData, {
			headers: {
				'content-type': 'multipart/form-data',
			},
		}).catch((err) => handleError(err));
	},
	getAllPostsByCreator(creatorUserId) {
		return api.get(`/posts/${creatorUserId}`)
			.catch((err) => handleError(err));
	},
	getPostById(postId) {
		return api.get(`/post/${postId}`)
			.catch((err) => handleError(err));
	},
};
