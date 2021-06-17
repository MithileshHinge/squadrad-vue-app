export default {
	methods: {
		validateState(model, validator) {
			if (validator) {
				const { $dirty } = model;
				if ($dirty) {
					console.log(model[validator]);
					return (model[validator]);
				}
			} else {
				const { $dirty, $invalid } = model;
				if ($dirty) {
					return ($invalid ? false : null);
				}
			}
			return null;
		},
	},
};
