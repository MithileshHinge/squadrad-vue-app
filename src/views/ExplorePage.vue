<template>
	<b-container class="pt-4">
		<SearchBar v-model="searchText" searchPlaceholder="Search creators"/>
		<div class="mt-3">
			<b-list-group v-if="!creatorsSearchFiltered">
				<b-list-group-item v-for="index in 10" :key="index" class="p-0">
					<UsernameMediaComp loading/>
				</b-list-group-item>
			</b-list-group>
			<b-list-group v-else-if="creatorsSearchFiltered && creatorsSearchFiltered.length > 0">
				<b-list-group-item v-for="creator in creatorsSearchFiltered" :key="creator.userId" class="p-0">
					<UsernameMediaComp
						:name="creator.pageName"
						:profilePicSrc="getProfilePicSrc(creator.profilePicSrc, true)"
						:subtext="`is creating ${creator.bio}`"
						:showMenuButton="false"
						@click="$router.push(`/creator/${creator.userId}`)"
						/>
				</b-list-group-item>
			</b-list-group>
		</div>
	</b-container>
</template>

<script>
import creatorService from '../services/creator.service';
import SearchBar from '../components/SearchBar.vue';
import UsernameMediaComp from '../components/UsernameMediaComp.vue';
import getProfilePicSrc from '../common/getProfilePicSrc';

export default {
	data() {
		return {
			searchText: '',
			creators: [],
			getProfilePicSrc,
		};
	},
	computed: {
		creatorsSearchFiltered() {
			if (this.searchText.length < 2) return [];
			return this.creators.filter((creator) => creator.pageName.includes(this.searchText));
		},
	},
	methods: {
		async fetchCreators() {
			try {
				const res = await creatorService.getAllCreators();
				if (res && res.status === 200) {
					this.creators = res.data;
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
		UsernameMediaComp,
	},
};
</script>
