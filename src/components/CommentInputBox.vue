<template>
	<b-media class="fixed-bottom sq-comment-input-media" no-body>
		<b-media-aside class="mx-2" vertical-align="center">
			<b-avatar src="@/assets/tushar.png" size="2rem"></b-avatar>
		</b-media-aside>
		<b-media-body>
			<b-form @submit="onSubmitComment" class="sq-comment-input-form sq-text">
				<b-form-input v-model="commentInput" trim class="my-auto pl-2 sq-comment-input-form-input" placeholder="Leave a comment..." autocomplete="off"></b-form-input>
				<b-button type="submit" class="sq-send">
					<svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z"/></svg>
				</b-button>
			</b-form>
		</b-media-body>
	</b-media>
</template>

<script>
export default {
	data() {
		return {
			commentInput: '',
		};
	},
	methods: {
		onSubmitComment(event) {
			event.preventDefault();
			this.commentInput = '';
		},
	},
};
</script>

<style lang="scss" scoped>

.sq-comment-input-media {
	background-color: #ffffff;
	box-shadow: 0 4px 20px 0 rgba($color: $my-color-dark, $alpha: 0.15);
}

.sq-comment-input-form {
	display: flex;
	flex-flow: row;
	width: 100%;
}

.sq-comment-input-form-input {
	font-size: 0.875rem;
	font-weight: 300;
	text-align: left;
	color: $my-color-dark;
	background-color: transparent;
	border: none;
	box-shadow: none;
}

.sq-send {
	background-color: transparent;
	border: none;
	font-size: 1.5rem;
	color: $my-color-gray1;
	&:focus, &:hover {
		background-color: transparent;
		color: $my-color-gray1;
		box-shadow: none;
	}
	&:not(:disabled):not(.disabled):active {
		background-color: transparent;
		color: $radical-red;
		box-shadow: none;
	}
}

// if browser supports hover (not touch-screen): this is to prevent sticky hover state on touch-screen devices
@media (hover: hover) {
	.sq-send:hover {
		color: $radical-red;
	}
}

</style>
