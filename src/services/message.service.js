import tempPP from '@/assets/tushar.png';
import store from '../store';

export default {
	getSupporterInbox() {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({
					status: 200,
					data: [
						{
							creatorUserId: 1,
							pageName: 'MHinges',
							profilePicSrc: tempPP,
							lastMessage: {
								text: 'This was MHinges last message',
								senderUserId: 1,
								timestamp: '2h',
								new: true,
							},
						},
						{
							creatorUserId: 2,
							pageName: 'CGP Grey',
							profilePicSrc: tempPP,
							lastMessage: {
								text: 'This was CGP Grey last message',
								senderUserId: 2,
								timestamp: '1h',
								new: false,
							},
						},
					],
				});
			}, 500);
		});
	},
	fetchAllMessagesWithUser(userId) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({
					status: 200,
					data: [
						{
							messageId: 1,
							text: 'Hello this is his first message',
							senderUserId: userId,
							date: '13 November',
							time: '10:20',
						},
						{
							messageId: 2,
							text: 'Hello this is my message',
							senderUserId: store.state.user.userId,
							date: '15 November',
							time: '17:42',
						},
					],
				});
			}, 500);
		});
	},
	sendMessage({ text, receiverUserId, isFromCreatorInbox }) {
		console.log(`message ${text} sent to roomId: ${receiverUserId}, creator: ${isFromCreatorInbox}`);
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({
					status: 200,
					data: {
						messageId: Math.floor(Math.random() * 1000),
						text,
						senderUserId: store.state.user.userId,
						receiverUserId,
						isFromCreatorInbox,
						date: new Date().toLocaleDateString('default', { day: 'numeric', month: 'long' }),
						time: new Date().toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' }),
					},
				});
			}, 500);
		});
	},
};
