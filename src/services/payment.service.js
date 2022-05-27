import api from './api.service';
import handleError from './errorHandler.service';

export default {
	getRzpOrder(squadId) {
		return api.get(`/payment/order/${squadId}`)
			.catch((err) => handleError(err));
	},
	paymentSuccessful({ rzpTransactionId, rzpOrderId, rzpSignature }) {
		console.log(rzpSignature);
		console.log(rzpOrderId);
		console.log(rzpTransactionId);
		return api.post('/payment/success', { rzpTransactionId, rzpOrderId, rzpSignature })
			.catch((err) => handleError(err));
	},
	getAllPaymentsToCreator() {
		return api.get('/payments')
			.catch((err) => handleError(err));
	},
};
