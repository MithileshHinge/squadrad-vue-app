<template>
	<b-card class="sq-card p-2">
		<b-row v-if="edit" no-gutters class="mb-2 mx-n3 mt-n3">
			<b-col cols="auto" align-self="start" class="p-0">
				<span class="sq-muted sq-card-heading"><span class="sq-rupee"/>{{ squad.amount }}</span>
			</b-col>
			<b-col/>
			<b-col cols="auto" align-self="end" class="p-0">
				<b-icon-trash font-scale="0.9" class="sq-muted" @click="$emit('delete')"/>
			</b-col>
		</b-row>
		<b-card-img v-if="squad.image" :src="/*require('@/assets/'+squad.image)*/'https://placekitten.com/60/60'" class="sq-squad-card-img rounded-circle mb-2" top/>
		<b-card-title :title="squad.title" class="sq-card-heading justify-content-center mb-2"/>
		<b-card-text class="sq-text mb-4 text-center">
			{{ squad.description }}
		</b-card-text>
		<b-button v-if="edit" class="sq-card-btn sq-btn sq-shadow" @click="$emit('edit')">
			<b-row no-gutters align-h="center" align-v="center"><b-icon-pencil-fill font-scale="0.95" class="mr-2"/>Edit squad</b-row>
		</b-button>
		<JoinButton v-else :amount="squad.amount" :squadNo="squadNo" :totalSquads="totalSquads"/>
	</b-card>
</template>

<script>
import JoinButton from './JoinButton.vue';

export default {
	props: {
		squad: Object,
		squadNo: Number,
		totalSquads: Number,
		edit: Boolean,
	},
	components: {
		JoinButton,
	},
};
</script>

<style lang="scss" scoped>

.sq-squad-card-img {
	width: 4rem;
	height: 4rem;
}

</style>
