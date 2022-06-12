<template>
	<div :class="`sq-username-media-${size}`">
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
				<b-col cols="auto" class="px-0 cursor-pointer" @click="$emit('click')">
					<b-avatar :src="profilePicSrc" :size="size === 'sm' ? '2rem' : '3rem'"></b-avatar>
				</b-col>
				<b-col align-self="center" class="pl-2 cursor-pointer" @click="$emit('click')">
					<div class="sq-text">
						{{ name }}
					</div>
					<div class="sq-subtext sq-text">
						{{ subtext }}
					</div>
				</b-col>
				<b-col v-if="showMenuButton" cols="auto" align-self="center">
					<b-dropdown right no-caret toggle-class="shadow-none bg-transparent border-0 py-1 pl-2 pr-0" menu-class="my-n1 sq-shadow border-0">
						<template #button-content>
							<b-icon-three-dots-vertical class="sq-post-menu-button"/>
						</template>
						<b-dropdown-item v-for="menuItem in menu" :key="menuItem.id" class="sq-menu-item" link-class="py-2 px-3 sq-text" @click="$emit('menuItemClick', menuItem.id)">{{ menuItem.text }}</b-dropdown-item>
					</b-dropdown>
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
		menu: Array,
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

.sq-post-menu-button {
	font-size: 1.25rem;
	color: $my-color-gray1;
	float: right;
}
</style>
