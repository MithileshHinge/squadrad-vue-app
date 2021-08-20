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

Vue.directive('helptext', {
	inserted(el, binding, vnode) {
		let oldLabelEl = el;
		if (vnode.tag.indexOf('BFormGroup') >= 0 || vnode.tag.indexOf('FormInputGroup') >= 0) { // If node is a BFormGroup or FormInputGroup, apply helptext to legend inside it
			[oldLabelEl] = el.getElementsByTagName('legend');
		}
		const labelParentEl = oldLabelEl.parentElement;
		labelParentEl.removeChild(oldLabelEl);
		oldLabelEl.classList.add('mr-2', 'pb-0', 'w-auto');
		const NewLabelVue = Vue.extend({
			render(createElement) {
				return createElement('b-row', {
					props: {
						noGutters: true,
						alignV: 'center',
					},
					style: {
						paddingBottom: 'calc(0.375rem + 1px)',
					},
				}, [
					createElement('b-icon-question-circle-fill', {
						directives: [
							{
								name: 'b-tooltip',
								modifiers: {
									hover: true,
									html: true,
								},
								value: binding.value,
							},
						],
					}),
				]);
			},
		});
		const newLabel = new NewLabelVue();
		newLabel.$mount();
		newLabel.$el.prepend(oldLabelEl);
		labelParentEl.prepend(newLabel.$el);
	},
});
