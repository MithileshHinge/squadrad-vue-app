module.exports = {
	css: {
		loaderOptions: {
			sass: {
				// eslint-disable-next-line quotes
				additionalData: `@import "@/scss/global.scss";`,
			},
		},
	},
	chainWebpack: (config) => {
		config.module
			.rule('vue')
			.use('vue-loader')
			.loader('vue-loader')
			.tap((options) => {
				// eslint-disable-next-line no-param-reassign
				options.transformAssetUrls = {
					video: ['src', 'poster'],
					source: 'src',
					img: 'src',
					image: 'xlink:href',
					'b-avatar': 'src',
					'b-img': 'src',
					'b-img-lazy': ['src', 'blank-src'],
					'b-card': 'img-src',
					'b-card-img': 'src',
					'b-card-img-lazy': ['src', 'blank-src'],
					'b-carousel-slide': 'img-src',
					'b-embed': 'src',
				};

				return options;
			});
	},
	devServer: {
		proxy: {
			'^/api/public': {
				target: 'http://localhost:3000',
				secure: false,
				changeOrigin: true,
				pathRewrite: {
					'^/api/public': '/public',
				},
				logLevel: 'debug',
			},
			'^/api/private': {
				target: 'http://localhost:3000',
				secure: false,
				changeOrigin: true,
				pathRewrite: {
					'^/api/private': '/private',
				},
				logLevel: 'debug',
			},
		},
	},
};
