<template>
	<div>
		<kheader></kheader>
		<router-view></router-view>
	</div>
</template>
<script>
	var kheader = require("./kheader.vue");
	module.exports = {
		data:function(){
			return {

			}
		},
		components:{
			kheader:kheader
		}
	}
</script>