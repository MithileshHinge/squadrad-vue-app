<template>
	<b-card class="sq-card p-2">
		<b-icon-trash v-if="edit" font-scale="0.9" class="sq-muted position-absolute" style="top: 0.8rem; right: 0.8rem;" @click="$emit('delete')"/>
		<b-card-img v-if="squad.image" :src="/*require('@/assets/'+squad.image)*/'https://placekitten.com/60/60'" class="sq-squad-card-img rounded-circle mb-2" top/>
		<b-card-title :title="squad.title" class="sq-card-heading justify-content-center mb-2"/>
		<b-card-text class="sq-text mb-4 text-center">
			{{ squad.description }}
		</b-card-text>
		<b-button v-if="edit" class="sq-card-btn sq-btn sq-shadow" @click="$emit('edit')">
			<b-row no-gutters align-h="center" align-v="center"><b-icon-pencil-fill font-scale="0.95" class="mr-2"/>Edit squad</b-row>
		</b-button>
		<b-button v-else :ref="'sqRefJoinBtn'+squad.id" class="sq-card-btn sq-btn-cta sq-btn my-1" :style="`background-image: linear-gradient(22deg, ${getJoinBtnGradientStops[squadNo]}, ${getJoinBtnGradientStops[squadNo + 1]}, ${getJoinBtnGradientStops[squadNo]});`">Join squad at <span class="sq-rupee"/>{{ squad.amount }}/month</b-button>
	</b-card>
</template>

<script>
import chroma from 'chroma-js';
import scssColors from '@/scss/_export.scss';

export default {
	props: {
		squad: Object,
		squadNo: Number,
		totalSquads: Number,
		edit: Boolean,
	},
	computed: {
		getJoinBtnGradientStops() {
			try {
				return chroma.scale([scssColors.skyblueCrayola, scssColors.dodgerBlue, scssColors.amethyst, scssColors.frenchRose]).mode('lrgb').colors(this.totalSquads + 1);
			} catch (error) {
				console.error(error);
			}
			return null;
		},
	},
};
</script>

<style lang="scss" scoped>

.sq-squad-card-img {
	width: 4rem;
	height: 4rem;
}

</style>
