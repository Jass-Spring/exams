<style lang="scss">
	.newsinfo-container {
		padding: 0 4px;

		.title {
			color: red;
			font-size: 14px;
			text-align: center;
		}

		.subtitle {
			color: #26a2ff;
			font-size: 12px;
			display: flex;
			justify-content: space-between;
		}

		.content {
			font-size: 13px;

			img {
				width: 100%;
			}
		}
	}
</style>
<template>
	<div class="newsinfo-container">
		<h1 class="title">{{ newsInfo.title }}</h1>
		<p class="subtitle">
			<span>发表时间：{{ newsInfo.add_time | dateFormat }}</span>
			<span>点击{{ newsInfo.click }}次</span>
		</p>
		<hr>
		<div class="content" v-html="newsInfo.content"></div>

		<comment-box :id="this.id"></comment-box>
	</div>
</template>
<script>
	import axios from 'axios';
	import { Toast } from 'mint-ui';

	import Comment from '../subcomponents/Comment.vue';

	export default {
		data() {
			return {
				id: this.$route.params.id,
				newsInfo: {}
			};
		},
		created() {
			this.getNewsInfo();
		},
		methods: {
			getNewsInfo() {
				axios.get('/api/getnew/' + this.id)
				.then(response => {
					if (response.data.status === 0) {
						this.newsInfo = response.data.message[0];
					} else {
						Toast('加载新闻详情失败……');
					}
				})
				.catch(function (error) {
					Toast(error);
				});
			}
		},
		components: {
			'comment-box': Comment
		}
	};
</script>