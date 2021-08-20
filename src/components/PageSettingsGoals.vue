<template>
	<div>
		<div class="sq-page-title">Goals</div>
		<b-container class="p-0" fluid>
			<b-row no-gutters align-h="center">
				<b-card class="sq-card-flat sq-card mb-4">
					<b-form-group class="text-left">
						<label class="sq-form-label m-0" v-helptext="'<strong>Earnings based</strong><br>Set goals for your monthly income<br><strong>Community based</strong><br>Set goals for your total number of squad members'">Goal type</label>
						<b-form-radio name="goalType" :value="true" v-model="isGoalsTypeEarningsChecked" @change="changeGoalType">Earnings based</b-form-radio>
						<b-form-radio name="goalType" :value="false" v-model="isGoalsTypeEarningsChecked" @change="changeGoalType">Community based</b-form-radio>
					</b-form-group>
					<div class="sq-text">All goals must be of the same type. Changing the goal type will require deleting all exisiting goals.</div>
				</b-card>
			</b-row>
			<b-row no-gutters align-h="center">
				<b-card class="sq-card" @click="addGoal">
					<b-row no-gutters align-h="center">
						<b-icon-plus font-scale="2" class="sq-muted"/>
					</b-row>
					<b-card-text class="sq-text text-center mt-2">Add new goal</b-card-text>
				</b-card>
			</b-row>
			<b-row no-gutters align-h="center">
				<b-col v-for="goal in goals" :key="goal.goalId" class="mt-3 mx-2" cols="auto">
					<GoalCard :goal="goal" edit/>
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
				<FormInputGroup v-if="$store.state.creator.goalsTypeEarnings" modal label="Monthly income amount" v-model="goalForm.goalNumber" :validationModel="$v.goalForm.goalNumber" numeric
					:invalidFeedbacks="{
						default: 'Please enter a valid goal amount for your monthly income',
					}"
				/>
				<FormInputGroup v-else modal label="Total squad members" v-model="goalForm.goalNumbers" :validationModel="$v.goalForm.goalNumbers" numeric
					:invalidFeedbacks="{
						default: 'Please enter a valid number of total squad members to reach',
					}"
				/>
				<ButtonSubmit modal :isProcessing="isSaving" :isProcessed="isSaved" :buttonText="isEditModal ? 'Save goal' : 'Add goal'" :buttonTextDone="isEditModal ? 'Goal updated' : 'Goal added'"/>
			</b-form>
		</CustomModal>
		<CustomModal modalId="sq-the-modal-change-goal-type" modalTitle="Confirm changing goal type?" title-class="sq-card-heading" @hide="cancelChangeGoalType">
			<div>
				<div class="sq-text mb-2">
					You cannot have both Earnings-based and Community-based goals at the same time. All existing goals will be deleted. This action cannot be undone. Do you wish to continue?
				</div>
				<ButtonSubmit modal :isProcessing="isChanging" :isProcessed="isChanged" buttonText="Confirm delete" buttonTextDone="Goal type changed" @click="confirmChangeGoalType"/>
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
				goalId: null,
				userId: null,
				title: '',
				description: '',
				goalNumber: null,
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
		changeGoalType() {
			if (this.goals.length > 0) {
				this.$bvModal.show('sq-the-modal-change-goal-type');
			} else {
				this.confirmChangeGoalType();
			}
		},
		confirmChangeGoalType() {
			this.isChanging = true;
			this.isChanged = false;
			this.$store.dispatch('changeGoalType', this.isGoalsTypeEarningsChecked);
			this.isChanging = false;
			this.isChanged = true;
			this.$bvModal.hide('sq-the-modal-change-goal-type');
		},
		cancelChangeGoalType(trigger) {
			if (trigger !== 'ok') {
				this.isGoalsTypeEarningsChecked = this.$store.state.creator.goalsTypeEarnings;
			}
		},
		addGoal() {
			this.goalForm = {
				goalId: null,
				userId: null,
				title: '',
				description: '',
				goalNumber: null,
				reached: null,
				archived: null,
			};
			this.isEditModal = false;
			this.isSaved = false;
			this.$bvModal.show('sq-the-modal-edit-goal');
		},
		async onSubmit() {
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
