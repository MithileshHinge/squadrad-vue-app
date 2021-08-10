<template>
	<b-button v-if="isRouted" type="submit" class="sq-btn-routed sq-btn sq-shadow position-relative" :disabled="isProcessing">
		<b-overlay :show="isProcessing" rounded="pill" opacity="0.6" spinner-small spinner-variant="primary" class="d-inline-block" no-wrap/>
		{{ (buttonText || 'Next') }}
	</b-button>
	<transition v-else-if="!isModalButton" enter-active-class="animate__animated animate__fadeInUp" leave-active-class="animate__animated animate__fadeOutDown">
		<b-button v-if="show" type="submit" :class="`${isProcessed? 'sq-btn-form-process-done': ''} sq-btn-form-process sq-btn sq-shadow`" :disabled="isProcessing">
			<b-icon-check-circle v-if="isProcessed" variant="success" class="mr-2"/>
			<b-spinner v-if="isProcessing" class="mr-2" small/>
			{{ isProcessed ? (buttonTextDone || 'All changes saved') : (buttonText || 'Save changes') }}
		</b-button>
	</transition>
	<b-button v-else type="submit" :class="`${isProcessed? 'sq-btn-form-process-done': ''} sq-btn-modal-form-process sq-btn sq-shadow`" :disabled="isProcessing">
		<b-icon-check-circle v-if="isProcessed" variant="success" class="mr-2"/>
		<b-spinner v-if="isProcessing" class="mr-2" small variant="primary"/>
		{{ isProcessed ? (buttonTextDone || 'All changes saved') : (buttonText || 'Save changes') }}
	</b-button>
	<!-- TODO: add way to get failure in saving changes -->
</template>

<script>
export default {
	data() {
		return {
			show: false,
		};
	},
	props: {
		isRouted: Boolean,
		isProcessed: Boolean,
		isProcessing: Boolean,
		isModalButton: Boolean,
		buttonText: String,
		buttonTextDone: String,
	},
	watch: {
		// eslint-disable-next-line
		isProcessed: function () {
			if (this.isProcessed) {
				setTimeout(() => {
					this.show = false;
				}, 2000);
			} else {
				this.show = true;
			}
		},
		// eslint-disable-next-line
		isProcessing: function () {
			if (this.isProcessing) {
				this.show = true;
			}
		},
	},
};
</script>

<style lang="scss" scoped>

.sq-btn-routed {
	width: 60%;
	background-color: $my-color-dark;
	color: $my-color-light,
}

.sq-btn-form-process {
	position: fixed;
	width: 60%;
	bottom: 1rem;
	left: 20%;
	background-color: $my-color-dark;
	color: $my-color-light;
	z-index: 500;
	//background-image: linear-gradient(35deg, $mulberry-crayola, $french-rose, $mulberry-crayola);
}

.sq-btn-modal-form-process {
	width: 100%;
	background-color: $my-color-dark;
	color: $my-color-light;
	margin-top: 1rem;
}

.sq-btn-form-process-done {
	background-image: none;
	background-color: $my-color-light;
	color: $my-color-dark;
}
</style>
