<template>
	<div>
		<b-row id="sq-the-search-bar" no-gutters :class="`px-3 py-1 ${isFocused ? 'focused' : ''}`">
			<b-col cols="auto" align-self="center" class="pr-2">
				<b-icon-search class="sq-text sq-subtext" font-scale="1.05"/>
			</b-col>
			<b-col>
				<b-form-input size="sm" id="sq-the-search-input" autofocus :value="value" @input="$emit('input', $event)" :placeholder="searchPlaceholder" autocomplete="off" @focus="isFocused = true" @blur="isFocused = false"/>
			</b-col>
		</b-row>
	</div>
</template>

<script>
export default {
	props: {
		searchPlaceholder: {
			type: String,
			default: 'Search',
		},
		value: String,
	},
	data() {
		return {
			isFocused: true,
		};
	},
};
</script>

<style lang="scss" scoped>
#sq-the-search-bar {
	font-weight: 300;
	font-size: 1rem;
	line-height: 1.25rem;
	background-color: $my-color-gray6;
	color: $my-color-gray1;
	border: none;
	border-radius: 50px;
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
	transition: 0.5s;
}

#sq-the-search-bar.focused {
	background-color: $my-color-light;
	box-shadow: 0 0 0 0.0625rem $french-rose;
	color: $my-color-gray1;
}

#sq-the-search-input {
	padding: 0;
	background: transparent;
	border: none;
	font-weight: 300;
	line-height: 1.25rem;
	&:focus {
		box-shadow: none;
		color: $my-color-gray1;
	}
}
</style>
