import api from './api.service';
import handleError from './errorHandler.service';

export default {
	getAllGoals(userId) {
		return api.get(`/public/creator/goals/${userId}`)
			.catch((err) => handleError(err));
	},
	addNewGoal(goal) {
		return api.post('/private/creator/goal', { ...goal })
			.catch((err) => handleError(err));
	},
	updateGoal(goal) {
		return api.put(`/private/creator/goal/${goal.goalId}`, { ...goal })
			.catch((err) => handleError(err));
	},
	deleteGoal(goalId) {
		return api.delete(`/private/creator/goal/${goalId}`)
			.catch((err) => handleError(err));
	},
	changeGoalType(goalsTypeEarnings) {
		return api.post('/private/creator/goal/change-type', { goalsTypeEarnings })
			.catch((err) => handleError(err));
	},
};
