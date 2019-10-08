import VueRouter from 'vue-router';

import HomeContainer from './components/tabber/HomeContainer.vue';
import MemberContainer from './components/tabber/MemberContainer.vue';
import CartContainer from './components/tabber/CartContainer.vue';
import SearchContainer from './components/tabber/SearchContainer.vue';
import NewsList from './components/news/NewsList.vue';
import NewsInfo from './components/news/NewsInfo.vue';
import PhotoList from './components/photo/PhotoList.vue';
import PhotoInfo from './components/photo/PhotoInfo.vue';
import GoodsList from './components/goods/GoodsList.vue';
import GoodsInfo from './components/goods/GoodsInfo.vue';
import GoodsDesc from './components/goods/GoodsDesc.vue';

var router = new VueRouter({
	linkActiveClass: 'mui-active',
	routes: [
		{ path: '/', redirect: '/home' },
		{ path: '/home', component: HomeContainer },
		{ path: '/member', component: MemberContainer },
		{ path: '/cart', component: CartContainer },
		{ path: '/search', component: SearchContainer },
		{ path: '/home/newslist', component: NewsList },
		{ path: '/home/newsinfo/:id', component: NewsInfo },
		{ path: '/home/photolist', component: PhotoList },
		{ path: '/home/photoinfo/:id', component: PhotoInfo },
		{ path: '/home/goodslist', component: GoodsList },
		{ path: '/home/goodsinfo/:id', component: GoodsInfo, name: 'goodsinfo' },
		{ path: '/home/goodsdesc/:id', component: GoodsDesc, name: 'goodsdesc' }
	]
});

export default router;