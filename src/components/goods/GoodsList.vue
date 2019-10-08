<style lang="scss" scoped>
	.goods-list {
		padding: 7px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.goods-item {
			width: 49%;
			margin: 4px 0;
			border: 1 solid #ccc;
			box-shadow: 0 0 8px #ccc;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			img {
				width: 100%;
			}

			.title {
				width: 100%;
				font-size: 14px;
				overflow: hidden;
				word-break: keep-all;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			.info {
				margin: 2px;
				background-color: #eee;

				p {
					margin: 0;
					padding: 5px;
				}

				.price {
					.now {
						color: red;
						font-size: 16px;
						font-weight: bold;
					}
					.old {
						font-size: 12px;
						margin-left: 10px;
						text-decoration: line-through;
					}
				}

				.sell {
					display: flex;
					justify-content: space-between;

					span {
						font-size: 12px;
					}
				}
			}
		}
	}
</style>
<template>
	<div class="goods-list">
		<div class="goods-item" v-for="item in goodsList" :key="item.id" @click="goDetails(item.id)">
			<img :src="item.img_url">

			<h1 class="title">{{ item.title }}</h1>
			
			<div class="info">
				<p class="price">
					<span class="now">￥{{ item.sell_price }}</span>
					<span class="old">￥{{ item.market_price }}</span>
				</p>

				<p class="sell">
					<span>热卖中</span>
					<span>剩{{ item.stock_quantity }}件</span>
				</p>
			</div>
		</div>

		<mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
	</div>
</template>
<script>
	import { Toast } from 'mint-ui';
	import axios from 'axios';

	export default {
		data() {
			return {
				pageIndex: 1,
				goodsList: []
			};
		},
		created() {
			this.getGoodsList();
		},
		methods: {
			getMore() {
				this.pageIndex++;
				this.getGoodsList();
			},
			getGoodsList() {
				axios.get('/api/getgoods?pageindex=' + this.pageIndex)
				.then(response => {
					if (response.data.status === 0) {
						this.goodsList = this.goodsList.concat(response.data.message);
					} else {
						Toast('加载商品列表失败……');
					}
				})
				.catch(function (error) {
					Toast(error);
				});
			},
			goDetails(id) {
				// vue 中的 编程式导航
				// 等同于 '/home/goodsinfo/87
				// this.$router.push('/home/goodsinfo/' + id);
				// 等同于 '/home/goodsinfo/87
				this.$router.push({ name: 'goodsinfo', params: { id: id } });
				// 等同于 '/home/goodsinfo/87
				// 注：使用 path 属性时，params 属性会被忽略
				// this.$router.push({ path: '/home/goodsinfo/' + id });
				// 等同于 '/home/goodsinfo?id=87
				// this.$router.push({ path: '/home/goodsinfo', query: { id: id } });
			}
		}
	};
</script>