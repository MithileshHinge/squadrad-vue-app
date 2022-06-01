<template>
	<div>
		<div class="sq-page-title">Creator stats</div>
		<div class="px-3 pt-1 pb-4">
			<b-container class="position-relative px-lg-5">
				<div class="sq-text text-center mb-2">Earnings each month</div>
				<Bar v-if="chartDataEarnings"
				:chart-options="chartOptions"
				:chart-data="chartDataEarnings"
				:chart-id="chartId"
				/>
			</b-container>
			<b-container class="position-relative mt-5 px-lg-5">
				<div class="sq-text text-center mb-2">Active members each month</div>
				<Bar v-if="chartDataMembers"
				:chart-options="chartOptions"
				:chart-data="chartDataMembers"
				:chart-id="chartId"
				/>
			</b-container>
		</div>
	</div>
</template>

<script>
import { Bar } from 'vue-chartjs/legacy';
import {
	Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,
} from 'chart.js';
import scssColors from '../scss/_export.module.scss';
import paymentService from '../services/payment.service';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
	data() {
		return {
			chartOptions: { responsive: true },
			chartId: 'bar-chart',
			chartDataEarnings: null,
			chartDataMembers: null,
		};
	},
	methods: {
		async fetchStats() {
			try {
				const resPayments = await paymentService.getAllPaymentsToCreator();
				if (!resPayments || resPayments.status !== 200) throw new Error('Could not fetch all payments');
				const payments = resPayments.data;

				const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
				const now = new Date();
				const currentMonth = now.getMonth();
				const currentYear = now.getFullYear();
				const labels = months.splice(currentMonth);
				labels.push(...months);

				const earningsDataInit = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // starting with January
				const membersDataInit = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // starting with January

				payments.forEach((payment) => {
					const date = new Date(payment.timestamp);
					// Do not consider if payment is older than current month of last year
					if (date.getFullYear() < currentYear - 1) return;
					if (date.getFullYear() === currentYear - 1 && date.getMonth() < currentMonth) return;

					// Do not consider if payment is of current month of current year
					if (date.getFullYear() === currentYear && date.getMonth() >= currentMonth) return;

					earningsDataInit[date.getMonth()] += payment.amount;
					membersDataInit[date.getMonth()] += 1;
				});

				const earningsData = earningsDataInit.splice(currentMonth);
				earningsData.push(...earningsDataInit); // starts with currentMonth of last year

				const membersData = membersDataInit.splice(currentMonth);
				membersData.push(...membersDataInit); // starts with currentMonth of last year

				this.chartDataEarnings = {
					labels,
					datasets: [{
						label: 'Earnings in rupees',
						data: earningsData,
						backgroundColor: `${scssColors.frenchRose}CC`,
					}],
				};

				this.chartDataMembers = {
					labels,
					datasets: [{
						label: 'Number of paying members',
						data: membersData,
						backgroundColor: `${scssColors.mulberryCrayola}DD`,
					}],
				};
			} catch (err) {
				console.log(err);
			}
		},
	},
	mounted() {
		this.fetchStats();
	},
	components: {
		Bar,
	},
};
</script>
