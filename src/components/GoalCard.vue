<template>
	<b-card class="sq-card p-2">
		<b-row v-if="edit" no-gutters class="mb-2 mx-n3 mt-n3">
			<b-col cols="auto" align-self="start" class="p-0">
				<span v-if="$store.state.creator.goalsTypeEarnings" class="sq-rupee"/>
				<b-icon-person v-else/>
				{{ goal.goalNumber }}
			</b-col>
			<b-col/>
			<b-col cols="auto" align-self="end" class="p-0">
				<b-icon-eye-slash-fill v-if="goal.archived" font-scale="0.9" class="mr-2" @click="$emit('unarchive')"/>
				<b-icon-eye-slash v-else font-scale="0.9" class="sq-muted mr-2" @click="$emit('archive')"/>
			</b-col>
			<b-col cols="auto" align-self="end" class="p-0">
				<b-icon-trash font-scale="0.9" class="sq-muted" @click="$emit('delete')"/>
			</b-col>
		</b-row>
		<b-card-title :title="goal.title" :class="'sq-card-heading justify-content-center mb-2' + (goal.archived ? ' sq-muted' : '' )"/>
		<b-card-text :class="'sq-text mb-4 text-center' + (goal.archived ? ' sq-muted' : '' )">
			{{ goal.description }}
		</b-card-text>
		<b-button v-if="edit" :class="'sq-card-btn sq-btn sq-shadow' + (goal.archived ? ' sq-muted' : '' )" @click="$emit('edit')">
			<b-row no-gutters align-h="center" align-v="center"><b-icon-pencil-fill font-scale="0.95" class="mr-2"/>Edit goal</b-row>
		</b-button>
		<b-progress v-else :value="(progress*100)/goal.goalNumber"/>
	</b-card>
</template>

<script>
export default {
	props: {
		goal: Object,
		edit: Boolean,
		progress: Number,
	},
};
</script>
