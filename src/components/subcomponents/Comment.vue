<style lang="scss" scoped>
	ul,li,p,textarea {
		padding: 0;
		margin: 0;
	}
	.comment-container {
		h3 {
			font-size: 18px;
		}

		textarea {
			font-size: 14px;
			height: 85px;
		}

		.comment-list {
			margin: 5px 0;

			.comment-item {
				list-style: none;

				.comment-title {
					font-size: 13px;
					line-height: 30px;
					background-color: #ccc;
				}

				.comment-content {
					font-size: 13px;
					text-indent: 2em;
					line-height: 30px;
				}
			}
		}
	}
</style>
<template>
	<div class="comment-container">
		<h3>发表评论</h3>
		
		<textarea placeholder="请输入要发表的内容（最多输入120个字符）"></textarea>
		
		<mt-button type="primary" size="large">发表评论</mt-button>

		<ul class="comment-list">
			<li class="comment-item" v-for="(item, i) in commentList" :key="item.add_time">
				<p class="comment-title">第{{ i + 1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}</p>
				<p class="comment-content">{{ (item.content === '' || item.content === 'undefined') ? '此用户很懒，没有输入任何内容' : item.content }}</p>
			</li>
		</ul>

		<mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
	</div>
</template>
<script>
	import axios from 'axios';
	import { Toast } from 'mint-ui';

	export default {
		props: ['id'],
		data() {
			return {
				pageIndex: 1,
				commentList: []
			};
		},
		created() {
			this.getCommentList();
		},
		methods: {
			getMore() {
				this.pageIndex++;
				this.getCommentList();
			},
			getCommentList() {
				axios.get('/api/getcomments/' + this.id + '?pageindex=' + this.pageIndex)
				.then(response => {
					if (response.data.status === 0) {
						this.commentList = this.commentList.concat(response.data.message);
					} else {
						Toast('加载评论失败……');
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