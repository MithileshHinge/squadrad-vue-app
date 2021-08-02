<template>
	<b-modal :id="modalId" centered modal-class="sq-custom-modal sq-shadow" :static="modalStatic" v-on="$listeners">
		<template #modal-header-close>
			<span class="sq-close-icon-bar"></span>
		</template>
		<template #default>
			<h4 class="sq-modal-title">{{ modalTitle }}</h4>
			<div class="sq-modal-body">
				<slot></slot>
			</div>
		</template>
	</b-modal>
</template>

<script>
export default {
	props: {
		modalId: String,
		modalTitle: String,
		modalStatic: Boolean,
		primaryBtnText: String,
		secondaryBtnText: String,
		primaryBtnFunc: Function,
		secondaryBtnFunc: Function,
	},
};
</script>

<style lang="scss">
.sq-custom-modal .modal-dialog {
	margin: auto;
	max-width: 18.75rem;
}

.sq-custom-modal .modal-body {
	padding: 0.25rem 2rem 0.5rem 2rem;
	text-align: center;
}

.sq-custom-modal .sq-modal-title {
	font-weight: 600;
	color: $my-color-dark;
}

.sq-custom-modal .sq-modal-body {
	padding: 1rem 0 2rem 0;
	color: $my-color-dark;
	position: relative;
}

.sq-custom-modal .sq-form-group {
	margin-bottom: 0.5rem !important;
}

</style>
