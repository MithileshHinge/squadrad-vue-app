import '@babel/polyfill';
import 'mutationobserver-shim';
import 'animate.css';
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import './plugins/bootstrap-vue';
import store from './store';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.use(Vuelidate);

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
