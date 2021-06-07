<template>
<b-img src="@/assets/squadrad-fav.png" fluid left></b-img>
</template>

<script>
export default {
	props: {
		isAuthenticated: Boolean,
	},
	methods: {
		redirectIfAuthenticated() {
			if (this.isAuthenticated) {
				this.$router.push('/feed');
			}
		},
	},
	watch: {
		isAuthenticated: 'redirectIfAuthenticated',
	},
};
</script>
