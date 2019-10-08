<style lang="scss" scoped>
	.goodsinfo-container {
		overflow: hidden;
		background-color: #eee;
		position: relative;

		.now_price {
			color: red;
			font-size: 16px;
			font-weight: bold;
		}

		.mui-card-footer {
			display: block;

			button {
				margin: 10px 0;
			}
		}

		.ball {
			top: 350px;
			left: 148px;
			width: 15px;
			height: 15px;
			border-radius: 50%;
			background-color: red;
			position: absolute;
		}
	}
</style>
<template>
	<div class="goodsinfo-container">
		<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<swipe :list="swipeList" :isfull="false"></swipe>
				</div>
			</div>
		</div>

		<div class="mui-card">
			<div class="mui-card-header">{{ goodsInfo.title }}</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p class="price">
						市场价：<del>￥{{ goodsInfo.market_price }}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{ goodsInfo.sell_price }}</span>
					</p>
					<p>购买数量：<number-box @getcount="getSelectCount" :max="goodsInfo.stock_quantity"></number-box></p>
					<p>
						<mt-button type="primary" size="small">立即购买</mt-button>
						<mt-button type="danger" size="small" @click="addCart">加入购物车</mt-button>
					</p>
				</div>
			</div>
		</div>

		<div class="mui-card">
			<div class="mui-card-header">商品参数</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p>商品货号：{{ goodsInfo.goods_no }}</p>
					<p>库存情况：{{ goodsInfo.stock_quantity }}</p>
					<p>上架时间：{{ goodsInfo.add_time | dateFormat }}</p>
				</div>
			</div>
			<div class="mui-card-footer">
				<mt-button type="primary" size="large" plain @click="goDesc">图文介绍</mt-button>
				<mt-button type="danger" size="large" plain>商品评价</mt-button>
			</div>
		</div>

		<transition
			@before-enter="beforeEnter"
			@enter="enter"
			@after-enter="afterEnter">
			<div class="ball" v-show="ballFlag"></div>
		</transition>
	</div>
</template>
<script>
	import axios from 'axios';
	import { Toast } from 'mint-ui';

	import Swipe from '../subcomponents/Swipe.vue';
	import NumberBox from '../subcomponents/NumberBox.vue';

	export default {
		data() {
			return {
				id: this.$route.params.id,
				selectCount: 1,
				ballFlag: false,
				swipeList: {},
				goodsInfo: {}
			};
		},
		created() {
			this.getThumImages();
			this.getGoodsInfo();
		},
		methods: {
			getThumImages() {
				axios.get('/api/getthumimages/' + this.id)
				.then(response => {
					if (response.data.status === 0) {
						response.data.message.forEach(item => {
							item.img = item.src;
						});
						this.swipeList = response.data.message;
					} else {
						Toast('加载图片列表失败……');
					}
				})
				.catch(function (error) {
					Toast(error);
				});
			},
			getGoodsInfo() {
				axios.get('/api/goods/getinfo/' + this.id)
				.then(response => {
					if (response.data.status === 0) {
						this.goodsInfo = response.data.message[0];
					} else {
						Toast('加载商品参数失败……');
					}
				})
				.catch(function (error) {
					Toast(error);
				});
			},
			addCart() {
				this.ballFlag = !this.ballFlag;
			},
			beforeEnter(el) {
				el.style.transform = 'translate(0, 0)';
			},
			enter(el, done) {
				var ballPos = el.getBoundingClientRect();
				var badgePos = document.getElementById('badge').getBoundingClientRect();
				var x = badgePos.left - ballPos.left;
				var y = badgePos.top - ballPos.top;
				el.style.transform = `translate(${x}px, ${y}px)`;
				el.style.transition = 'all 1s cubic-bezier(.32,-0.5,1,.47)';
				done();
			},
			afterEnter(el) {
				this.ballFlag = !this.ballFlag;
			},
			getSelectCount(count) {
				this.selectCount = count;
				console.log(this.selectCount);
			},
			goDesc() {
				this.$router.push({ name: 'goodsdesc', params: { id: this.id } });
			}
		},
		components: {
			'swipe': Swipe,
			'number-box': NumberBox
		}
	};
</script>