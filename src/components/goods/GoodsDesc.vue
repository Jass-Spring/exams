<style lang="scss">
	.goodsdesc-container {
		padding: 4px;

		h3 {
			margin: 15px 0;
			color: #226aff;
			font-size: 16px;
			text-align: center;
		}

		.content {
			img {
				width: 100%;
			}
		}
	}
</style>
<template>
	<div class="goodsdesc-container">
		<h3>{{ goodsDesc.title }}</h3>

		<hr>

		<div class="content" v-html="goodsDesc.content"></div>
	</div>
</template>
<script>
	import axios from 'axios';
	import { Toast } from 'mint-ui';

	export default {
		data() {
			return {
				id: this.$route.params.id,
				goodsDesc: {}
			};
		},
		created() {
			this.getGoodsDesc();
		},
		methods: {
			getGoodsDesc() {
				axios.get('/api/goods/getdesc/' + this.id)
				.then(response => {
					if (response.data.status === 0) {
						this.goodsDesc = response.data.message[0];
					} else {
						Toast('加载商品参数失败……');
					}
				})
				.catch(function (error) {
					Toast(error);
				});
			}
		}
	};
</script>