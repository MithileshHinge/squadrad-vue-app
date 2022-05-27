import api from './api.service';
import handleError from './errorHandler.service';

export default {
	fetchMessageRooms({ isFromCreatorInbox }) {
		return api.get(`/messages/${isFromCreatorInbox ? 'creator/' : ''}rooms`)
			.catch((err) => handleError(err));
	},
	fetchAllMessagesWithUser({ userId, isFromCreatorInbox }) {
		return api.get(`/messages/${isFromCreatorInbox ? 'creator/' : ''}${userId}`)
			.catch((err) => handleError(err));
	},
	sendMessage({ text, receiverUserId, isFromCreatorInbox }) {
		return api.post(`/messages/${isFromCreatorInbox ? 'creator/' : ''}${receiverUserId}`, { text })
			.catch((err) => handleError(err));
	},
};
