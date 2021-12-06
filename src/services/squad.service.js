import api from './api.service';
import handleError from './errorHandler.service';

export default {
	getAllSquads(userId) {
		return api.get(`/creator/${userId}/squads`)
			.catch((err) => handleError(err));
	},
	addNewSquad(squad) {
		return api.post('/squad', { ...squad })
			.catch((err) => handleError(err));
	},
	updateSquad(squad) {
		return api.patch(`/squad/${squad.squadId}`, { ...squad })
			.catch((err) => handleError(err));
	},
	deleteSquad(squadId) {
		return api.delete(`/private/creator/squad/${squadId}`)
			.catch((err) => handleError(err));
	},
};
