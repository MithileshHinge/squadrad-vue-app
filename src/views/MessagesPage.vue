<template>
	<div class="d-flex">
		<ChatWindow
			class="sq-chat-window sq-text"
			height="auto"
			:current-user-id="$store.state.user.userId"
			:rooms="rooms"
			:loading-rooms="loadingRooms"
			:rooms-loaded="roomsLoaded"
			:room-id="roomId"
			:load-first-room="false"
			:rooms-list-opened="roomsListOpened"
			:messages="messages"
			:messages-loaded="messagesLoaded"
			:message-actions="[]"
			:message-selection-actions="[]"
			:show-files="false"
			:show-audio="false"
			:show-reaction-emojis="false"
			:user-tags-enabled="true"
			:emojis-suggestion-enabled="true"
			:media-preview-enabled="false"
			:styles="chatStyles"
			@fetch-messages="fetchMessages"
			@send-message="sendMessage"
			@add-room="addRoomClicked"
		/>
		<CustomModal modalId="sq-the-add-room-modal" modalTitle="Chat with creators">
			<div>
				<SearchBar v-model="addCreatorSearchInput"/>
				<div id="sq-the-chat-search-all-subbed-creators-list" class="mt-3">
					<b-list-group v-if="!allSubbedCreatorsSearchFiltered">
						<b-list-group-item v-for="index in 5" :key="index" class="p-0">
							<UsernameMediaComp loading/>
						</b-list-group-item>
					</b-list-group>
					<b-list-group v-else-if="allSubbedCreatorsSearchFiltered && allSubbedCreatorsSearchFiltered.length > 0">
						<b-list-group-item v-for="creator in allSubbedCreatorsSearchFiltered" :key="creator.userId" class="p-0">
							<UsernameMediaComp :name="creator.pageName" :profilePicSrc="getProfilePicSrc(creator.profilePicSrc, true)" :showMenuButton="false" @click="addRoom(creator)"/>
						</b-list-group-item>
					</b-list-group>
					<div v-else class="p-4 sq-text sq-muted">
						You have not joined any squads
					</div>
				</div>
			</div>
		</CustomModal>
	</div>
</template>

<script>
import ChatWindow from 'vue-advanced-chat';
import 'vue-advanced-chat/dist/vue-advanced-chat.css';
import moment from '../plugins/moment';
import getProfilePicSrc from '../common/getProfilePicSrc';
import scssColors from '../scss/_export.module.scss';
import CustomModal from '../components/CustomModal.vue';
import SearchBar from '../components/SearchBar.vue';
import UsernameMediaComp from '../components/UsernameMediaComp.vue';
import messageService from '../services/message.service';
import manualSubService from '../services/manualSubs.service';

export default {
	data() {
		return {
			isCreatorInbox: !!this.$store.state.creator.userId,
			rooms: [],
			messages: [],
			loadingRooms: true,
			roomsLoaded: false,
			roomId: null,
			roomsListOpened: true,
			messagesLoaded: false,
			chatStyles: {
				general: {
					color: scssColors.myColorDark,
				},
				room: {
					colorUsername: scssColors.myColorDark,
					colorMessage: scssColors.myColorGray1,
					backgroundCounterBadge: scssColors.radicalRed,
				},
				sidemenu: {
					backgroundHover: scssColors.myColorGray7,
					backgroundActive: `${scssColors.mulberryCrayola}20`,
				},
				header: {
					colorRoomName: scssColors.myColorDark,
				},
				content: {
					background: scssColors.myColorGray8,
				},
				message: {
					backgroundMe: scssColors.frenchRose,
					color: scssColors.myColorDark,
				},
				icons: {
					add: scssColors.mulberryCrayola,
					toggle: scssColors.myColorGray1,
					send: scssColors.myColorDark,
					emoji: scssColors.myColorDark,
				},
			},
			allSubbedCreators: null,
			addCreatorSearchInput: '',
			getProfilePicSrc,
		};
	},
	computed: {
		allSubbedCreatorsSearchFiltered() {
			return this.allSubbedCreators === null ? null : this.allSubbedCreators.filter((c) => c.pageName.includes(this.addCreatorSearchInput));
		},
	},
	methods: {
		async fetchRooms() {
			this.loadingRooms = true;
			this.roomsLoaded = false;
			try {
				const res = await messageService.fetchMessageRooms({ isFromCreatorInbox: this.isCreatorInbox });
				if (res && res.status === 200) {
					this.rooms = res.data.map((room) => ({
						roomId: room.userId,
						roomName: room.name,
						avatar: getProfilePicSrc(room.profilePicSrc, !this.isCreatorInbox),
						lastMessage: {
							content: room.lastMessage.text,
							senderId: room.lastMessage.senderUserId,
							timestamp: moment().to(room.lastMessage.timestamp),
						},
						users: [
							{
								_id: room.userId,
								username: room.name,
								avatar: getProfilePicSrc(room.profilePicSrc, !this.isCreatorInbox),
							},
							{
								_id: this.$store.state.user.userId,
								username: this.isCreatorInbox ? this.$store.state.creator.pageName : this.$store.state.user.fullName,
								avatar: getProfilePicSrc(this.$store.state.user.profilePicSrc, this.isCreatorInbox),
							},
						],
					}));
				}
			} catch (err) {
				console.log(err);
			}
			this.loadingRooms = false;
			this.roomsLoaded = true;
		},
		async fetchMessages({ room, options }) {
			if (!options.reset) return;
			this.messagesLoaded = false;
			try {
				const res = await messageService.fetchAllMessagesWithUser({ userId: room.roomId, isFromCreatorInbox: this.isCreatorInbox });
				if (res && res.status === 200) {
					this.messages = res.data.map((message) => ({
						_id: message.messageId,
						content: message.text,
						senderId: message.senderUserId,
						date: new Date(message.timestamp).toLocaleDateString('default', { day: 'numeric', month: 'long' }),
						timestamp: new Date(message.timestamp).toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' }),
					}));
				}
				this.messagesLoaded = true;
			} catch (err) {
				console.log(err);
			}
		},
		async sendMessage({ roomId, content }) {
			try {
				const res = await messageService.sendMessage({ text: content, receiverUserId: roomId, isFromCreatorInbox: this.isCreatorInbox });
				if (res && res.status === 200) {
					const messages = [...this.messages];
					messages.push({
						_id: res.data.messageId,
						content: res.data.text,
						senderId: res.data.senderUserId,
						date: new Date(res.data.timestamp).toLocaleDateString('default', { date: 'numeric', month: 'long' }),
						timestamp: new Date(res.data.timestamp).toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' }),
					});
					this.messages = messages;
				}
			} catch (err) {
				console.log(err);
			}
		},
		async addRoomClicked() {
			this.$bvModal.show('sq-the-add-room-modal');
			try {
				const res = await manualSubService.getAllManualSubbedCreatorsInfo();
				if (res && res.status === 200) {
					this.allSubbedCreators = res.data;
				}
			} catch (err) {
				console.log(err);
			}
		},
		addRoom(creator) {
			this.$bvModal.hide('sq-the-add-room-modal');
			const rooms = [...this.rooms];
			rooms.push({
				roomId: creator.userId,
				roomName: creator.pageName,
				avatar: getProfilePicSrc(creator.profilePicSrc, true),
				users: [
					{
						_id: creator.userId,
						username: creator.pageName,
						avatar: getProfilePicSrc(creator.profilePicSrc, true),
					},
					{
						_id: this.$store.state.user.userId,
						username: this.$store.state.user.fullName,
						avatar: getProfilePicSrc(this.$store.state.user.profilePicSrc, false),
					},
				],
			});
			this.rooms = rooms;
			this.roomId = creator.userId;
		},
	},
	mounted() {
		this.fetchRooms();
	},
	components: {
		ChatWindow,
		CustomModal,
		SearchBar,
		UsernameMediaComp,
	},
};
</script>

<style lang="scss">
.sq-chat-window {
	min-height: 100%;
	text-align: left;
}

.vac-room-container .vac-room-name {
	font-weight: 400;
}

.vac-svg-button:hover {
	opacity: 1;
	transform: none;
}

.vac-svg-button:hover #vac-icon-send {
	fill: $french-rose;
}

.vac-svg-button:hover #vac-icon-emoji {
	fill: $mulberry-crayola;
}

.vac-message-wrapper .vac-message-current {
	color: $my-color-light;
	font-weight: 400;
}

.vac-message-wrapper .vac-message-current .vac-text-timestamp {
	color: $my-color-light;
	font-weight: 400;
}

.vac-message-wrapper .vac-card-date {
	font-weight: 300;
	text-transform: none;
	color: $my-color-gray3;
	background: none;
	background-color: transparent;
	font-style: italic;
}

.vac-message-wrapper .vac-card-info {
	box-shadow: none;
}

#sq-the-chat-search-all-subbed-creators-list {
	border-radius: 0.25rem;
	border: 1px solid $my-color-gray5;
	height: 17rem;
	overflow: scroll;
}
#sq-the-chat-search-all-subbed-creators-list .list-group > .list-group-item{
	border: none;
	border-bottom: 1px solid $my-color-gray5;
}
#sq-the-chat-search-all-subbed-creators-list .list-group > .list-group-item:last-child{
	border-bottom: none;
}
</style>
