<template>
	<div @click="$emit('click')" :class="`sq-username-media-${size} cursor-pointer`">
		<b-skeleton-wrapper :loading="loading">
			<template #loading>
				<b-row no-gutters class="p-2">
					<b-col cols="auto" class="px-0">
					<b-skeleton type="avatar" :size="size === 'sm' ? '2rem' : '3rem'"/>
					</b-col>
					<b-col align-self="center" class="pl-2">
						<b-skeleton height="0.5rem" width="50%"/>
						<b-skeleton height="0.5rem" width="30%"/>
					</b-col>
				</b-row>
			</template>
			<b-row no-gutters class="p-2">
				<b-col cols="auto" class="px-0">
					<b-avatar :src="profilePicSrc" :size="size === 'sm' ? '2rem' : '3rem'"></b-avatar>
				</b-col>
				<b-col align-self="center" class="pl-2">
					<div class="sq-text">
						{{ name }}
					</div>
					<div class="sq-subtext sq-text">
						{{ subtext }}
					</div>
				</b-col>
				<b-col v-if="showMenuButton" cols="auto" align-self="center">
					<b-icon-three-dots-vertical class="sq-post-menu-button"/>
				</b-col>
			</b-row>
		</b-skeleton-wrapper>
	</div>
</template>

<script>
export default {
	props: {
		name: String,
		profilePicSrc: String,
		subtext: String,
		showMenuButton: Boolean,
		loading: Boolean,
		size: {
			type: String,
			validator(val) {
				return ['sm', 'md'].includes(val);
			},
			default: 'md',
		},
	},
};
</script>

<style lang="scss" scoped>
.sq-username-media-sm .sq-text {
	font-size: 0.75rem;
}
.sq-username-media-sm .sq-subtext {
	font-size: 0.6rem;
}
</style>
