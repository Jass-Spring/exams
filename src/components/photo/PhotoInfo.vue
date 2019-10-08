<style lang="scss" scoped>
	.photoinfo-container {
		padding: 0 4px;

		.title {
			color: #26a2ff;
			font-size: 14px;
			text-align: center;
			margin: 15px 0;
		}

		.subtitle {
			font-size: 12px;
			display: flex;
			justify-content: space-between;
		}

		.content {
			font-size: 13px;
			line-height: 30px;
		}

		.thumbs {
			img {
				width: 100px;
				margin: 10px;
				box-shadow: 0 0 8px #999;
			}
		}
	}
</style>
<template>
	<div class="photoinfo-container">
		<h1 class="title">{{ photoInfo.title }}</h1>
		<p class="subtitle">
			<span>发表时间：{{ photoInfo.add_time | dateFormat }}</span>
			<span>点击{{ photoInfo.click }}次</span>
		</p>
		<hr>
		
		<div class="thumbs">
			<vue-preview :slides="list" @close="handleClose"></vue-preview>
		</div>

		<div class="content" v-html="photoInfo.content"></div>

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
				photoInfo: {},
				list: []
			};
		},
		created() {
			this.getPhotoInfo();
			this.getThumImages();
		},
		methods: {
			getPhotoInfo() {
				axios.get('/api/getimageinfo/' + this.id)
				.then(response => {
					if (response.data.status === 0) {
						this.photoInfo = response.data.message[0];
					} else {
						Toast('加载图片详情失败……');
					}
				})
				.catch(function (error) {
					Toast(error);
				});
			},
			getThumImages() {
				axios.get('/api/getthumimages/' + this.id)
				.then(response => {
					if (response.data.status === 0) {
						response.data.message.forEach(item => {
							item.w = 600;
							item.h = 400;
							item.msrc = item.src;
						});
						this.list = response.data.message;
					} else {
						Toast('加载图片列表失败……');
					}
				})
				.catch(function (error) {
					Toast(error);
				});
			},
			handleClose () {
				console.log('close event')
			}
		},
		components: {
			'comment-box': Comment
		}
	};
</script>