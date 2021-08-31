import api from './api.service';
import handleError from './errorHandler.service';

export default {
	getAllSquads(userId) {
		return api.get(`/public/creator/squads/${userId}`)
			.catch((err) => handleError(err));
	},
	addNewSquad(squad) {
		return api.post('/private/creator/squad', { ...squad })
			.catch((err) => handleError(err));
	},
	updateSquad(squad) {
		return api.put(`/private/creator/squad/${squad.squadId}`, { ...squad })
			.catch((err) => handleError(err));
	},
	deleteSquad(squadId) {
		return api.delete(`/private/creator/squad/${squadId}`)
			.catch((err) => handleError(err));
	},
};
