<template>
	<div id="app">
		<TopNavbar :isAuthenticated="isAuthenticated" :isCreator="isCreator"></TopNavbar>
		<b-col cols="auto" class="p-0" style="z-index: -1000;">
			<div style="width: 100%; height: 3.375rem" />
		</b-col>
		<b-col class="p-0">
			<router-view id="sq-the-app-body" :isAuthenticated="isAuthenticated"></router-view>
		</b-col>
		<b-col cols="auto" style="z-index: 100; z-index: -1000;">
			<div v-if="isAuthenticated && showBottomNav" style="height: 3rem;"><!-- empty div same size as bottomnavbar, without this router-view is hidden behind bottomnavbar --></div>
		</b-col>
		<BottomNavbar v-if="isAuthenticated && showBottomNav" :isCreator="isCreator"></BottomNavbar>
	</div>
</template>

<script>
import TopNavbar from '@/components/TopNavbar.vue';
import BottomNavbar from '@/components/BottomNavbar.vue';

export default {
	components: {
		TopNavbar,
		BottomNavbar,
	},
	computed: {
		isAuthenticated() {
			return !!this.$store.state.user.userId;
		},
		isCreator() {
			return !!this.$store.state.creator.userId;
		},
		showBottomNav() {
			const showPaths = ['/feed/', '/explore/', '/notifications/', '/messages/', '/creator/'];
			if (showPaths.includes(this.$route.path) || showPaths.includes(`${this.$route.path}/`)) {
				return true;
			}
			return false;
		},
	},
};
</script>

<style lang="scss">

html {
	font-size: 18px;
	min-height: 100%;
	height: 100%;
}

/*
@media (min-width: 576px) {
	html {
		font-size: 20px;
	}
}

@media (min-width: 768px) {
	html {
		font-size: 22px;
	}
}

@media (min-width: 992px) {
	html {
		font-size: 24px;
	}
}

@media (min-width: 1200px) {
	html {
		font-size: 26px;
	}
}
*/

body {
	min-height: 100%;
	height: 100%;
	font-family: Poppins, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: $my-color-dark;
	//background-color: $my-color-gray8;
}

#app {
	position: relative;
	min-height: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
}

#sq-the-app-body {
	min-height: 100%;
	// margin-top: 3.375rem;
}

/* --------------- Form --------------- */
$placeholder-color: rgba($color: $my-color-dark, $alpha: 0.33);

.form-control::-webkit-input-placeholder {
  color: $placeholder-color;
}
.form-control:-moz-placeholder {
  color: $placeholder-color;
}
.form-control::-moz-placeholder {
  color: $placeholder-color;
}
.form-control::placeholder {
  color: $placeholder-color;
}
.form-control:-ms-input-placeholder {
  color: $placeholder-color;
}

.custom-control-input:checked ~ .custom-control-label::before {
	border-color: $french-rose;
	background-color: $french-rose;
}

.custom-control-input:focus:not(:checked) ~ .custom-control-label::before {
    border-color: $radical-red;
}

.custom-control-input:focus~.custom-control-label::before {
	box-shadow: 0 0 0 0.2rem rgba($color: $french-rose, $alpha: 0.25);
}

// Aligns toggle switches with label
.custom-switch.b-custom-control-lg, .input-group-lg .custom-switch {
	top: -0.125rem;
}

/* --------------- End Form --------------- */

/* --------------- Modal --------------- */
.modal-backdrop {
	background-color: $my-color-dark;
}

.modal-content {
	border-radius: 1.11rem;
	border: none;
	background-color: $my-color-gray8;
}

.modal-header {
	border-bottom: none;
	padding-bottom: 0;
}

.modal-footer {
	display:none;
}
/* --------------- End Modal --------------- */

.sq-page-title {
	padding-top: 1.5rem;
	padding-bottom: 1.5rem;
	font-size: 1.25rem;
	font-weight: 500;
}

.sq-nav-item .nav-link {
	color: $my-color-gray2;
	border: none;
	text-align: center;
	margin-bottom: 0;
}

.sq-nav-item .nav-link.active {
	color: $my-color-dark;
}

/* --------------- Close icon --------------- */
.sq-close-icon-bar, .sq-close-icon-bar::after {
	display: block;
	width: 1rem;
	height: 0.0625rem;
	background-color: $my-color-gray3;
}

.sq-close-icon-bar {
	margin-top: 0.375rem;
	margin-bottom: 0.375rem;
	transform: rotate(45deg);
	&::after {
		content: '';
		transform: rotate(-90deg);
	}
}
/* --------------- End close icon --------------- */

.sq-btn {
	background-color: #ffffff;
	background-position: 80%;
	background-size: 200%;
	background-image: linear-gradient(45deg, rgba($color: $my-color-gray5, $alpha: 0.0) 5%, rgba($color: $my-color-gray5, $alpha: 0.2) 23%, rgba($color: $my-color-gray5, $alpha: 0.8) 28%, rgba($color: $my-color-gray5, $alpha: 0.8) 35%, rgba($color: $my-color-gray5, $alpha: 0.0) 41%);
	background-repeat: no-repeat;
	color: $my-color-gray1;
	border: none;
	border-radius: 50px;
	font-size: 0.8125rem;
	padding: 0.5rem 1rem;
	line-height: 1.25rem;
	&:focus {
		background-color: #ffffff;
		color: $my-color-gray1;
	}
	&:hover {
		background-color: $my-color-gray1;
		color: #ffffff;
		background-position-x: -80%;
		transition: background-position 1s ease, background-image 0.4s ease, background-color 0.4s ease;
	}
	&:not(:disabled):not(.disabled):active {
		background-color: #ffffff;
		color: $my-color-gray1;
		box-shadow: none;
		background-position-x: -80%;
		transition: background-position 1s ease, background-image 0.4s ease, background-color 0.4s ease;
	}
}

// if browser supports hover (not touch-screen): this is to prevent sticky hover state on touch-screen devices
@media (hover: hover) {
	.sq-btn:hover, .sq-btn:focus {
		background-color: $my-color-gray1;
		color: #ffffff;
		background-position-x: -80%;
		transition: background-position 1s ease, background-image 0.4s ease, background-color 0.4s ease;
	}
}

$cta-shadow-x: 0.2rem;
$cta-shadow-y: 0.4rem;
$cta-shadow-blur: 0.6rem;
$cta-shadow-opacity: 0.4;
.sq-btn-cta {
	color: #ffffff;
	position: relative;
	z-index: 0;
	background-color: transparent;
	background-position-x: 200%;
	background-size: 200%;
	background-repeat: repeat-x;
	transition: background-position-x 0.5s;
	&::after {
		content: '';
		position: absolute;
		opacity: $cta-shadow-opacity;
		filter: blur($cta-shadow-blur);
		z-index: -1;
		top: $cta-shadow-y;
		bottom: -$cta-shadow-y;
		left: $cta-shadow-x;
		right: -$cta-shadow-x;
		background-color: inherit;
		background-image: inherit;
		background-position-x: inherit;
		background-size: inherit;
	}
	&:focus {
		color: #ffffff;
		background-color: transparent;
		box-shadow: none;
	}
	&:hover {
		color: #ffffff;
		background-color: transparent;
		background-image: inherit;
		background-position-x: 200%;
		transition: background-position-x 0.5s;
		box-shadow: none;
		filter: brightness(1.1);
	}
	&:not(:disabled):not(.disabled):active {
		color: #ffffff;
		background-color: transparent;
		background-image: inherit;
		background-position-x: 0%;
		transition: background-position-x 0.5s;
		box-shadow: none;
	}
}

// if browser supports hover (not touch-screen): this is to prevent sticky hover state on touch-screen devices
@media (hover: hover) {
	.sq-btn-cta:hover, .sq-btn-cta:focus {
		color: #ffffff;
		background-color: transparent;
		background-image: inherit;
		background-position-x: 0%;
		transition: background-position-x 0.5s;
		box-shadow: none;
		filter: brightness(1.1);
	}
}

.sq-btn-disabled {
	background: none;
	background-color: $my-color-gray5  !important;
	color: $my-color-gray1 !important;
	box-shadow: none !important;
	&:focus {
		background-color: $my-color-gray5 !important;
		color: $my-color-gray1 !important;
	}
	&:hover {
		background-color: $my-color-gray5 !important;
		color: $my-color-gray1 !important;
	}
}

@media (hover: hover) {
	.sq-btn-disabled:hover, .sq-btn-disabled:focus {
		background-color: $my-color-gray5;
		color: $my-color-gray1;
		box-shadow: none;
	}
}

.sq-btn-change-profile-pic, .sq-btn-change-profile-pic:focus, .sq-btn-change-profile-pic:hover, .sq-btn-change-profile-pic:not(:disabled):not(.disabled):active:focus, .sq-btn-change-profile-pic:not(:disabled):not(.disabled):active {
	position: absolute;
	width: 100%;
	top: 60%;
	bottom: 0;
	border: 1px solid rgba($color: $my-color-light, $alpha: 0.25);
	background-color: rgba($color: $my-color-gray2, $alpha: 0.25);
	backdrop-filter: blur(5px);
	color: $my-color-light;
	box-shadow: none;
	transition: font-size 0.1s;
	&:active {
		font-size: 120%;
	}
}

// if browser supports hover (not touch-screen): this is to prevent sticky hover state on touch-screen devices
@media (hover: hover) {
	.sq-btn-change-profile-pic:hover {
		font-size: 120%;
	}
}

.sq-modal-form-input {
	font-weight: 300;
	font-size: 0.8125rem;
	line-height: 1.25rem;
	background-color: $my-color-gray6;
	color: $my-color-gray1;
	border: none;
	border-radius: 50px;
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
	transition: 0.5s;
	&:focus {
		box-shadow: 0 0 0 0.0625rem $french-rose;
		color: $my-color-gray1;
	}
}

.sq-form-input {
	font-weight: 300;
	font-size: 1rem;
	line-height: 1.25rem;
	background-color: $my-color-gray6;
	color: $my-color-gray1;
	border: none;
	border-radius: 50px;
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
	transition: 0.5s;
	&:focus {
		box-shadow: 0 0 0 0.0625rem $french-rose;
		color: $my-color-gray1;
	}
}

.sq-form-invalid-feedback {
	font-size: 0.625rem;
	text-align: left;
	margin-left: 0.75rem;
	width: auto;
	color: $radical-red;
}

.sq-form-section {
	margin-bottom: 1.5rem;
	padding: 1.5rem 1.5rem 0 1.5rem;
	border-top: 1px solid $my-color-gray5;
}

.sq-form-card {
	margin: 1.25rem;
	border-radius: 1.28rem;
	background-color: $my-color-light;
}

.sq-form-label {
	font-size: 1rem;
	font-weight: 400;
	color: $my-color-dark;
	letter-spacing: -0.01em;
}

.sq-form-textarea {
	font-weight: 300;
	font-size: 1rem;
	background-color: $my-color-gray6;
	color: $my-color-gray1;
	border: none;
	border-radius: 1.28rem;
	padding: 1rem;
	transition: 0.5s;
	&:focus {
		box-shadow: 0 0 0 0.0625rem $french-rose;
		color: $my-color-gray1;
	}
}

.sq-modal-form-textarea {
	font-size: 0.8125rem;
	border-radius: 1.04rem;
	padding: 0.5rem 0.75rem;
}

.sq-menu-item .nav-link {
	font-size: 1.25rem;
	padding: 1.875rem 0 0 1.25rem;
	font-weight: 300;
	color: $my-color-gray1 !important;
	text-align: left;
}

.sq-menu-icon {
	margin-right: 0.5em;
}

.sq-link, .sq-link:hover {
	color: $radical-red !important;
}

.sq-carousel .carousel-control-prev-icon::before, .sq-carousel .carousel-control-next-icon::before {
	content: '';
	width: 28px;
	height: 28px;
	background-color: $my-color-dark;
	padding: 4px;
	border-radius: 50%;
}

.sq-carousel .carousel-indicators li {
	width: 4px;
	height: 4px;
	background-color: $my-color-dark;
	border-radius: 50%;
}

.sq-card {
	border: none;
	border-radius: 1.11rem;
	min-width: 18.75rem;
	max-width: 18.75rem;
	box-shadow: 4px 10px 25px 0 rgba($color: $my-color-dark, $alpha: 0.10);
}

.sq-card-flat {
	border: none;
	border-radius: 1.11rem;
	background-color: $my-color-gray7;
	box-shadow: none;
}

.sq-card-flat-lg {
	border-radius: 1.28rem;
}

.sq-card-heading {
	display: flex;
	align-items: center;
	font-size: 1rem;
	font-weight: 500;
	color: $my-color-dark;
	letter-spacing: -0.01em;
}

.sq-card-btn {
	width: 13.75rem;
}

.sq-empty-state-img-full {
	height: 35vh;
	margin-top: 9vh;
	margin-bottom: 3rem;
}

.sq-empty-state-text {
	width: 100%;
	text-align: center;
}

.sq-btn-empty-state {
	margin-top: 1.25rem;
}

.bi-heart-fill {
	color: $radical-red;
}

.sq-flowendpage {
	padding: 4rem 1rem;
}

.sq-flowendpage-container {
	padding: 3rem;
	background-color: $my-color-light;
	border-radius: 1.11rem;
}

.sq-flowendpage-title {
	font-size: 1.25rem;
	font-weight: 400;
	text-align: center;
	color: $my-color-dark;
}

.sq-flowendpage-text {
	font-size: 0.875rem;
	font-weight: 300;
	text-align: center;
	color: $my-color-dark;
	padding-top: 2rem;
}

.sq-rupee::before {
	content: '₹';
	font-family: Lato;
	font-weight: 400;
}

.sq-background-gray {
	background-color: $my-color-gray7;
}

.sq-text {
	font-size: 0.875rem;
	font-weight: 300;
	text-align: left;
	color: $my-color-dark;
}

.sq-subtext {
	font-size: 0.75rem;
	color: $my-color-gray2;
}

.sq-muted {
	color: $my-color-gray2 !important;
}

.sq-font-regular {
	font-weight: 400 !important;
}

.sq-color-danger {
	color: $my-color-danger !important;
}

.sq-shadow {
	box-shadow: 2px 8px 15px rgba($color: $my-color-dark, $alpha: 0.15) !important;
}

</style>
