<template>
	<div>
		<div class="sq-page-title">Notifications</div>
		<div class="px-5">
			<NotificationsList/>
		</div>
	</div>
</template>

<script>
import NotificationsList from '../components/NotificationsList.vue';

export default {
	components: {
		NotificationsList,
	},
};
</script>
