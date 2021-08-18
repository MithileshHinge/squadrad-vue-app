<template>
	<b-form-group :label="label" :label-class="(modal ? 'sq-text' : 'sq-form-label' ) + ' ' + (labelClass || '')" class="sq-form-group" :label-for="inputId" label-align="left" :description="description">
		<b-form-input :id="inputId" :class="(modal ? 'sq-modal-form-input' : 'sq-form-input') + ' ' + (inputClass || '')" v-model="inputVal" :state="validationModel ? validateState(validationModel) : null" v-bind="$attrs"/>
		<b-form-invalid-feedback v-for="invalidValidator in invalidValidatorsArray" :key="invalidValidator" class="sq-form-invalid-feedback">
			{{ invalidFeedbacks[invalidValidator] }}
		</b-form-invalid-feedback>
	</b-form-group>
</template>

<script>
import validateStateMixin from '@/mixins/validateStateMixin';

export default {
	props: {
		modal: Boolean,
		label: String,
		labelClass: String,
		description: String,
		inputId: String,
		inputClass: String,
		value: [String, Number],
		validationModel: Object,
		invalidFeedbacks: Object,
	},
	computed: {
		inputVal: {
			get() {
				return this.value;
			},
			set(val) {
				this.validationModel.$touch();
				this.$emit('input', val);
			},
		},
		invalidValidatorsArray() {
			if (!this.invalidFeedbacks) return [];
			const validators = Object.keys(this.invalidFeedbacks);
			return validators.filter((validator) => {
				if (validator === 'default') return this.validationModel.$invalid;
				return !this.validationModel[validator];
			});
		},
	},
	mixins: [validateStateMixin],
};
</script>

<style lang="scss" scoped>

.sq-form-group {
	margin-bottom: 1.5rem;
}

</style>
