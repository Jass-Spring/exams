import Vue from 'vue';
// import Vue from '../node_modules/vue/dist/vue.js';
import VueX from 'vuex';
import VueRouter from 'vue-router';
import VuePreview from 'vue-preview';
import axios from 'axios';
import moment from 'moment';
import MintUI from 'mint-ui';

import app from'./App.vue';

import router from './router.js';

// import './css/common.scss';
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';
import 'mint-ui/lib/style.css';

Vue.use(VueX);
Vue.use(VueRouter);
Vue.use(VuePreview);
Vue.use(MintUI);

// 按需加载，懒加载的默认图片无法显示，改为全加载
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);

var cart = JSON.parse(localStorage.getItem('cart') || '[]');
const store = new VueX.Store({
	state: {
		cart: cart
	},
	mutations: {
		addGoods(state, goods) {
			var i = state.cart.findIndex(item => {
				return item.id == goods.id;
			});

			if (i > -1) {
				state.cart[i].count += goods.count;
			} else {
				state.cart.push(goods);
			}

			localStorage.setItem('cart', JSON.stringify(state.cart));
		},
		increment(state) {
		},
		reduction(state) {
		},
		updateGoods(state, info) {
			var i = state.cart.findIndex(value => {
				return value.id == info.id;
			});

			if (i > -1) {
				state.cart[i].title = info.title;
				state.cart[i].img_src = info.thumb_path;
			}

			localStorage.setItem('cart', JSON.stringify(state.cart));
		}
	},
	getters: {
		getSum: state => {
			var sum = 0;
			state.cart.forEach(item => {
				sum += item.count;
			});
			return sum;
		}
	}
});

Vue.filter('dateFormat', function(dateStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
	return moment(dateStr).format(pattern);
});

axios.defaults.baseURL = 'http://www.liulongbin.top:3005';

var vm = new Vue({
	el: '#app',
	data: {
		msg: 'ok'
	},
	render: createElements => createElements(app),
	router,
	store
});