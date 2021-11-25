<template>
	<div>
		<div class="sq-page-title">Squads</div>
		<b-container class="p-0" fluid>
			<b-row no-gutters align-h="center">
				<b-card class="sq-card" @click="addSquad">
					<b-row no-gutters align-h="center">
						<b-icon-plus font-scale="2" class="sq-muted"/>
					</b-row>
					<b-card-text class="sq-text text-center mt-2">Add new squad</b-card-text>
				</b-card>
				<!--b-button class="sq-btn sq-shadow" style="width: 18.75rem">
					<b-row no-gutters align-h="center" align-v="center"><b-icon-plus font-scale="1.89" class="mr-1" style="margin: -13.82px"/>Add new squad</b-row>
				</b-button-->
			</b-row>
			<b-row no-gutters align-h="center">
				<b-col v-for="(squad, i) in squads" :key="squad.squadId" class="mt-3 mx-2" cols="auto">
					<SquadCard :squad="squad" :squadNo="i" :totalSquads="squads.length" edit @edit="editSquad(squad)" @delete="deleteSquad(squad)"/>
				</b-col>
			</b-row>
			<div style="height: 1.5rem"/>
		</b-container>
		<CustomModal modalId="sq-the-modal-edit-squad" :modalTitle="isEditModal ? 'Edit squad' : 'Add new squad'">
			<b-form @submit.prevent="onSubmit">
				<b-form-group>
					<b-row no-gutters class="text-left">
						<label class="sq-text">Squad image (optional)</label>
					</b-row>
					<b-form-file ref="sqRefSquadImageFileInput" id="sq-the-squad-image-file-input" accept="image/bmp, image/jpeg, image/png, image/tiff" style="display: none;" @change="editSquadImage"/>
					<b-avatar size="3.5rem">
						<b-img src="@/assets/tushar.png" class="w-100 h-100"></b-img>
						<b-button class="sq-btn-change-profile-pic" @click="editSquadImageClicked">
							<b-icon-pencil-fill font-scale="0.7" class="align-text-top"/>
						</b-button>
					</b-avatar>
				</b-form-group>
				<ImageCropModal modalId="sq-the-modal-cropper" @hide="resetFileInput" :imgDataURL="squadForm.image"/>
				<FormInputGroup modal label="Squad title" v-model="squadForm.title" :validationModel="$v.squadForm.title" placeholder="A catchy name"
					:invalidFeedbacks="{
						required: 'Please set a title for your squad',
						maxLength: 'Exceeded max character limit',
					}"
				/>
				<b-form-group class="align-items-center" label="Squad description" label-class="sq-text" label-align="left">
					<b-form-textarea class="sq-modal-form-textarea sq-form-textarea" v-model="squadForm.description" placeholder="Tell your fans about the benifits they'll get by joining this squad" rows="3" size="sm"/>
					<b-form-invalid-feedback v-if="!$v.squadForm.description.maxLength" class="sq-form-invalid-feedback">Exceeded max character limit</b-form-invalid-feedback>
				</b-form-group>
				<FormInputGroup :readonly="isEditModal" type="number" number modal label="Monthly pricing" v-model="squadForm.amount" :validationModel="$v.squadForm.amount" placeholder="Enter amount"
					:invalidFeedbacks="{
						required: 'Please enter the monthly subscription charge',
						minValue: 'Amount must be greater than 30',
						isAmountUnique: 'You already have a squad of the same amount',
					}"
				/>
				<FormInputGroup type="number" number modal label="Limit squad members (optional)" v-model="squadForm.membersLimit" placeholder="Max limit"/>
				<ButtonSubmit modal :isProcessing="isSaving" :isProcessed="isSaved" :buttonText="isEditModal ? 'Save squad' : 'Add squad'" :buttonTextDone="isEditModal ? 'Squad saved' : 'Squad added'"/>
			</b-form>
		</CustomModal>
		<CustomModal modalId="sq-the-modal-delete-squad" modalTitle="Confirm delete squad?">
			<div>
				<div class="sq-text mb-2">
					All posts exclusive to this squad will become free. This action cannot be undone. Are you sure you want to delete this squad?
				</div>
				<ButtonSubmit modal :isProcessing="isDeleting" :isProcessed="isDeleted" buttonText="Confirm delete" buttonTextDone="Squad deleted" @click="confirmDeleteSquad"/>
			</div>
		</CustomModal>
	</div>
</template>

<script>
import { required, maxLength, minValue } from 'vuelidate/lib/validators';
import SquadCard from '@/components/SquadCard.vue';
import CustomModal from '@/components/CustomModal.vue';
import FormInputGroup from '@/components/FormInputGroup.vue';
import ButtonSubmit from '@/components/ButtonSubmit.vue';
import ImageCropModal from '@/components/ImageCropModal.vue';

export default {
	data() {
		return {
			squadForm: {
				squadId: undefined,
				title: '',
				image: '',
				description: '',
				amount: undefined,
				membersLimit: undefined,
			},
			isEditModal: true,
			isSaving: false,
			isSaved: false,
			isDeleting: false,
			isDeleted: false,
		};
	},
	computed: {
		squads() {
			const { squads } = this.$store.state;
			return squads.sort((a, b) => a.amount > b.amount);
		},
	},
	methods: {
		addSquad() {
			this.squadForm = {
				squadId: undefined,
				title: '',
				image: '',
				description: '',
				amount: undefined,
				membersLimit: undefined,
			};
			this.isEditModal = false;
			this.isSaved = false;
			this.$v.squadForm.$reset();
			this.$bvModal.show('sq-the-modal-edit-squad');
		},
		editSquad(squad) {
			this.squadForm = { ...squad };
			this.isEditModal = true;
			this.isSaved = false;
			this.$v.squadForm.$reset();
			this.$bvModal.show('sq-the-modal-edit-squad');
		},
		deleteSquad(squad) {
			this.isDeleted = false;
			this.squadForm.squadId = squad.squadId;
			this.$bvModal.show('sq-the-modal-delete-squad');
		},
		async confirmDeleteSquad() {
			this.isDeleting = true;
			this.isDeleted = false;
			await this.$store.dispatch('deleteSquad', this.squadForm.squadId);
			this.isDeleting = false;
			this.isDeleted = true;
			this.$bvModal.hide('sq-the-modal-delete-squad');
		},
		editSquadImageClicked() {
			document.getElementById('sq-the-squad-image-file-input').click();
		},
		editSquadImage(event) {
			const reader = new FileReader();
			reader.onload = (e) => {
				this.squadForm.image = e.target.result;
				this.$bvModal.show('sq-the-modal-cropper');
			};
			reader.readAsDataURL(event.target.files[0]);
			return false;
		},
		resetFileInput() {
			this.$refs.sqRefSquadImageFileInput.reset();
		},
		async onSubmit() {
			this.$v.squadForm.$touch();
			if (this.$v.squadForm.$anyError) {
				return;
			}
			this.isSaving = true;
			this.isSaved = false;
			if (this.isEditModal) {
				await this.$store.dispatch('updateSquad', this.squadForm);
			} else {
				await this.$store.dispatch('addNewSquad', this.squadForm);
			}
			this.isSaving = false;
			this.isSaved = true;
			this.$bvModal.hide('sq-the-modal-edit-squad');
		},
	},
	validations() {
		function isAmountUnique(value) {
			return this.$store.state.squads.findIndex((s) => (s.amount === Number.parseFloat(value) && s.squadId !== this.squadForm.squadId)) < 0;
		}
		return {
			squadForm: {
				title: {
					required,
					maxLength: maxLength(50),
				},
				description: {
					maxLength: maxLength(2000),
				},
				amount: {
					required,
					minValue: minValue(30),
					isAmountUnique,
				},
			},
		};
	},
	components: {
		SquadCard,
		CustomModal,
		FormInputGroup,
		ButtonSubmit,
		ImageCropModal,
	},
};
</script>
