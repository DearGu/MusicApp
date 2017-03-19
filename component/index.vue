<template>
	<div>
		<kheader></kheader>
		<swiper></swiper>
	</div>
</template>
<script>
	var kheader = require("./kheader.vue");
	var kswiper = require("./kswiper.vue");
	module.exports = {
		data:function(){
			return {

			}
		},
		components:{
			kheader:kheader,
			kswiper:kswiper
		}
	}
</script>