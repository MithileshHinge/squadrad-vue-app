<template>
	<b-row id="sq-the-landing-features-section" no-gutters align-h="center" align-v="center">
		<b-col cols="0" lg="1"/>
		<b-col id="sq-the-img-container" cols="12" lg="5" class="d-flex justify-content-lg-end align-items-center mb-5 mb-lg-0 position-relative h-100">
			<div class="position-absolute">
				<div id="sq-the-member-img-container-halo">
					<div id="sq-the-member-img-container">
						<div id="sq-the-member-img-page">
							<div id="sq-the-member-img-page-bg">
								<div id="sq-the-member-img-page-bg-overlay"/>
								<b-img src="@/assets/feature-anim-members/page.svg" fluid/>
							</div>
							<div id="sq-the-member-img-squad">
								<div class="position-relative overflow-hidden" style="border-radius: 10px">
									<b-img src="@/assets/feature-anim-members/squad-low-noshadow.svg" fluid/>
									<div id="sq-the-member-img-squad-blur">
										<b-img src="@/assets/feature-anim-members/squad-low-blur2.svg" fluid/>
									</div>
									<div id="sq-the-member-img-squad-high-blur">
										<b-img src="@/assets/feature-anim-members/squad-high-blur2.svg" fluid/>
									</div>
									<div id="sq-the-member-img-squad-high">
										<b-img src="@/assets/feature-anim-members/squad-high.svg" fluid/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="sq-the-merch-img-container" class="position-absolute">
				<b-img class="invisible" src="@/assets/feature-anim-merch/tee.svg" fluid/>
				<div class="position-absolute h-100 w-100" style="top: 0;">
					<div id="sq-the-merch-img-3d-container">
						<div id="sq-the-merch-img-tee-container" class="position-absolute">
							<div class="sq-img-halo">
								<div id="sq-the-merch-img-tee">
									<b-img src="@/assets/feature-anim-merch/tee.svg" fluid/>
								</div>
							</div>
						</div>
						<div id="sq-the-merch-img-cup-container" class="position-absolute">
							<div class="sq-img-halo">
								<div id="sq-the-merch-img-cup">
									<b-img src="@/assets/feature-anim-merch/cup.svg" fluid/>
								</div>
							</div>
						</div>
						<div id="sq-the-merch-img-cap-container" class="position-absolute">
							<div class="sq-img-halo">
								<div id="sq-the-merch-img-cap">
									<b-img src="@/assets/feature-anim-merch/cap.svg" fluid/>
								</div>
							</div>
						</div>
						<div id="sq-the-merch-img-overlay" class="position-absolute"/>
					</div>
				</div>
			</div>
		</b-col>
		<b-col id="sq-the-text-container" cols="12" lg="5" class="sq-landing-feature-text d-flex align-items-center justify-content-lg-start w-50">
			<div id="sq-the-member-text">
				<h3 class="mb-4 text-lg-left">Membership Page</h3>
				<p class="text-lg-left">Create membership tiers<br>Post exclusive members-only content<br>Chat with your biggest fans</p>
			</div>
			<div id="sq-the-merch-text">
				<h3 class="mb-4 text-lg-left">Merchandise Store</h3>
				<p class="text-lg-left">Start selling merch with one click.<br>We handle everything from production, packaging, shipping, etc so that you can focus on creating content.</p>
			</div>
		</b-col>
		<b-col cols="0" lg="1"/>
	</b-row>
</template>

<script>
import anime from 'animejs/lib/anime.es';

const timeline = anime.timeline({
	autoplay: false,
	easing: 'easeOutExpo',
});

export default {
	props: {
		scrollPercent: Number,
	},
	mounted() {
		timeline
			.add({
				targets: '#sq-the-member-img-page',
				translateY: [0, '-34.37%'],
				delay: 100,
				duration: 300,
			})
			.add({
				targets: '#sq-the-member-img-page-bg',
				update: (anim) => {
					document.getElementById('sq-the-member-img-page-bg').style.filter = `blur(${10 * (anim.progress / 100)}px)`;
				},
				duration: 200,
			}, 400)
			.add({
				targets: '#sq-the-member-img-page-bg-overlay',
				opacity: [0, 0.4],
				duration: 300,
			}, 400)
			.add({
				targets: '#sq-the-member-img-squad',
				scale: 2.2,
				translateX: '43.4%',
				translateY: '-28.2%',
				duration: 500,
			}, 400)
			.add({
				targets: '#sq-the-member-img-squad-blur',
				opacity: 1,
				duration: 50,
			}, 400)
			.add({
				targets: '#sq-the-member-img-squad-high-blur',
				opacity: 1,
				duration: 50,
			}, 450)
			.add({
				targets: '#sq-the-member-img-squad-high',
				opacity: 1,
				duration: 100,
			}, 500)
			.add({
				targets: '#sq-the-member-img-container-halo',
				opacity: 0,
				translateY: '-30%',
				duration: 200,
			}, 900)
			.add({
				targets: '#sq-the-member-text',
				opacity: 0,
				duration: 200,
				easing: 'linear',
			}, 900)
			.add({
				targets: '#sq-the-merch-img-container',
				opacity: 1,
				translateY: ['30%', '0%'],
				duration: 200,
			}, 1100)
			.add({
				targets: '#sq-the-merch-text',
				opacity: 1,
				duration: 200,
				easing: 'linear',
			}, 1100)
			.add({
				targets: '#sq-the-merch-img-tee-container',
				translateX: ['-50%', '-100%'],
				translateZ: ['0rem', '-1rem'],
				duration: 200,
			}, 1300)
			.add({
				targets: '#sq-the-merch-img-cup-container',
				translateX: ['0%', '-50%'],
				translateZ: ['-1rem', '0rem'],
				duration: 200,
			}, 1300)
			.add({
				targets: '#sq-the-merch-img-cap-container',
				translateX: ['-100%', '0%'],
				translateZ: ['-1rem', '-1rem'],
				duration: 200,
			}, 1300)
			.add({
				targets: '#sq-the-merch-img-cup-container',
				translateX: ['-50%', '-100%'],
				translateZ: ['0rem', '-1rem'],
				duration: 200,
			}, 1500)
			.add({
				targets: '#sq-the-merch-img-cap-container',
				translateX: ['0%', '-50%'],
				translateZ: ['-1rem', '0rem'],
				duration: 200,
			}, 1500)
			.add({
				targets: '#sq-the-merch-img-tee-container',
				translateX: ['-100%', '0%'],
				translateZ: ['-1rem', '-1rem'],
				duration: 200,
			}, 1500);

		this.$emit('totalDuration', timeline.duration);
	},
	watch: {
		scrollPercent() {
			timeline.seek((this.scrollPercent / 100) * timeline.duration);
		},
	},
};
</script>

<style lang="scss" scoped>

#sq-the-landing-features-section {
	margin: 3.375rem 0 0 0;
	width: 100%;
	height: 100%;
}

#sq-the-text-container {
	text-align: center;
	justify-content: center;

	div h3 {
		font-weight: 400;
	}

	div p {
		font-weight: 300;
	}
}

#sq-the-img-container {
	right: 3rem;
}

#sq-the-text-container {
	left: 3rem;
}

#sq-the-member-img-container-halo {
	position: relative;
	&::after {
		content: '';
		background-color: $my-color-gray7;
		filter: blur(20px);
		opacity: 0.4;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: -10;
	}
}

#sq-the-member-img-container {
	height: 20rem;
	overflow: hidden;
	border-radius: 20px;
}

#sq-the-member-img-page-bg {
	filter: blur(0px);
}

#sq-the-member-img-page-bg-overlay {
	background: $my-color-dark;
	z-index: 10;
	position: absolute;
	width: 100%;
	height: 100%;
	opacity: 0;
}

#sq-the-member-img-squad {
	position: absolute;
	top: 65.79%;
	left: 6.18%;
	width: 30.1%;
	box-shadow: 0px 10px 25px rgba(39, 38, 53, 0.12);
}

#sq-the-member-img-squad-blur, #sq-the-member-img-squad-high-blur, #sq-the-member-img-squad-high {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	opacity: 0;
}

#sq-the-merch-text {
	opacity: 0;
}

#sq-the-merch-img-3d-container {
	position: relative;
	transform-style: preserve-3d;
	perspective: 10rem;
	height: 100%;
	width: 100%;
}

#sq-the-merch-img-container {
	opacity: 0;
}

.sq-img-halo {
	position: relative;
	&::after {
		content: '';
		background-color: $my-color-gray7;
		filter: blur(20px);
		opacity: 0.2;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: -10;
	}
}

#sq-the-merch-img-tee-container {
	transform: translateX(-50%);
	filter: drop-shadow(0px 20px 20px rgba(28, 31, 51, 0.4));
}

#sq-the-merch-img-cup-container {
	top: 0;
	transform: translateZ(-1rem);
	filter: drop-shadow(0px 20px 20px rgba(28, 31, 51, 0.4));
}

#sq-the-merch-img-cap-container {
	transform: translateX(-100%) translateZ(-1rem);
	filter: drop-shadow(0px 20px 20px rgba(28, 31, 51, 0.4));
}

#sq-the-merch-img-overlay {
	background: #0E0F1A;
	width: 200%;
	height: 100%;
	right: 0;
	opacity: 0.4;
	transform: translateZ(-0.5rem);
}

@media (min-width: $lg) {
	#sq-the-text-container div {
		position: absolute;
		left: 0;
		max-width: 24rem;
	}
}

</style>
