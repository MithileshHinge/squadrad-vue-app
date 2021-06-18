<template>
	<b-form-group :label="label" class="sq-form-group" :label-for="inputId" label-align="left">
		<b-form-input :name="name" :id="inputId" :class="inputClass" v-model="inputVal" :state="validateState(validationModel)" :placeholder="placeholder" :type="type" :size="size" :trim="trim"/>
		<b-form-invalid-feedback v-for="invalidValidator in invalidValidatorsArray" :key="invalidValidator" class="sq-form-invalid-feedback">
			{{ invalidFeedbacks[invalidValidator] }}
		</b-form-invalid-feedback>
	</b-form-group>
</template>

<script>
import validateStateMixin from '@/mixins/validateStateMixin';

export default {
	props: {
		label: String,
		name: String,
		inputId: String,
		inputClass: String,
		value: String,
		validationModel: Object,
		invalidFeedbacks: Object,
		placeholder: String,
		type: String,
		size: String,
		trim: Boolean,
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
