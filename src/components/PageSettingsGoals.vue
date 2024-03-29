<template>
	<div>
		<div class="sq-page-title">Goals</div>
		<b-container class="p-0" fluid>
			<b-row no-gutters align-h="center">
				<b-card class="sq-card-flat sq-card mb-4">
					<b-form-group class="text-left">
						<label class="sq-form-label m-0" v-helptext="'<strong>Earnings based</strong><br>Set goals for your monthly income<br><strong>Community based</strong><br>Set goals for your total number of squad members'">Goal type</label>
						<b-form-radio name="goalType" :value="true" v-model="isGoalsTypeEarningsChecked" @change="confirmChangeGoalType">Earnings based</b-form-radio>
						<b-form-radio name="goalType" :value="false" v-model="isGoalsTypeEarningsChecked" @change="confirmChangeGoalType">Community based</b-form-radio>
					</b-form-group>
					<!--div class="sq-text">All goals must be of the same type. Changing the goal type will require deleting all exisiting goals.</div-->
					<div class="sq-text">Goal type is applied to all goals. Changing the goal type will update all your goals to reflect the change</div>
				</b-card>
			</b-row>
			<b-row no-gutters align-h="center">
				<b-card class="sq-card cursor-pointer" @click="addGoal">
					<b-row no-gutters align-h="center">
						<b-icon-plus font-scale="2" class="sq-muted"/>
					</b-row>
					<b-card-text class="sq-text text-center mt-2">Add new goal</b-card-text>
				</b-card>
			</b-row>
			<b-row no-gutters align-h="center">
				<b-col cols="12">
					<div v-for="goal in goals" :key="goal.goalId" class="mt-3 mx-2">
						<GoalCard :goal="goal" edit @edit="editGoal(goal)" @delete="deleteGoal(goal)" @archive="setArchivedGoal(goal.goalId, true)" @unarchive="setArchivedGoal(goal.goalId, false)"/>
					</div>
				</b-col>
			</b-row>
			<div style="height: 1.5rem"/>
		</b-container>
		<CustomModal modalId="sq-the-modal-edit-goal" :modalTitle="isEditModal ? 'Edit goal' : 'Add new goal'">
			<b-form @submit.prevent="onSubmit">
				<FormInputGroup modal label="Goal title" v-model="goalForm.title" :validationModel="$v.goalForm.title"
					:invalidFeedbacks="{
						required: 'Please set a title for your goal',
						maxLength: 'Exceeded max character limit',
					}"
				/>
				<b-form-group class="align-items-center" label="Goal description" label-class="sq-text" label-align="left">
					<b-form-textarea class="sq-modal-form-textarea sq-form-textarea" v-model="goalForm.description" placeholder="Tell your fans about your plans after reaching the goal" rows="3" size="sm"/>
					<b-form-invalid-feedback v-if="!$v.goalForm.description.maxLength" class="sq-form-invalid-feedback">Exceeded max character limit</b-form-invalid-feedback>
				</b-form-group>
				<FormInputGroup v-if="$store.state.creator.goalsTypeEarnings" type="number" number modal label="Monthly income amount" v-model="goalForm.goalNumber" :validationModel="$v.goalForm.goalNumber" numeric
					:invalidFeedbacks="{
						default: 'Please enter a valid goal amount for your monthly income',
					}"
				/>
				<FormInputGroup v-else modal label="Total squad members" type="number" number v-model="goalForm.goalNumber" :validationModel="$v.goalForm.goalNumber" numeric
					:invalidFeedbacks="{
						default: 'Please enter a valid number of total squad members to reach',
					}"
				/>
				<ButtonSubmit modal :isProcessing="isSaving" :isProcessed="isSaved" :buttonText="isEditModal ? 'Save goal' : 'Add goal'" :buttonTextDone="isEditModal ? 'Goal updated' : 'Goal added'"/>
			</b-form>
		</CustomModal>
		<!--CustomModal modalId="sq-the-modal-change-goal-type" modalTitle="Confirm changing goal type?" title-class="sq-card-heading" @hide="cancelChangeGoalType">
			<div>
				<div class="sq-text mb-2">
					You cannot have both Earnings-based and Community-based goals at the same time. All existing goals will be deleted. This action cannot be undone. Do you wish to continue?
				</div>
				<ButtonSubmit modal :isProcessing="isChanging" :isProcessed="isChanged" buttonText="Confirm delete" buttonTextDone="Goal type changed" @click="confirmChangeGoalType"/>
			</div>
		</CustomModal-->
		<CustomModal modalId="sq-the-modal-delete-goal" modalTitle="Confirm delete goal?">
			<div>
				<div class="sq-text mb-2">
					This action cannot be undone. You can choose to hide the goal temporarily from your page instead. Are you sure you want to delete this goal?
				</div>
				<ButtonSubmit modal :isProcessing="isDeleting" :isProcessed="isDeleted" buttonText="Confirm delete" buttonTextDone="Goal deleted" @click="confirmDeleteGoal"/>
			</div>
		</CustomModal>
	</div>
</template>

<script>
import {
	required,
	maxLength,
	numeric,
} from 'vuelidate/lib/validators';
import GoalCard from './GoalCard.vue';
import CustomModal from './CustomModal.vue';
import FormInputGroup from './FormInputGroup.vue';
import ButtonSubmit from './ButtonSubmit.vue';

export default {
	data() {
		return {
			goalForm: {
				goalId: undefined,
				title: '',
				description: '',
				goalNumber: undefined,
			},
			isGoalsTypeEarningsChecked: this.$store.state.creator.goalsTypeEarnings,
			isEditModal: false,
			isSaved: false,
			isSaving: false,
			isChanging: false,
			isChanged: false,
			isDeleting: false,
			isDeleted: false,

		};
	},
	computed: {
		goals() {
			const { goals } = this.$store.state;
			return goals.sort((a, b) => a.goalNumber > b.goalNumber);
		},
	},
	methods: {
		/* changeGoalType() {
			if (this.goals.length > 0) {
				this.isChanged = false;
				this.isChanging = false;
				this.$bvModal.show('sq-the-modal-change-goal-type');
			} else {
				this.confirmChangeGoalType();
			}
		}, */
		async confirmChangeGoalType() {
			this.isChanging = true;
			this.isChanged = false;
			await this.$store.dispatch('updateCreator', { goalsTypeEarnings: this.isGoalsTypeEarningsChecked });
			this.isChanging = false;
			this.isChanged = true;
			this.$bvModal.hide('sq-the-modal-change-goal-type');
		},
		/* cancelChangeGoalType(event) {
			if (event.trigger !== 'event') {
				this.isGoalsTypeEarningsChecked = this.$store.state.creator.goalsTypeEarnings;
			}
		}, */
		addGoal() {
			this.goalForm = {
				goalId: undefined,
				title: '',
				description: '',
				goalNumber: undefined,
			};
			this.isEditModal = false;
			this.isSaved = false;
			this.$v.goalForm.$reset();
			this.$bvModal.show('sq-the-modal-edit-goal');
		},
		editGoal(goal) {
			this.goalForm = { ...goal };
			this.isEditModal = true;
			this.isSaved = false;
			this.$v.goalForm.$reset();
			this.$bvModal.show('sq-the-modal-edit-goal');
		},
		deleteGoal(goal) {
			this.isDeleted = false;
			this.goalForm.goalId = goal.goalId;
			this.$bvModal.show('sq-the-modal-delete-goal');
		},
		async confirmDeleteGoal() {
			this.isDeleting = true;
			this.isDeleted = false;
			await this.$store.dispatch('deleteGoal', this.goalForm.goalId);
			this.isDeleting = false;
			this.isDeleted = true;
			this.$bvModal.hide('sq-the-modal-delete-goal');
		},
		setArchivedGoal(goalId, archived) {
			this.$store.dispatch('updateGoal', { goalId, archived }).then(() => {
				this.$bvToast.toast(archived ? 'Goal is hidden from page' : 'Goal is shown on page', {
					noCloseButton: true,
					variant: 'success',
					toaster: 'b-toaster-bottom-center',
				});
			});
		},
		async onSubmit() {
			this.$v.goalForm.$touch();
			if (this.$v.goalForm.$anyError) {
				return;
			}
			this.isSaving = true;
			this.isSaved = false;
			if (this.isEditModal) {
				await this.$store.dispatch('updateGoal', this.goalForm);
			} else {
				await this.$store.dispatch('addNewGoal', this.goalForm);
			}
			this.isSaving = false;
			this.isSaved = true;
			this.$bvModal.hide('sq-the-modal-edit-goal');
		},
	},
	validations() {
		return {
			goalForm: {
				title: {
					required,
					maxLength: maxLength(50),
				},
				description: {
					maxLength: maxLength(2000),
				},
				goalNumber: {
					numeric,
					required,
				},
			},
		};
	},
	components: {
		GoalCard,
		CustomModal,
		FormInputGroup,
		ButtonSubmit,
	},
};
</script>
