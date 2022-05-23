<template>
	<b-container>
		<SearchBar @input="searchText"/>
	</b-container>
</template>

<script>
import SearchBar from '../components/SearchBar.vue';

export default {
	data() {
		return {
		};
	},
	methods: {
	},
	components: {
		SearchBar,
	},
};
</script>
