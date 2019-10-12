<style>
	
</style>
<template>
	<div class="mui-numbox" data-numbox-min='1' data-numbox-max='9' ref='numbox'>
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numberbox"/>
		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
</template>
<script>
	import mui from '../../lib/mui/js/mui.min.js';

	export default {
		props: ['max'],
		data() {
			return {}
		},
		mounted() {
			mui('.mui-numbox').numbox();
		},
		methods: {
			countChanged() {
				this.$emit('getcount', this.$refs.numberbox.value);
			}
		},
		watch: {
			'max': function (newVal, oldVal) {
				mui('.mui-numbox').numbox().setOption('max', newVal);
			}
		}
	}
</script>