<template>
	<div class="sq-flowendpage sq-background-gray">
		<b-container class="sq-flowendpage-container">
			<b-row class="sq-flowendpage-title" align-h="center">
				<b-col v-if="isEmailVerified !== null" sm="12" md="auto" class="mb-3">
					<b-icon-exclamation-circle v-if="!isEmailVerified" variant="danger" font-scale="1.5"/>
					<b-icon-check2-circle v-if="isEmailVerified" variant="success" font-scale="1.5"/>
				</b-col>
				<b-col sm="12" md="auto" class="pl-0">
					{{ title }}
				</b-col>
			</b-row>
			<b-row v-if="isEmailVerified === null" class="sq-flowendpage-text" align-h="center" align-v="center">
				<b-spinner/>
				<span class="px-2">Please wait</span>
			</b-row>
			<b-row v-else class="sq-flowendpage-text" align-h="center" align-v="center">
				<span class="px-2">{{ text }}</span>
			</b-row>
		</b-container>
	</div>
</template>

<script>
import userService from '@/services/user.service';

export default {
	data() {
		return {
			title: 'Verifying your email address',
			isEmailVerified: null,
			text: null,
		};
	},
	created() {
		userService.verifyEmail(this.$route.query.token)
			.then((res) => {
				if (res.status === 200) {
					this.isEmailVerified = true;
					this.title = 'Welcome aboard!';
					this.text = 'Please login to begin your journey with us. We are so glad to have you!';
				}
			}).catch((err) => {
				const res = err.response;
				if (!res || res.status === 500) {
					this.isEmailVerified = false;
					this.title = 'Oops! Something went wrong on our end.';
					this.text = 'We are deeply sorry for the inconvenience. Please try again after some time. If you keep facing this issue, we urge you to reach out to us at contact@squadrad.com';
				} else if (res.status === 401) {
					this.isEmailVerified = false;
					if (res.err === 'Token expired') {
						this.title = 'Sorry, the link has expired.';
						this.text = 'Worry not! We have sent a new link to your email address.'; // TODO: API call to resend new link
					} else if (res.err === 'Invalid token') {
						this.title = 'Sorry, the link is incorrect.';
						this.text = 'Please cross-check the link you have followed with the one you have received in the verification email.';
					}
				}
			});
	},
};
</script>
