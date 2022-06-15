<template>
	<div class="d-block d-lg-none">
		<b-nav id="sq-the-bottom-navbar" tabs justified class="fixed-bottom">
			<b-nav-item to="/feed" class="sq-nav-item" exact exact-active-class="active">
				<b-icon :icon="navIcons[0]"></b-icon>
			</b-nav-item>
			<b-nav-item to="/explore" id="sq-the-bottomnav-explore" class="sq-nav-item" exact exact-active-class="active">
				<span v-html="navIcons[1]"></span>
			</b-nav-item>
			<b-nav-item v-if="isCreator" to="/create-post" id="sq-the-bottomnav-create-post" :class="`${$route.path === '/messages' ? 'sq-bottomnav-create-post-small' : ''} sq-nav-item`" exact exact-active-class="active">
				<b-iconstack>
					<b-icon icon="circle-fill" stacked/>
					<b-icon icon="plus" variant="light" scale="0.75" stacked/>
				</b-iconstack>
			</b-nav-item>
			<b-nav-item to="/notifications" class="sq-nav-item" exact exact-active-class="active">
				<b-icon :icon="navIcons[2]"></b-icon>
				<b-icon-circle-fill v-if="showNewNotifsIndicator" variant="primary" font-scale="0.375" class="position-absolute ml-n1"/>
			</b-nav-item>
			<b-nav-item to="/messages" class="sq-nav-item" exact exact-active-class="active">
				<b-icon :icon="navIcons[3]"></b-icon>
			</b-nav-item>
		</b-nav>
	</div>
</template>

<script>
export default {
	props: {
		isCreator: Boolean,
		isUnseenNotifs: Boolean,
	},
	data() {
		return {
			showNewNotifsIndicator: this.isUnseenNotifs,
		};
	},
	watch: {
		isUnseenNotifs(val) {
			if (this.showNewNotifsIndicator === undefined) this.showNewNotifsIndicator = val; // Only set once
		},
		'$route.path': function path(val) {
			if (val === '/notifications') this.showNewNotifsIndicator = false;
			else this.showNewNotifsIndicator = undefined;
		},
	},
	computed: {
		navIcons() {
			const navIcons = [
				'house',
				'<svg viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" aria-label="search" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi-search b-icon bi"><g data-v-391f24cb=""><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path></g></svg>',
				'bell',
				'chat',
			];
			switch (this.$route.path) {
			case '/feed':
				navIcons[0] = 'house-fill';
				break;
			case '/explore':
				navIcons[1] = '<svg viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" aria-label="search" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi-search b-icon bi"><g clip-path="url(#clip0)"><rect width="16" height="16" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12.8518 5.71061C12.6657 4.09593 11.8769 2.6111 10.6434 1.55319C9.40988 0.495277 7.82253 -0.0577043 6.19893 0.0048781C4.57533 0.0674605 3.03522 0.740991 1.88672 1.89072C0.738227 3.04045 0.0660376 4.58159 0.00463926 6.20581C-0.0567591 7.83003 0.497161 9.41755 1.55558 10.6508C2.614 11.884 4.09886 12.6719 5.7131 12.857C7.26203 13.0346 8.82048 12.6445 10.1013 11.763C11.2774 12.953 13.7058 15.4053 14.0105 15.6942C14.3914 16.0554 15.1214 16.226 15.6769 15.6942C16.2323 15.1624 15.9625 14.3607 15.6769 14.063C15.4484 13.8249 12.9489 11.3549 11.7277 10.1497C12.6317 8.85873 13.0327 7.27958 12.8518 5.71061ZM10.8514 8.25986C11.0904 7.68251 11.2135 7.06371 11.2135 6.43879C11.2135 5.17671 10.7123 3.96632 9.82019 3.07389C8.92808 2.18147 7.71812 1.68011 6.45649 1.68011C5.19486 1.68011 3.9849 2.18147 3.09279 3.07389C2.20068 3.96632 1.6995 5.17671 1.6995 6.43879C1.6995 7.06371 1.82254 7.68251 2.0616 8.25986C2.30067 8.83721 2.65106 9.36181 3.09279 9.80369C3.53452 10.2456 4.05893 10.5961 4.63607 10.8352C5.21321 11.0744 5.83179 11.1975 6.45649 11.1975C7.08119 11.1975 7.69977 11.0744 8.27691 10.8352C8.85406 10.5961 9.37847 10.2456 9.82019 9.80369C10.2619 9.36181 10.6123 8.83721 10.8514 8.25986Z" fill="black"/></g><defs><clipPath id="clip0"><rect width="16" height="16" fill="white"/></clipPath></defs></svg>';
				break;
			case '/notifications':
				navIcons[2] = 'bell-fill';
				break;
			case '/messages':
				navIcons[3] = 'chat-fill';
				break;
			default:
				break;
			}
			return navIcons;
		},
	},
};
</script>

<style lang="scss" scoped>
#sq-the-bottom-navbar {
	z-index: 1000;
	height: 3rem;
	background-color: #ffffff;
	filter: drop-shadow(0px 4px 20px rgb(28 31 51 / 15%));
	//box-shadow: 0 4px 20px 0 rgba($color: $my-color-dark, $alpha: 0.15);
}

#sq-the-bottom-navbar .sq-nav-item .active {
	color: $my-color-dark;
}

#sq-the-bottom-navbar .sq-nav-item {
	font-size: 1.25rem;
	margin: auto;
}

#sq-the-bottomnav-create-post {
	position: relative;
}

#sq-the-bottomnav-create-post .nav-link {
	color: $my-color-dark;
	position: absolute;
	left: 50%;
	transform: translate(-50%, -110%) scale(200%);
	transition: all ease-in-out 100ms;
}

#sq-the-bottomnav-create-post.sq-bottomnav-create-post-small .nav-link {
	font-size: 100%;
	transform: translate(-50%, -50%);
	left: 50%;
}

</style>
