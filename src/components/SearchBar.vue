<template>
	<div>
		<b-row no-gutters :class="`sq-search-bar px-3 ${isFocused ? 'focused' : ''} ${size === 'sm' ? 'sq-search-bar-sm' : ''}`">
			<b-col cols="auto" align-self="center" class="pr-2 sq-search-bar-icon d-flex">
				<b-icon-search class="sq-muted align-top"/>
			</b-col>
			<b-col>
				<b-form-input size="sm" class="sq-search-input" :autofocus="renderFocused" :value="value" @input="$emit('input', $event)" :placeholder="searchPlaceholder" autocomplete="off" @focus="focused" @blur="blurred"/>
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
		renderFocused: Boolean,
		size: {
			type: String,
			validator(val) {
				return ['sm', 'md'].includes(val);
			},
			default: 'md',
		},
	},
	data() {
		return {
			isFocused: this.renderFocused,
		};
	},
	methods: {
		focused(event) {
			this.isFocused = true;
			this.$emit('focus', event);
		},
		blurred(event) {
			this.isFocused = false;
			this.$emit('blur', event);
		},
	},
};
</script>

<style lang="scss" scoped>
.sq-search-bar {
	font-weight: 300;
	font-size: 1rem;
	line-height: 1.25rem;
	background-color: $my-color-gray6;
	color: $my-color-gray1;
	border: none;
	border-radius: 50px;
	padding-top: 0.25rem;
	padding-bottom: 0.25rem;
	transition: 0.5s;
}

.sq-search-bar.focused {
	background-color: $my-color-light;
	box-shadow: 0 0 0 0.0625rem $french-rose;
	color: $my-color-gray1;
}

.sq-search-bar.sq-search-bar-sm {
	padding-top: 0;
	padding-bottom: 0;
}

.sq-search-bar-icon .b-icon {
	font-size: 100%;
}

.sq-search-input {
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
