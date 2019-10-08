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

const store = new VueX.Store({
	state: {
		count: 1
	},
	mutations: {
		increment(state) {
			state.count++;
		},
		reduction(state) {
			state.count--;
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