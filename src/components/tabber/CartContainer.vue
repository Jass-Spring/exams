<style lang="scss" scoped>
	.cart-container {
		.cart-list {
			overflow: hidden;
			background-color: #eee;

			.mui-card-content-inner {
				display: flex;
				align-items: center;
			}

			img {
				width: 60px;
				height: 60px;
			}

			.info {
				h1 {
					font-size: 13px;
				}

				.price {
					color: red;
					font-weight: bold;

				}

				.mui-numbox {
					height: 25px;
				}
			}
		}
	}
</style>

<template>
	<div class="cart-container">
		<div class="cart-list">
			<div class="mui-card" v-for="item in $store.state.cart" :id="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch v-model="item.selected"></mt-switch>

						<img :src="item.img_src">

						<div class="info">
							<h1>{{ item.title }}</h1>

							<p>
								<span class="price">￥{{ item.price }}</span>
								<div></div>
								<a href="#">删除</a>
							</p>

								<!-- <div> -->
									<!-- <button class="mui-btn mui-btn-numbox-minus" type="button">-</button> -->
									<!-- <input id="test" class="mui-input-numbox" type="number" :value="item.count"/> -->
									<!-- <button class="mui-btn mui-btn-numbox-plus" type="button">+</button> -->
								<!-- </div> -->

								
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import { Toast } from 'mint-ui';
	import mui from '../../lib/mui/js/mui.min.js';

	export default {
		data() {
			return {}
		},
		created() {
			this.getThumImages();
		},
		mounted() {
			mui('.mui-numbox').numbox();
		},
		methods: {
			getThumImages() {
				var ids = [];
				this.$store.state.cart.forEach(item => {
					ids.push(item.id);
				});

				axios.get('/api/goods/getshopcarlist/' + ids.join(','))
				.then(response => {
					if (response.data.status === 0) {
						response.data.message.forEach(item => {
							this.$store.commit('updateGoods', item);
						});
					} else {
						Toast('加载图片列表失败……');
					}
				})
				.catch(function (error) {
					Toast(error);
				});
			}
		}
	}
</script>