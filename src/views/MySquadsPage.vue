<template>
	<div>
		<div class="sq-page-title">My Squads</div>
		<b-container v-if="squads && squads.length > 0">
			<b-row v-for="squad in squads" :key="squad.squadId" no-gutters align-h="center">
				<b-card class="sq-card p-2 my-3">
					<b-card-img :src="getProfilePicSrc(squad.creator.profilePicSrc, true)" class="sq-squad-card-img rounded-circle mb-2" top/>
					<b-card-title :title="squad.title" class="sq-card-heading mb-2"/>
					<b-card-sub-title :sub-title="`by ${squad.creator.pageName}`" class="sq-text text-center justify-content-center mb-2"/>
					<b-card-text class="sq-text text-center">
						<span class="sq-muted mt-2 justify-content-center"><span class="sq-rupee"/>{{squad.amount}}/month</span>
					</b-card-text>
					<b-button class="sq-card-btn sq-btn sq-shadow" @click="moreInfo(squad)">
						<b-row no-gutters align-h="center" align-v="center"><b-icon-info-circle-fill font-scale="0.95" class="mr-2"/>More info</b-row>
					</b-button>
				</b-card>
			</b-row>
		</b-container>
		<div v-else-if="squads && squads.length === 0">
			<b-img class="sq-empty-state-img-full" src="@/assets/feed-empty-state.jpg"></b-img>
			<div class="sq-empty-state-text sq-text text-center">You have not joined any squads</div>
			<b-button id="sq-the-find-creators-btn" class="sq-btn sq-btn-cta sq-btn-empty-state" to="/explore">Find creators you may know</b-button>
		</div>
		<CustomModal modalId="sq-the-modal-squad-info" modalTitle="Squad details">
			<b-card v-if="selectedSquad" class="p-0 border-0 bg-transparent" no-body>
				<b-card-body class="py-0">
					<b-card-img :src="getProfilePicSrc(selectedSquad.creator.profilePicSrc, true)" class="sq-squad-card-img rounded-circle mb-2" top/>
					<b-card-title :title="selectedSquad.title" class="sq-card-heading mb-2"/>
					<b-card-sub-title :sub-title="`by ${selectedSquad.creator.pageName}`" class="sq-text text-center justify-content-center mb-2"/>
					<b-card-text class="sq-text text-center">
						<div class="sq-muted mt-2 justify-content-center"><span class="sq-rupee"/>{{selectedSquad.amount}}/month</div>
						<div class="sq-text mt-4 text-center justify-content-center">{{ selectedSquad.description }}</div>
					</b-card-text>
					<b-button class="sq-btn sq-shadow px-4 mt-2" @click="unsubscribe">
						<b-row no-gutters align-h="center" align-v="center"><b-icon-person-x-fill font-scale="0.95" class="mr-2"/>Leave Squad</b-row>
					</b-button>
				</b-card-body>
			</b-card>
		</CustomModal>
	</div>
</template>

<script>
import manualSubService from '../services/manualSubs.service';
import creatorService from '../services/creator.service';
import squadService from '../services/squad.service';
import CustomModal from '../components/CustomModal.vue';
import { forEachAsync } from '../common/helpers';
import getProfilePicSrc from '../common/getProfilePicSrc';
import manualSubStatuses from '../common/manualSubStatuses';

export default {
	data() {
		return {
			squads: null,
			selectedSquad: null,
			getProfilePicSrc,
		};
	},
	methods: {
		async populateSubbedSquads() {
			try {
				const squads = [];
				const resManualSubs = await manualSubService.getAllManualSubs();
				if (!resManualSubs || resManualSubs.status !== 200) throw new Error('Error in fetching manualSubs');
				let manualSubs = resManualSubs.data;
				manualSubs = manualSubs.filter((manualSub) => manualSub.subscriptionStatus !== manualSubStatuses.CANCELLED);
				await forEachAsync(manualSubs, async (manualSub) => {
					const resCreator = await creatorService.getCreatorById(manualSub.creatorUserId);
					if (!resCreator || resCreator.status !== 200) throw new Error('Error in fetching creator');
					const creator = resCreator.data;
					const resSquads = await squadService.getAllSquads(creator.userId);
					if (!resSquads || resSquads.status !== 200) throw new Error('Error in fetching squads of a creator');
					const squad = resSquads.data.find((s) => s.squadId === manualSub.squadId);
					squads.push({
						squadId: squad.squadId,
						title: squad.title,
						amount: squad.amount,
						description: squad.description,
						creator: {
							userId: creator.userId,
							pageName: creator.pageName,
							profilePicSrc: creator.profilePicSrc,
						},
					});
				});

				this.squads = squads;
			} catch (err) {
				console.log(err);
			}
		},
		moreInfo(squad) {
			this.selectedSquad = squad;
			this.$bvModal.show('sq-the-modal-squad-info');
		},
		async unsubscribe() {
			try {
				const res = await manualSubService.cancelManualSub(this.selectedSquad.creator.userId);
				if (res && res.status === 200) {
					await this.populateSubbedSquads();
					this.$bvModal.hide('sq-the-modal-squad-info');
				}
			} catch (err) {
				console.log(err);
			}
		},
	},
	mounted() {
		this.populateSubbedSquads();
	},
	components: {
		CustomModal,
	},
};
</script>

<style lang="scss" scoped>

.sq-squad-card-img {
	width: 4rem;
	height: 4rem;
}

</style>
