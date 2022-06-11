<template>
	<b-container class="pt-4">
		<SearchBar v-model="searchText" searchPlaceholder="Search creators" :renderFocused="true"/>
		<div class="mt-3">
			<UserList :loading="loadingCreators" size="md" :showSubtext="true" :users="creatorsSearchFiltered" @click="$router.push(`/creator/${$event.userId}`)"/>
		</div>
	</b-container>
</template>

<script>
import creatorService from '../services/creator.service';
import SearchBar from '../components/SearchBar.vue';
import UserList from '../components/UserList.vue';

export default {
	data() {
		return {
			searchText: '',
			creators: [],
			loadingCreators: false,
		};
	},
	computed: {
		creatorsSearchFiltered() {
			if (this.searchText.length < 2) return [];
			return this.creators.filter((creator) => creator.pageName.toLowerCase().includes(this.searchText.toLowerCase())).map((creator) => ({
				userId: creator.userId,
				name: creator.pageName,
				profilePicSrc: creator.profilePicSrc,
				subtext: `is creating ${creator.bio}`,
			}));
		},
	},
	methods: {
		async fetchCreators() {
			try {
				this.loadingCreators = true;
				const res = await creatorService.getAllCreators();
				if (res && res.status === 200) {
					this.creators = res.data;
					this.loadingCreators = false;
				}
			} catch (err) {
				console.log(err);
			}
		},
	},
	mounted() {
		this.fetchCreators();
	},
	components: {
		SearchBar,
		UserList,
	},
};
</script>
