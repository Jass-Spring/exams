<style lang="scss" scoped>
	.mint-swipe {
		height: 200px;
		text-align: center;

		.mint-swipe-item {
			img {
				height: 100%;
			}
			.full-width {
				width: 100%;
			}
		}
	}
</style>
<template>
	<div class="swipe-container">
		<mt-swipe :auto="4000">
			<mt-swipe-item v-for="item in list" :key="item.id">
				<img :src="item.img" :class="{ 'full-width': isfull }">
			</mt-swipe-item>
		</mt-swipe>
	</div>
</template>
<script>
	export default {
		props: ['list', 'isfull']
	};
</script>