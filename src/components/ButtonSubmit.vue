<template>
	<b-button type="submit" :class="`${isSaved? 'sq-btn-form-save-done': ''} sq-btn-form-save sq-btn sq-shadow`" :disabled="isSaving">
		<b-icon-check-circle v-if="isSaved" variant="success" class="mr-2"/>
		<b-spinner v-if="isSaving" class="mr-2" small/>
		{{ isSaved ? 'All changes saved' : 'Save changes' }}
	</b-button>
</template>

<script>
export default {
	props: {
		isSaved: Boolean,
		isSaving: Boolean,
		buttonText: {
			type: String,
			default: 'Save changes',
		},
		buttonTextDone: {
			type: String,
			default: 'All changes saved',
		},
	},
};
</script>

<style lang="scss" scoped>
.sq-btn-form-save {
	position: fixed;
	width: 60%;
	bottom: 1rem;
	left: 20%;
	background-color: $my-color-dark;
	color: $my-color-light;
	z-index: 500;
	//background-image: linear-gradient(35deg, $mulberry-crayola, $french-rose, $mulberry-crayola);
}

.sq-btn-form-save-done {
	background-image: none;
	background-color: $my-color-light;
	color: $my-color-dark;
}
</style>
