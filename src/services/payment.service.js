import api from './api.service';
import handleError from './errorHandler.service';

export default {
	createPaymentRecord({ rzpTransactionId, rzpOrderId, rzpSignature }) {
		console.log(rzpSignature);
		console.log(rzpOrderId);
		console.log(rzpTransactionId);
		return api.post('/private/payments/payment', { rzpTransactionId, rzpOrderId, rzpSignature })
			.catch((err) => handleError(err));
	},
};
