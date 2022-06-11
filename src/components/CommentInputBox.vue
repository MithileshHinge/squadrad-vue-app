<template>
	<div class="sq-comment-input">
		<div class="position-relative">
			<b-row no-gutters :class="`w-100 px-3 py-2 bg-light sq-comment-input-replyingto ${isReplying ? '' : 'sq-comment-input-replyingto-hidden'}`">
				<b-col>
					<div class="w-100 text-left sq-text">
						Replying to <strong>{{ replyingTo }}</strong>
					</div>
				</b-col>
				<b-col cols="auto" align-self="center" @click="$emit('resetReplyTo')">
					<span class="sq-close-icon-bar"></span>
				</b-col>
			</b-row>
			<b-row no-gutters>
				<b-media class="sq-comment-input-media w-100" no-body>
					<b-media-aside class="mx-2" vertical-align="center">
						<b-avatar src="@/assets/tushar.png" size="2rem"></b-avatar>
					</b-media-aside>
					<b-media-body>
						<b-form @submit.prevent="onSubmitComment" class="sq-comment-input-form sq-text">
							<b-form-input v-model="commentInput" trim class="my-auto pl-2 sq-comment-input-form-input" placeholder="Leave a comment..." autocomplete="off"></b-form-input>
							<b-button type="submit" class="sq-send">
								<svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z"/></svg>
							</b-button>
						</b-form>
					</b-media-body>
				</b-media>
			</b-row>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		isReplying: Boolean,
		replyingTo: String,
	},
	data() {
		return {
			commentInput: '',
		};
	},
	methods: {
		onSubmitComment() {
			if (this.commentInput.trim()) {
				this.$emit('submit', this.commentInput.trim());
				this.commentInput = '';
			}
		},
	},
};
</script>

<style lang="scss" scoped>

.sq-comment-input {
	z-index: 100;
}

.sq-comment-input-media {
	background-color: $my-color-light;
	z-index: 1;
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

.sq-comment-input-replyingto {
	top: -75%;
	position: absolute;
	transition: top 0.2s ease;
}

.sq-comment-input-replyingto-hidden {
	top: 0;
}
</style>
