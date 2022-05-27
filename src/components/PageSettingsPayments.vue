<template>
	<div>
		<div class="sq-page-title">Payments</div>
		<b-container class="p-0 text-left" fluid>
			<b-table class="sq-text" hover :items="payments">
				<template #cell(timestamp)="data">
					{{ (new Date(data.value)).toLocaleDateString('default') }} {{ (new Date(data.value)).toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' }) }}
				</template>
			</b-table>
		</b-container>
	</div>
</template>

<script>
import paymentService from '../services/payment.service';

export default {
	data() {
		return {
			payments: [],
		};
	},
	methods: {
		async fetchPayments() {
			try {
				const resPayments = await paymentService.getAllPaymentsToCreator();
				if (!resPayments || resPayments.status !== 200) return;

				const payments = resPayments.data;
				payments.sort((p1, p2) => p2.timestamp - p1.timestamp);

				this.payments = payments.map((payment) => ({
					name: payment.user.fullName,
					amount: payment.amount,
					timestamp: payment.timestamp,
				}));
			} catch (err) {
				console.log(err);
			}
		},
	},
	mounted() {
		this.fetchPayments();
	},
};
</script>
