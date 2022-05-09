<template>
	<b-card class="sq-form-card m-0 w-100 p-3" no-body>
		<b-media no-body>
			<b-media-aside vertical-align="center">
				<div style="width: 2.5rem; height: 2.5rem;" class="d-flex align-items-center justify-content-center">
					<b-icon-link45deg scale="2"/>
				</div>
				<!--b-img blank blank-color="#ccc" width="48" alt="placeholder"></b-img-->
			</b-media-aside>
			<b-media-body>
				<p class="sq-text mt-1 mb-0">{{hostname}}</p>
				<p class="sq-text-muted mb-0 sq-subtext text-left">{{url}}</p>
			</b-media-body>
		</b-media>
	</b-card>
</template>

<script>
export default {
	props: {
		url: String,
	},
	computed: {
		hostname() {
			let urlNormalized = this.url;
			if (!urlNormalized.startsWith('https://') && !urlNormalized.startsWith('http://')) urlNormalized = `https://${urlNormalized}`;
			let { hostname } = new URL(urlNormalized);
			if (hostname.startsWith('www.')) hostname = hostname.slice(4);
			return hostname.toUpperCase();
		},
	},
};

</script>
