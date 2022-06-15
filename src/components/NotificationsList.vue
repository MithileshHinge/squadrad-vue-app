<template>
	<div>
		<b-list-group v-if="loadingNotifs">
			<b-list-group-item v-for="index in 5" :key="index">
				<b-skeleton width="90%" height="0.5rem"/>
				<b-skeleton width="50%" height="0.5rem"/>
				<b-skeleton width="70%" height="0.5rem"/>
			</b-list-group-item>
		</b-list-group>
		<b-list-group v-else>
			<b-list-group-item v-for="notif in notifsSorted" :key="notif.notifId" :href="notif.linkTo" @click="$router.push(notif.linkTo)" :class="`px-4 py-3 sq-notif-list-item cursor-pointer ${notif.seen ? 'sq-background-gray' : '' }`">
				<b-row no-gutters align-v="center">
					<b-col v-if="!notif.seen" cols="0" class="d-flex align-items-center mr-2 position-absolute ml-n3">
						<b-icon-circle-fill variant="primary" font-scale="0.375"/>
					</b-col>
					<b-col>
						<div class="sq-text pr-3">{{ notif.text }}</div>
					</b-col>
					<b-col cols="auto">
						<div class="sq-text sq-subtext">{{ notif.timestamp }}</div>
					</b-col>
				</b-row>
			</b-list-group-item>
		</b-list-group>
	</div>
</template>

<script>
import notifService from '../services/notif.service';
import creatorService from '../services/creator.service';
import moment from '../plugins/moment';
import notifTypes from '../common/notifTypes';
import { forEachAsync } from '../common/helpers';
import userService from '../services/user.service';
import commentService from '../services/comment.service';
import postService from '../services/post.service';

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
						switch (notif.type) {
						case notifTypes.NEW_POST: {
							const resCreator = await creatorService.getCreatorById(notif.actorId);
							if (!resCreator || resCreator.status !== 200) throw new Error('Could not fetch creator by Id');
							const creator = resCreator.data;
							this.notifs.push({
								notifId: notif.notifId,
								text: `${creator.pageName} made a new post`,
								seen: notif.seen,
								timestamp: moment().to(notif.timestamp),
								timestampLong: notif.timestamp,
								linkTo: `/post/${notif.actedObjectId}`,
							});
							break;
						}
						case notifTypes.POST_LIKE: {
							const resUser = await userService.getUserById(notif.actorId);
							if (!resUser || resUser.status !== 200) throw new Error('Could not fetch user by Id');
							const user = resUser.data;
							this.notifs.push({
								notifId: notif.notifId,
								text: `${user.fullName} liked your post`,
								seen: notif.seen,
								timestamp: moment().to(notif.timestamp),
								timestampLong: notif.timestamp,
								linkTo: `/post/${notif.actedObjectId}`,
							});
							break;
						}
						case notifTypes.POST_COMMENT: {
							const resComment = await commentService.getCommentById(notif.actedObjectId);
							if (!resComment || resComment.status !== 200) throw new Error('Could not fetch reply comment');
							const comment = resComment.data;
							const resUser = await userService.getUserById(notif.actorId);
							if (!resUser || resUser.status !== 200) throw new Error('Could not fetch user by Id');
							const user = resUser.data;
							this.notifs.push({
								notifId: notif.notifId,
								text: `${user.fullName} commented on your post`,
								seen: notif.seen,
								timestamp: moment().to(notif.timestamp),
								timestampLong: notif.timestamp,
								linkTo: `/post/${comment.postId}`,
							});
							break;
						}
						case notifTypes.COMMENT_REPLY: {
							const resReplyComment = await commentService.getCommentById(notif.actedObjectId);
							if (!resReplyComment || resReplyComment.status !== 200) throw new Error('Could not fetch reply comment');
							const replyComment = resReplyComment.data;
							const resPost = await postService.getPostById(replyComment.postId);
							if (!resPost || resPost.status !== 200) throw new Error('Could not fetch post by Id');
							const post = resPost.data;
							let name = '';
							if (replyComment.userId === post.userId) {
								// Reply is from creator
								const resCreator = await creatorService.getCreatorById(notif.actorId);
								if (!resCreator || resCreator.status !== 200) throw new Error('Could not fetch creator by Id');
								name = resCreator.data.pageName;
							} else {
								// Reply is from member
								const resUser = await userService.getUserById(notif.actorId);
								if (!resUser || resUser.status !== 200) throw new Error('Could not fetch user by Id');
								name = resUser.data.fullName;
							}
							this.notifs.push({
								notifId: notif.notifId,
								text: `${name} replied: "${replyComment.text.length > 45 ? replyComment.text.substr(0, 45).trim().concat('...') : replyComment.text}"`,
								seen: notif.seen,
								timestamp: moment().to(notif.timestamp),
								timestampLong: notif.timestamp,
								linkTo: `/post/${post.postId}`,
							});
							break;
						}
						case notifTypes.SQUAD_SUBSCRIBED: {
							const resUser = await userService.getUserById(notif.actorId);
							if (!resUser || resUser.status !== 200) throw new Error('Could not fetch user by Id');
							this.notifs.push({
								notifId: notif.notifId,
								text: `${resUser.data.fullName} has joined your squad`,
								seen: notif.seen,
								timestamp: moment().to(notif.timestamp),
								timestampLong: notif.timestamp,
								linkTo: '/creator/settings/payments',
							});
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
