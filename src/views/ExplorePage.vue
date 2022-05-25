<template>
	<b-container class="pt-4">
		<SearchBar @input="searchText" searchPlaceholder="Search creators"/>
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
