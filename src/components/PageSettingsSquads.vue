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
				<b-col v-for="(squad, i) in squads" :key="squad.id" class="mt-3 mx-2" cols="auto">
					<SquadCard :squad="squad" :squadNo="i" :totalSquads="squads.length" edit @edit="editSquad(squad.id)"/>
				</b-col>
			</b-row>
			<div style="height: 1.5rem"/>
		</b-container>
		<CustomModal modalId="sq-the-modal-edit-squad" :modalTitle="isEditModal ? 'Edit squad' : 'Add new squad'">
			<b-form>
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
				<FormInputGroup type="number" number modal label="Monthly pricing" v-model="squadForm.amount" :validationModel="$v.squadForm.amount" placeholder="Enter amount"
					:invalidFeedbacks="{
						required: 'Please enter the monthly subscription charge',
						minValue: 'Amount must be greater than 30',
					}"
				/>
				<FormInputGroup type="number" number modal label="Limit squad members (optional)" v-model="squadForm.supportersLimit" placeholder="Max limit"/>
				<ButtonSubmit modal :isProcessing="isSaving" :isProcessed="isSaved" :buttonText="isEditModal ? 'Save squad' : 'Add squad'"/>
			</b-form>
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
				id: null,
				title: '',
				image: '',
				description: '',
				amount: null,
				supportersLimit: null,
			},
			isEditModal: true,
			isSaving: false,
			isSaved: false,
			squads: [
				{
					id: 1,
					title: 'RTBees',
					image: 'tushar.png',
					description: 'Early access to all videos',
					amount: 50,
					supportersLimit: null,
				},
				{
					id: 2,
					title: 'RTBees Pro',
					description: 'All the benefits from previous squad and your name would be mentioned in my video description',
					amount: 100,
					supportersLimit: null,
				},
				{
					id: 3,
					title: 'RTBees Pro Max',
					description: 'All the benefits from previous squad and your name would be mentioned in my video description',
					amount: 250,
					supportersLimit: null,
				},
				{
					id: 4,
					title: 'RTQueenBee',
					image: 'tushar.png',
					description: 'All the benefits from the previous squads. Get 10 one on one training sessions with RTB Team',
					amount: 15000,
					supportersLimit: null,
				},
			],
		};
	},
	methods: {
		addSquad() {
			this.squadForm = {
				id: null,
				title: '',
				image: '',
				description: '',
				amount: null,
				supportersLimit: null,
			};
			this.isEditModal = false;
			this.$bvModal.show('sq-the-modal-edit-squad');
		},
		editSquad(id) {
			console.log(id);
			this.squadForm = this.squads.find((s) => s.id === id);
			this.isEditModal = true;
			this.$bvModal.show('sq-the-modal-edit-squad');
		},
		editSquadImageClicked() {
			document.getElementById('sq-the-squad-image-file-input').click();
		},
		editSquadImage(event) {
			const reader = new FileReader();
			reader.onload = (e) => {
				this.$bvModal.show('sq-the-modal-cropper');
				this.squadForm.image = e.target.result;
			};
			reader.readAsDataURL(event.target.files[0]);
			return false;
		},
		resetFileInput() {
			this.$refs.sqRefSquadImageFileInput.reset();
		},
	},
	validations: {
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
			},
		},
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
