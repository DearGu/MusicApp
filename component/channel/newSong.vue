<template>
	<div>
		<kswiper></kswiper>
		<klist></klist>
	</div>	
</template>
<script>
	var kswiper = require("../kswiper.vue");
	var klist = require("../klist.vue");
	module.exports = {
		data:function(){
			return {

			}
		},
		components:{
			kswiper:kswiper,
			klist:klist
		},
		mounted:function(){
			this.$store.commit("setIsshow",true);
		}
	}
</script>