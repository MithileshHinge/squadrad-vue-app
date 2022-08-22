<template>
	<span>
		<b-button disabled v-if="manualSub && manualSub.subscriptionStatus === manualSubStatuses.ACTIVE && manualSub.creatorUserId === creator.userId && manualSub.amount >= squad.amount" class="sq-card-btn sq-btn sq-btn-disabled my-1">
			<span v-if="manualSub.amount === squad.amount">Joined <span class="sq-rupee"/>{{ squad.amount }}/month squad</span>
			<span v-if="manualSub.amount > squad.amount">Included with higher squad</span>
		</b-button>
		<b-button v-else class="sq-card-btn sq-btn-cta sq-btn my-1" :style="`background-image: linear-gradient(22deg, ${getJoinBtnGradientStops[squadNo]}, ${getJoinBtnGradientStops[squadNo + 1]}, ${getJoinBtnGradientStops[squadNo]});`" @click="joinSquad">Join squad at <span class="sq-rupee"/>{{ squad.amount }}/month</b-button>
	</span>
</template>

<script>
import chroma from 'chroma-js';
import scssColors from '@/scss/_export.module.scss';
import paymentService from '../services/payment.service';
import myKeys from '../myKeys';
import manualSubStatuses from '../common/manualSubStatuses';

export default {
	props: {
		squadNo: Number,
		totalSquads: Number,
		squad: Object,
		creator: Object,
		manualSub: Object,
	},
	data() {
		return {
			manualSubStatuses,
		};
	},
	computed: {
		getJoinBtnGradientStops() {
			try {
				return chroma.scale([scssColors.skyblueCrayola, scssColors.dodgerBlue, scssColors.amethyst, scssColors.frenchRose]).mode('lrgb').colors(this.totalSquads + 1);
			} catch (error) {
				console.error(error);
			}
			return null;
		},
	},
	methods: {
		async joinSquad() {
			const { squadId } = this.squad;
			if (this.$store.state.creator.userId === this.creator.userId) {
				this.$bvToast.toast('You cannot join your own squad', {
					noCloseButton: true,
					variant: 'warning',
					toaster: 'b-toaster-bottom-center',
				});
				return;
			}
			try {
				const resOrder = await paymentService.getRzpOrder(squadId);
				const { rzpOrder } = resOrder.data;
				if (!rzpOrder) {
					this.$bvToast.toast('Something went wrong, please try again later', {
						noCloseButton: true,
						variant: 'danger',
						toaster: 'b-toaster-bottom-center',
					});
					return;
				}

				const options = {
					key: myKeys.RZP_TEST_KEY_ID,
					amount: rzpOrder.amount,
					currency: 'INR',
					name: 'Squadrad',
					description: 'Join a squad',
					order_id: rzpOrder.id,
					handler: (response) => {
						if (response.razorpay_payment_id) {
							this.$bvToast.toast('Payment successful', {
								noCloseButton: true,
								variant: 'success',
								toaster: 'b-toaster-bottom-center',
							});
							paymentService.paymentSuccessful({
								rzpTransactionId: response.razorpay_payment_id,
								rzpOrderId: response.razorpay_order_id,
								rzpSignature: response.razorpay_signature,
							}).catch((err) => {
								console.log(err);
							}).then((res) => {
								console.log(res);
								this.$emit('joined');
							});
						}
					},
					prefill: {
						name: this.$store.state.user.fullName,
						email: this.$store.state.user.email,
					},
					notes: rzpOrder.notes,
				};

				// eslint-disable-next-line no-undef
				const rzp = new Razorpay(options);
				rzp.on('payment.failed', (res) => {
					const err = res.error;
					this.$bvToast.toast(`Error ${err.code}: ${err.description}\n${err.source}\n${err.step}\n${err.reason}`, {
						noCloseButton: true,
						variant: 'danger',
						toaster: 'b-toaster-bottom-center',
					});
				});
				rzp.open();
			} catch (err) {
				this.$bvToast.toast(err.response.data.msg, {
					noCloseButton: true,
					variant: 'danger',
					toaster: 'b-toaster-bottom-center',
				});
			}
		},
	},
};
</script>
