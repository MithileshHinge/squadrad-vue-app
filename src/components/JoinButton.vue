<template>
	<b-button class="sq-card-btn sq-btn-cta sq-btn my-1" :style="`background-image: linear-gradient(22deg, ${getJoinBtnGradientStops[squadNo]}, ${getJoinBtnGradientStops[squadNo + 1]}, ${getJoinBtnGradientStops[squadNo]});`" @click="$emit('join')">Join squad at <span class="sq-rupee"/>{{ amount }}/month</b-button>
</template>

<script>
import chroma from 'chroma-js';
import scssColors from '@/scss/_export.scss';

export default {
	props: {
		squadNo: Number,
		totalSquads: Number,
		amount: Number,
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
