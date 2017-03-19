<template>
	<div>
	<mu-appbar title="Title" style="position:relative;">
	 	<a href="" class="logo"></a>
	 	<mu-icon value="search" :size="32" style="position:absolute;right:3%;top:18%;" @click="goSearch()"/>
	</mu-appbar>
	<mu-tabs :value="activeTab" @change="handleTabChange" style="background-color:white;">
	    <mu-tab value="tab1" title="新歌" style="color:#333;font-size:18px;"/>
	    <mu-tab value="tab2" title="排行" style="color:#333;font-size:18px;"/>
	    <mu-tab value="tab3" title="歌单" style="color:#333;font-size:18px;"/>
	    <mu-tab value="tab4" title="歌手" style="color:#333;font-size:18px;"/>
  	</mu-tabs>
	</div>
</template>
<script>
	module.exports = {
		data:function(){
			return {
				activeTab: 'tab1'
			}
		},
		methods:{
			goSearch:function(){
				window.location.href = "#/seach"
			},
			handleTabChange (val) {
		      this.activeTab = val
		    }
		}
	}
</script>
<style scoped>
	.logo{
		display: inline-block;
		width: 135px;
		height: 30px;
		background: url("../public/image/logo.png") no-repeat;
		background-size: 100%;
		position: absolute;
		margin:auto;
		top:0;
		bottom: 0;
	}
</style>