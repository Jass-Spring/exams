<template>
	<div>
		<!-- <mt-swipe :auto="4000">
			<mt-swipe-item v-for="item in swipeList" :key="item.id">
				<img :src="item.img">
			</mt-swipe-item>
		</mt-swipe> -->
		<swipe :list="swipeList" :isfull="true"></swipe>

		<ul class="mui-table-view mui-grid-view mui-grid-9">
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<router-link to="/home/newslist">
					<img src="../../images/menu1.png">
					<div class="mui-media-body">新闻资讯</div>
				</router-link>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<router-link to="/home/photolist">
					<img src="../../images/menu2.png"></img>
					<div class="mui-media-body">图片分享</div>
				</router-link>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<router-link to="/home/goodslist">
					<img src="../../images/menu3.png"></img>
					<div class="mui-media-body">商品购买</div>
				</router-link>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<a href="#">
					<img src="../../images/menu4.png"></img>
					<div class="mui-media-body">留言反馈</div>
				</a>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<a href="#">
					<img src="../../images/menu5.png"></img>
					<div class="mui-media-body">视频专区</div>
				</a>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<a href="#">
					<img src="../../images/menu6.png"></img>
					<div class="mui-media-body">联系我们</div>
				</a>
			</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
	/*.mint-swipe {
		height: 200px;

		.mint-swipe-item {
			img {
				width: 100%;
				height: 100%;
			}
		}
	}*/

	.mui-grid-view.mui-grid-9 {
		border: none;
		background-color: white;
	}

	.mui-grid-view.mui-grid-9 .mui-table-view-cell {
		border: none;

		img {
			width: 60px;
			height: 60px;
		}
		div {
			font-size: 12px;
		}
	}
</style>

<script>
	import { Toast } from 'mint-ui';
	import axios from 'axios';
	import Swipe from '../subcomponents/Swipe.vue';

	export default {
		data() {
			return {
				swipeList: []
			};
		},
		created() {
			this.getSwipe();
		},
		methods: {
			getSwipe() {
				axios.get('/api/getlunbo')
				.then(response => {
					if (response.data.status === 0) {
						this.swipeList = response.data.message;
					} else {
						Toast('加载轮播图失败……');
					}
				})
				.catch(function (error) {
					Toast(error);
				});
			}
		},
		components: {
			'swipe': Swipe
		}
	};
</script>