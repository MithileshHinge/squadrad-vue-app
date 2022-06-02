<template>
	<div :class="`sq-user-list ${showBorders ? 'sq-user-list-borders' : ''}`">
		<b-list-group v-if="!users">
			<b-list-group-item v-for="index in 5" :key="index" class="p-0">
				<UsernameMediaComp loading/>
			</b-list-group-item>
		</b-list-group>
		<b-list-group v-else-if="users && users.length > 0">
			<b-list-group-item v-for="user in users" :key="user.userId" class="p-0">
				<UsernameMediaComp
					:name="user.name"
					:profilePicSrc="getProfilePicSrc(user.profilePicSrc, true)"
					:subtext="user.subtext"
					:showMenuButton="false"
					@click="$emit('click', user)"
					:size="size"
					/>
			</b-list-group-item>
		</b-list-group>
	</div>
</template>

<script>
import UsernameMediaComp from './UsernameMediaComp.vue';
import getProfilePicSrc from '../common/getProfilePicSrc';

export default {
	props: {
		users: {
			type: Array, // Array<{ userId, name, profilePicSrc, subtext }>
			default: undefined,
		},
		showSubtext: Boolean,
		size: {
			type: String,
			validator(val) {
				return ['sm', 'md'].includes(val);
			},
			default: 'md',
		},
		showBorders: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			getProfilePicSrc,
		};
	},
	components: {
		UsernameMediaComp,
	},
};
</script>

<style lang="scss" scoped>
.sq-user-list {
	max-height: 10rem;
	overflow: scroll;
	border-radius: inherit;
}

.sq-user-list-borders {
	border: 1px solid rgba(0, 0, 0, 0.125);
}

.sq-user-list .list-group .list-group-item {
	border-top: 1px solid rgba(0, 0, 0, 0.125);
	border-left: 0;
	border-right: 0;
	border-bottom: 0;
}

.sq-user-list .list-group .list-group-item:first-child {
	border-top: 0;
}
</style>
