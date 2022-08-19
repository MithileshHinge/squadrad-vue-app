<template>
	<b-row no-gutters align-h="center">
		<b-col cols="12">
			<b-row no-gutters class="sq-landing-section">
				<b-col cols="12" lg="6" order-lg="3">
					<div id="sq-the-landing-hero-img-vignette"/>
					<div id="sq-the-landing-hero-img-div">
						<b-img src="@/assets/hero-creators.png" fluid></b-img>
					</div>
					<div id="sq-the-landing-hero-img-halo"/>
				</b-col>
				<b-col cols="0" lg="1" order-lg="2"/>
				<b-col cols="12" lg="5" order-lg="1" class="d-flex align-items-center">
					<div id="sq-the-landing-hero-text" class="sq-landing-text">
						<h1 class="mb-4">Creator tools tailored to your unique needs.</h1>
						<p>Just enter your email and we'll get in touch with you</p>
						<JoinWaitlist @emailSubmitted="email = $event"/>
					</div>
				</b-col>
			</b-row>
			<b-row no-gutters class="py-5"/>
			<b-row no-gutters id="sq-the-landing-features-full">
				<b-col cols="12" id="sq-the-landing-features-sticky" class="d-flex align-items-center justify-content-center">
					<LandingFeatures :scrollPercent="featuresScrollPercent" @totalDuration="setFeaturesSectionFullHeight"/>
				</b-col>
			</b-row>
			<!--b-row no-gutters class="sq-landing-section sq-landing-section-features my-5 py-5">
				<b-col cols="0" lg="1"/>
				<b-col cols="12" lg="4" class="sq-landing-feature-img sq-landing-feature-img-left d-flex align-items-center mb-5">
					<b-img id="sq-the-landing-member-feature-img" src="@/assets/feature-membership.svg" style="transform: translateX(-4%);" fluid/>
				</b-col>
				<b-col cols="0" lg="2">
				</b-col>
				<b-col cols="12" lg="4" class="sq-landing-feature-text sq-landing-feature-text-right d-flex align-items-center w-50">
					<div>
						<h3 class="mb-4">Membership Page</h3>
						<p>Create membership tiers<br>Post exclusive members-only content<br>Chat with your biggest fans</p>
					</div>
				</b-col>
				<b-col cols="0" lg="1"/>
			</b-row>
			<b-row no-gutters class="sq-landing-section sq-landing-section-features position-sticky blahblah">
				<b-col cols="0" lg="1" order-lg="1"/>
				<b-col cols="12" lg="4" class="sq-landing-feature-img sq-landing-feature-img-right d-flex align-items-center mb-5" order-lg="4">
					<b-img src="@/assets/feature-merch.svg" fluid/>
				</b-col>
				<b-col cols="0" lg="2" order-lg="3"/>
				<b-col cols="12" lg="4" class="sq-landing-feature-text sq-landing-feature-text-left d-flex align-items-center w-50" order-lg="2">
					<div>
						<h3 class="mb-4">Merchandise Store</h3>
						<p>Start selling merch with one click.<br>We handle everything from production, packaging, shipping, etc so that you can focus on creating content.</p>
					</div>
				</b-col>
				<b-col cols="0" lg="1" order-lg="5"/>
			</b-row>
			<b-row no-gutters class="sq-landing-section sq-landing-section-features my-5 py-5">
				<b-col cols="0" lg="1"/>
				<b-col cols="12" lg="4" class="sq-landing-feature-img sq-landing-feature-img-left d-flex align-items-center mb-5">
					<b-img src="@/assets/feature-freelance.svg" fluid/>
				</b-col>
				<b-col cols="0" lg="2">
				</b-col>
				<b-col cols="12" lg="4" class="sq-landing-feature-text sq-landing-feature-text-right d-flex align-items-center w-50">
					<div>
						<h3 class="mb-4">Freelance Marketplace</h3>
						<p>Get hired for commision work or projects.<br>Hire other talented creators and designers for all your needs.</p>
					</div>
				</b-col>
				<b-col cols="0" lg="1"/>
			</b-row-->
			<b-row no-gutters class="sq-landing-section my-5 py-5" align-h="center" align-v="center">
				<b-col cols="auto" lg="5" class="d-flex align-items-center justify-content-center py-5">
					<div class="sq-landing-text">
						<h1 class="mb-4">...and much more!</h1>
						<p class="mb-5">We know that every creator is unique, and so are their problems. Help us understand <i><b>you</b></i> better and develop custom strategies and tools for you.</p>
						<JoinWaitlist @emailSubmitted="email = $event"/>
					</div>
				</b-col>
			</b-row>
			<b-row no-gutters class="sq-landing-footer sq-landing-section" align-v="center" align-h="between">
				<b-col cols="2" class="sq-landing-footer-logo text-left">
					<b-img src="@/assets/squadrad_logo_with_name.png" fluid/>
				</b-col>
				<b-col cols="auto">
				</b-col>
				<b-col cols="4" lg="2" class="sq-landing-footer-contact">
					<h5>Contact</h5>
					<p>support@squadrad.com</p>
				</b-col>
			</b-row>
			<b-row no-gutters align-h="center" class="sq-landing-footer-copyright">
				<b-col>
					<p>Squadrad - © 2022 by Artibuno Pvt. Ltd.</p>
				</b-col>
			</b-row>
		</b-col>
		<router-view></router-view>
		<CustomModal modalId="sq-the-modal-pick-features" modalTitle="Features">
			<b-form @submit.prevent="submitFeatures">
				<div class="sq-text mb-2">Which features are you most excited about?</div>
				<b-form-checkbox-group class="sq-text" name="features" v-model="selectedFeatures" :options="[
					{ text: 'Membership Page', value: 'membership' },
					{ text: 'Merchandise Store', value: 'merch' },
					{ text: 'Freelance Marketplace', value: 'freelance' },
				]">
				</b-form-checkbox-group>
				<ButtonSubmit buttonText="Submit" modal :isProcessing="isSubmittingFeatures" :isProcessed="isSubmittedFeatures" buttonTextDone="Submitted"/>
			</b-form>
		</CustomModal>
	</b-row>
</template>

<script>
import beaconService from '../services/beacon.service';
import waitlistService from '../services/waitlist.service';
import JoinWaitlist from '../components/JoinWaitlist.vue';
import CustomModal from '../components/CustomModal.vue';
import ButtonSubmit from '../components/ButtonSubmit.vue';

export default {
	props: {
		isAuthenticated: Boolean,
	},
	data() {
		return {
			email: '',
			selectedFeatures: [],
			isSubmittingFeatures: false,
			isSubmittedFeatures: false,
			featuresScrollPercent: 0,
		};
	},
	methods: {
		redirectIfAuthenticated() {
			if (this.isAuthenticated) {
				this.$router.push('/feed');
			}
		},
		setFeaturesSectionFullHeight(totalDuration) {
			const animRate = 2;
			document.getElementById('sq-the-landing-features-full').style.height = `${(0.8 * totalDuration) / animRate}vh`;
		},
		submitFeatures() {
			console.log(this.selectedFeatures);
			waitlistService.submitFeatures(this.email, this.selectedFeatures).then((res) => {
				if (res && res.status === 200) {
					this.$bvToast.toast('Thank you, we\'ll get in touch with you shortly.', {
						noCloseButton: true,
						variant: 'success',
						toaster: 'b-toaster-bottom-center',
					});
					this.$bvModal.hide('sq-the-modal-pick-features');
				}
			}).catch(() => {
				this.$bvToast.toast('Network error. Please try again later.', {
					noCloseButton: true,
					variant: 'danger',
					toaster: 'b-toaster-bottom-center',
				});
			});
		},
	},
	watch: {
		isAuthenticated: 'redirectIfAuthenticated',
	},
	mounted() {
		if (this.$route.query.ref) {
			beaconService.landingTrigger(this.$route.query.ref);
		}
		document.body.classList.add('dark');

		document.onscroll = () => {
			const landingFeaturesFullEl = document.getElementById('sq-the-landing-features-full');
			const landingFeaturesStickyEl = document.getElementById('sq-the-landing-features-sticky');
			if (!landingFeaturesFullEl || !landingFeaturesStickyEl) {
				this.featuresScrollPercent = 0;
				return;
			}
			const rectFull = landingFeaturesFullEl.getBoundingClientRect();
			const rectSticky = landingFeaturesStickyEl.getBoundingClientRect();
			if (rectFull.top >= 0) {
				this.featuresScrollPercent = 0;
				return;
			}
			if (rectFull.bottom <= rectSticky.bottom) {
				this.featuresScrollPercent = 100;
				return;
			}
			this.featuresScrollPercent = Math.round(((-1 * rectFull.top) / (rectFull.height - rectSticky.height)) * 1000) / 10;
		};
	},
	destroyed() {
		document.body.classList.remove('dark');
	},
	components: {
		JoinWaitlist,
		LandingFeatures: () => import('../components/LandingFeatures.vue'),
		CustomModal,
		ButtonSubmit,
	},
};
</script>

<style lang="scss">

body.dark {
	background-color: #0E0F1A;
}

</style>

<style lang="scss" scoped>

#sq-the-app-body {
	color: $my-color-gray6;
}

.sq-landing-section {
	padding: 0 3rem;
}

.sq-landing-text {
	text-align: center;

	p {
		font-size: 1.05rem;
		font-weight: 300;
	}
}

#sq-the-landing-hero-img-div {
	padding: 4.5rem 0;
}

#sq-the-landing-hero-img-vignette {
	position: absolute;
	width: 110%;
	height: 110%;
	left: -5%;
	top: -5%;
	background: radial-gradient(50% 50% at 50% 50%, rgba(14, 15, 26, 0) 60.94%, #0E0F1A 100%);
}

#sq-the-landing-hero-img-halo {
	position: absolute;
	width: 110%;
	height: 110%;
	left: -5%;
	top: -5%;
	background: radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%);
}

#sq-the-landing-hero-text {
	width: 95%;
	margin: auto;
}

#sq-the-landing-features-full {
	width: 100vw;
	// height: 800vh;
}

#sq-the-landing-features-sticky {
	background-color: #0E0F1A;
	width: 100vw;
	height: 100vh;
	position: sticky;
	top: 0;
}

.sq-landing-feature-img {
	justify-content: center;
}

.sq-landing-feature-text {
	text-align: center;
	justify-content: center;

	div h3 {
		font-weight: 400;
	}

	div p {
		font-weight: 300;
	}
}

.sq-landing-footer {
	padding: 1rem;
	background-color: $my-color-dark;
}

.sq-landing-footer-contact {
	text-align: left;
	h5 {
		font-size: 0.75rem;
		font-weight: 300;
	}

	p {
		font-size: 0.5rem;
		font-weight: 300;
	}
}

.sq-landing-footer-copyright {
	background-color: $my-color-dark;

	p {
		color: $my-color-gray4;
		font-weight: 300;
		font-size: 0.5rem;
	}
}

@media (min-width: $lg) {
	#sq-the-landing-hero-img-div {
		padding: 4.5rem 2rem;
	}

	// .sq-landing-section-features {
	// 	height: 18.75rem;
	// }

	.sq-landing-feature-img-left {
		justify-content: flex-end;
	}

	.sq-landing-feature-img-right {
		justify-content: flex-start;
	}

	.sq-landing-feature-text-right {
		text-align: left;
		justify-content: flex-start;
	}

	.sq-landing-feature-text-left {
		text-align: right;
		justify-content: flex-end;
	}

	.sq-landing-footer {
		padding: 2.5rem;
	}

	.sq-landing-footer-logo {
		padding: 1.5rem;
	}

	.sq-landing-footer-contact {
		text-align: left;
		h5 {
			font-size: 1.25rem;
		}

		p {
			font-size: 1rem;
		}
	}

	.sq-landing-footer-copyright {
		p {
			font-size: 0.75rem;
		}
	}
}

</style>
