<template>
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
