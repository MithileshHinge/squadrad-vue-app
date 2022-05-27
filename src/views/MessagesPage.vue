<template>
	<div class="d-flex flex-column">
		<b-tabs v-if="$store.state.creator.userId" id="sq-the-messages-inbox-tabs" align="left" nav-wrapper-class="sq-shadow" justified>
			<b-tab active @click="isCreatorInbox = true">
				<template #title>
					<UsernameMediaComp :name="$store.state.creator.pageName" :profilePicSrc="getProfilePicSrc($store.state.creator.profilePicSrc, true)" subtext="Creator" :showMenuButton="false"/>
				</template>
			</b-tab>
			<b-tab @click="isCreatorInbox = false">
				<template #title>
					<UsernameMediaComp :name="$store.state.user.fullName" :profilePicSrc="getProfilePicSrc($store.state.user.profilePicSrc, false)" subtext="Member" :showMenuButton="false"/>
				</template>
			</b-tab>
		</b-tabs>
		<div class="d-flex flex-grow-1">
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
				:text-messages="defaultTexts"
				@fetch-messages="fetchMessages"
				@send-message="sendMessage"
				@add-room="addRoomClicked"
			/>
		</div>
		<CustomModal modalId="sq-the-add-room-modal" :modalTitle="isCreatorInbox ? 'Chat with members' : 'Chat with creators'">
			<div>
				<SearchBar v-model="addRoomSearchInput"/>
				<div id="sq-the-chat-add-room-search-list" class="mt-3">
					<b-list-group v-if="!addRoomSearchUsersFiltered">
						<b-list-group-item v-for="index in 5" :key="index" class="p-0">
							<UsernameMediaComp loading/>
						</b-list-group-item>
					</b-list-group>
					<b-list-group v-else-if="addRoomSearchUsersFiltered && addRoomSearchUsersFiltered.length > 0">
						<b-list-group-item v-for="user in addRoomSearchUsersFiltered" :key="user.userId" class="p-0">
							<UsernameMediaComp :name="isCreatorInbox ? user.fullName : user.pageName" :profilePicSrc="getProfilePicSrc(user.profilePicSrc, !isCreatorInbox)" :showMenuButton="false" @click="addRoom(user)"/>
						</b-list-group-item>
					</b-list-group>
					<div v-else class="p-4 sq-text sq-muted">
						{{ isCreatorInbox ? 'You don\'t have any squad members' : 'You have not joined any squads' }}
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
			defaultTexts: {
				ROOMS_EMPTY: 'No messages',
			},
			addRoomUsersList: null,
			addRoomSearchInput: '',
			getProfilePicSrc,
		};
	},
	computed: {
		addRoomSearchUsersFiltered() {
			if (this.addRoomUsersList === null) return null;
			return this.addRoomUsersList.filter((u) => (this.isCreatorInbox ? u.fullName.includes(this.addRoomSearchInput) : u.pageName.includes(this.addRoomSearchInput)));
		},
	},
	watch: {
		isCreatorInbox() {
			this.rooms = [];
			this.messages = [];
			this.roomId = null;
			this.roomsListOpened = true;
			this.fetchRooms();
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
				if (this.isCreatorInbox) {
					const res = await manualSubService.getAllManualSubbedUsersInfo();
					if (res && res.status === 200) {
						this.addRoomUsersList = res.data;
					}
				} else {
					const res = await manualSubService.getAllManualSubbedCreatorsInfo();
					if (res && res.status === 200) {
						this.addRoomUsersList = res.data;
					}
				}
			} catch (err) {
				console.log(err);
			}
		},
		addRoom(user) {
			this.$bvModal.hide('sq-the-add-room-modal');
			if (this.rooms.find((room) => room.roomId === user.userId)) {
				this.roomId = user.userId;
				return;
			}
			const rooms = [...this.rooms];
			rooms.push({
				roomId: user.userId,
				roomName: this.isCreatorInbox ? user.fullName : user.pageName,
				avatar: getProfilePicSrc(user.profilePicSrc, !this.isCreatorInbox),
				users: [
					{
						_id: user.userId,
						username: this.isCreatorInbox ? user.fullName : user.pageName,
						avatar: getProfilePicSrc(user.profilePicSrc, !this.isCreatorInbox),
					},
					{
						_id: this.$store.state.user.userId,
						username: this.isCreatorInbox ? this.$store.state.creator.pageName : this.$store.state.user.fullName,
						avatar: getProfilePicSrc(this.isCreatorInbox ? this.$store.state.creator.profilePicSrc : this.$store.state.user.profilePicSrc, this.isCreatorInbox),
					},
				],
			});
			this.rooms = rooms;
			this.roomId = user.userId;
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

#sq-the-chat-add-room-search-list {
	border-radius: 0.25rem;
	border: 1px solid $my-color-gray5;
	height: 17rem;
	overflow: scroll;
}
#sq-the-chat-add-room-search-list .list-group > .list-group-item{
	border: none;
	border-bottom: 1px solid $my-color-gray5;
}
#sq-the-chat-add-room-search-list .list-group > .list-group-item:last-child{
	border-bottom: none;
}
</style>
