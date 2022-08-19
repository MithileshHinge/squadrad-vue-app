<template>
	<div>
		<b-form @submit.prevent="joinWaitlist" class="sq-landing-join-waitlist-form position-relative">
			<FormInputGroup inputClass="sq-landing-join-waitlist-input" name="email" v-model="emailInput" :validationModel="$v.emailInput" :showInvalidFeedbacks="showInvalidFeedbacks" @input="showInvalidFeedbacks = false" placeholder="Email" type="email"
				:invalidFeedbacks="{
					required: 'Please enter your email address',
					email: 'Please enter a valid email address',
					maxLength: 'Exceeded max character limit',
				}"/>
			<b-button type="submit" class="sq-landing-join-waitlist-btn sq-btn-cta sq-btn" @click="showInvalidFeedbacks = true">Join Waitlist</b-button>
		</b-form>
	</div>
</template>

<script>
import {
	required,
	email,
	maxLength,
} from 'vuelidate/lib/validators';
import waitlistService from '../services/waitlist.service';
import FormInputGroup from './FormInputGroup.vue';

export default {
	data() {
		return {
			emailInput: '',
			showInvalidFeedbacks: false,
		};
	},
	methods: {
		joinWaitlist() {
			waitlistService.joinWaitlist(this.emailInput);
			this.$emit('emailSubmitted', this.emailInput);
			this.$bvModal.show('sq-the-modal-pick-features');
		},
	},
	validations() {
		return {
			emailInput: {
				required,
				maxLength: maxLength(320),
				email,
			},
		};
	},
	components: {
		FormInputGroup,
	},
};
</script>

<style lang="scss">

.sq-landing-join-waitlist-form {
	max-width: 27.5rem;
	margin: auto;
}

.sq-landing-join-waitlist-form .sq-form-group {
	margin-bottom: 0.5rem;
	position: relative;
	&::after {
		content: '';
		position: absolute;
		opacity: 0.2;
		filter: blur(0.4rem);
		z-index: -1;
		border-radius: 50px;
		top: 0.2rem;
		left: 0.2rem;
		height: 100%;
		width: 100%;
		background-color: $my-color-gray6;
	}
}

.sq-landing-join-waitlist-btn {
	background-image: linear-gradient(35deg, $mulberry-crayola, $french-rose, $mulberry-crayola) !important;
	font-size: 1rem;
	padding: 0.5rem;
	width: 100%;
}

@media (min-width: 440px) {
	.sq-landing-join-waitlist-btn {
		position: absolute;
		background-image: linear-gradient(35deg, $mulberry-crayola, $french-rose, $mulberry-crayola);
		top: 0.2222rem;
		right: 0.2222rem;
		font-size: 0.6667rem;
		padding: 0.3333rem 2rem;
		width: auto;
		&::after {
			display: none;
		}
	}

	.sq-landing-join-waitlist-form .sq-form-invalid-feedback {
		position: absolute;
	}
}

</style>
