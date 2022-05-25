<template>
	<div @click="$emit('click')">
		<b-skeleton-wrapper :loading="loading">
			<template #loading>
				<b-row no-gutters class="p-2">
					<b-col cols="auto" class="px-0">
					<b-skeleton type="avatar"/>
					</b-col>
					<b-col align-self="center" class="pl-2">
						<b-skeleton height="0.5rem" width="50%"/>
						<b-skeleton height="0.5rem" width="30%"/>
					</b-col>
				</b-row>
			</template>
			<b-row no-gutters class="p-2">
				<b-col cols="auto" class="px-0">
					<b-avatar :src="profilePicSrc"></b-avatar>
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
	},
};
</script>
