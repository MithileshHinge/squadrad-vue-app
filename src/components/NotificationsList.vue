<template>
	<b-list-group>
		<b-list-group-item v-for="notif in notifsSorted" :key="notif.notifId" :href="notif.linkTo" @click="$router.push(notif.linkTo)" :class="`px-4 py-3 sq-notif-list-item cursor-pointer ${notif.seen ? 'sq-background-gray' : '' }`">
			<b-row no-gutters align-v="center">
				<b-col v-if="!notif.seen" cols="0" class="d-flex align-items-center mr-2 position-absolute ml-n3">
					<b-icon-circle-fill variant="primary" font-scale="0.375"/>
				</b-col>
				<b-col>
					<div class="sq-text">{{ notif.text }}</div>
				</b-col>
				<b-col cols="auto">
					<div class="sq-text sq-subtext">{{ notif.timestamp }}</div>
				</b-col>
			</b-row>
		</b-list-group-item>
	</b-list-group>
</template>

<script>
import notifService from '../services/notif.service';
import creatorService from '../services/creator.service';
import moment from '../plugins/moment';
import notifTypes from '../common/notifTypes';
import { forEachAsync } from '../common/helpers';

export default {
	data() {
		return {
			notifs: [],
			loadingNotifs: true,
		};
	},
	computed: {
		notifsSorted() {
			return [...this.notifs].sort((a, b) => b.timestampLong - a.timestampLong);
		},
	},
	methods: {
		async loadNotifs() {
			try {
				this.loadingNotifs = true;
				const res = await notifService.fetchNotifs();
				if (res && res.status === 200) {
					const notifsArr = res.data;
					await forEachAsync(notifsArr, async (notif) => {
						const notifToPush = {
							notifId: '',
							text: '',
							seen: true,
							timestamp: '', // relative time ('2h')
							timestampLong: 0, // for sorting
						};
						switch (notif.type) {
						case notifTypes.NEW_POST: {
							const resCreator = await creatorService.getCreatorById(notif.actorId);
							if (!resCreator || resCreator.status !== 200) throw new Error('Could not fetch creator by Id');
							const creator = resCreator.data;
							notifToPush.notifId = notif.notifId;
							notifToPush.text = `${creator.pageName} made a new post`;
							notifToPush.seen = notif.seen;
							notifToPush.timestamp = moment().to(notif.timestamp);
							notifToPush.timestampLong = notif.timestamp;
							notifToPush.linkTo = `/post/${notif.actedObjectId}`;
							this.notifs.push(notifToPush);
							break;
						}
						default: {
							break;
						}
						}
					});
				}
			} catch (err) {
				console.log(err);
			}
			this.loadingNotifs = false;
		},
	},
	mounted() {
		this.loadNotifs();
	},
};
</script>

<style lang="scss" scoped>
@media (hover: hover) {
	.sq-notif-list-item:hover {
		background-color: $french-rose;
	}

	.sq-notif-list-item:hover .sq-text {
		color: $my-color-light;
	}
}
</style>
