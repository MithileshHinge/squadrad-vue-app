<template>
	<b-card class="sq-card p-2 mx-auto">
		<b-row v-if="edit" no-gutters class="mb-2 mx-n3 mt-n3">
			<b-col cols="auto" align-self="start" class="p-0">
				<span class="sq-muted sq-card-heading"><span class="sq-rupee"/>{{ squad.amount }}</span>
			</b-col>
			<b-col/>
			<b-col cols="auto" align-self="end" class="p-0">
				<b-icon-trash font-scale="0.9" class="sq-muted" @click="$emit('delete')"/>
			</b-col>
		</b-row>
		<b-card-img v-if="squad.image" :src="/*require('@/assets/'+squad.image)*/'https://placekitten.com/60/60'" class="sq-card-img rounded-circle mb-2" top/>
		<b-card-title :title="squad.title" class="sq-card-heading mb-2"/>
		<b-card-text class="sq-text mb-4 text-center">
			{{ squad.description }}
		</b-card-text>
		<b-button v-if="edit" class="sq-card-btn sq-btn sq-shadow" @click="$emit('edit')">
			<b-row no-gutters align-h="center" align-v="center"><b-icon-pencil-fill font-scale="0.95" class="mr-2"/>Edit squad</b-row>
		</b-button>
		<JoinButton v-else :squad="squad" :creator="creator" :manualSub="manualSub" :squadNo="squadNo" :totalSquads="totalSquads" @joined="$emit('joined')"/>
	</b-card>
</template>

<script>
import JoinButton from './JoinButton.vue';

export default {
	props: {
		squad: Object,
		creator: Object,
		manualSub: Object,
		squadNo: Number,
		totalSquads: Number,
		edit: Boolean,
	},
	components: {
		JoinButton,
	},
};
</script>
