<template>
	<div>
		<kswiper></kswiper>
		<klist></klist>
		<kplayer></kplayer>
	</div>	
</template>
<script>
	var kswiper = require("../kswiper.vue");
	var klist = require("../klist.vue");
	var kplayer = require("../kplayer.vue");
	module.exports = {
		data:function(){
			return {
				
			}
		},
		computed:{
			
		},
		components:{
			kswiper:kswiper,
			klist:klist,
			kplayer:kplayer
		},
		methods:{
			
		},
		mounted:function(){
			this.$store.commit("setIsshow",true);
			this.$store.commit("setShowplayer",false);
		}
	}
</script>
<style scoped>
	
</style>