<template>
	<b-card class="sq-card p-2">
		<b-icon-trash v-if="edit" font-scale="0.9" class="sq-muted position-absolute" style="top: 0.8rem; right: 0.8rem;" @click="$emit('delete')"/>
		<b-card-title :title="goal.title" class="sq-card-heading justify-content-center mb-2"/>
		<b-card-text class="sq-text mb-4 text-center">
			{{ goal.description }}
		</b-card-text>
		<b-button v-if="edit" class="sq-card-btn sq-btn sq-shadow" @click="$emit('edit')">
			<b-row no-gutters align-h="center" align-v="center"><b-icon-pencil-fill font-scale="0.95" class="mr-2"/>Edit goal</b-row>
		</b-button>
	</b-card>
</template>

<script>
export default {
	props: {
		goal: Object,
		edit: Boolean,
	},
};
</script>
