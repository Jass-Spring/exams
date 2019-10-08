<style lang="scss" scoped>
	* {
		touch-action: none;
	}
	
	.photo-list {
		margin: 0;
		padding: 10px;
		padding-bottom: 0;
		list-style: none;

		li {
			margin-bottom: 10px;
			text-align: center;
			background-color: #ccc;
			box-shadow: 0 0 9px #999;
			position: relative;

			img {
				width: 100%;
				vertical-align: middle;
			}
			img[lazy=loading] {
				width: 40px;
				height: 300px;
				margin: auto;
			}

			.info {
				bottom: 0;
				width: 100%;
				height: 85px;
				color: #fff;
				text-align: left;
				position: absolute;
				background-color: rgba(0, 0, 0, 0.4);
				overflow-y: hidden;

				.info-title {
					font-size: 14px;
				}

				.info-content {
					font-size: 13px;
				}
			}
		}
	}
	
</style>
<template>
	<div>
		<div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
					<a :class="{ 'mui-control-item': true, 'mui-active': item.id == 0 }" v-for="item in cateList" :key="item.id" @click="getImgListByCateId(item.id)">
						{{ item.title }}
					</a>
				</div>
			</div>
		</div>

		<ul class="photo-list">
			<router-link v-for="item in photoList" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
				<img v-lazy="item.img_url">

				<div class="info">
					<h1 class="info-title">{{ item.title }}</h1>
					<div class="info-content">{{ item.zhaiyao }}</div>
				</div>
			</router-link>
		</ul>
	</div>
</template>
<script>
	import { Toast } from 'mint-ui';
	import axios from 'axios';
	import mui from '../../lib/mui/js/mui.min.js';

	export default {
		data() {
			return {
				cateList: [],
				photoList: []
			}
		},
		created() {
			this.getImgCategory();
			this.getImgListByCateId(0);
		},
		mounted() {
			mui('.mui-scroll-wrapper').scroll({
				deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
			});
		},
		methods: {
			getImgCategory() {
				axios.get('/api/getimgcategory')
				.then(response => {
					if (response.data.status === 0) {
						response.data.message.unshift({id: 0, title: '全部'});
						this.cateList = response.data.message;
					} else {
						Toast('加载图片分类失败……');
					}
				})
				.catch(function (error) {
					Toast(error);
				});
			},
			getImgListByCateId(id) {
				axios.get('/api/getimages/' + id)
				.then(response => {
					if (response.data.status === 0) {
						this.photoList = response.data.message;
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