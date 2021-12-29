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
		const formData = new FormData();
		formData.append('description', post.description);
		formData.append('squadId', post.squadId);
		if (post.type === 'link') {
			formData.append('type', post.type);
			formData.append('link', post.link);
		} else if (post.type === 'image') {
			formData.append('type', post.type);
			formData.append('postImage', post.postImage);
		}
		return api.post('/post', formData, {
			headers: {
				'content-type': 'multipart/form-data',
			},
		}).catch((err) => handleError(err));
	},
	getAllPostsByCreator(creatorUserId) {
		return api.get(`/posts/${creatorUserId}`)
			.catch((err) => handleError(err));
	},
};
