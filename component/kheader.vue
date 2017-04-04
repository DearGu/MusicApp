<template>
	<div style="position:fixed;width:100%;z-index: 2;">
	<mu-appbar title="Title" style="position:relative;" color="#03a9f4">
	 	<a href="" class="logo"></a>
	 	<mu-icon value="search" :size="32" style="position:absolute;right:3%;top:18%;" @click="goSearch()"/>
	</mu-appbar>
	<mu-tabs :value="activeTab" @change="handleTabChange" style="background-color:white;box-shadow: 0 0.1785rem 0.1785rem 0 #f4f4f4;" v-if="showfun">
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
		computed:{
			showfun:function(){
				return this.$store.state.isshow;
			}
		},
		methods:{
			goSearch:function(){
				window.location.href = "#/index/ksearch"
			},
			handleTabChange (val) {
		      this.activeTab = val;
		      switch(val) {
		      	case "tab1":
		      		window.location.href = "#/index/newSong/1";
		      		break;
		      	case "tab2":
		      		window.location.href = "#/index/rank/2";
		      		break;
		      	case "tab3":
		      		window.location.href = "#/index/songList/3";
		      		break;
		      	case "tab4":
		      		window.location.href = "#/index/singer/4";
		      		break;
		      }
		    }
		},
		mounted:function(){
			var channelid = this.$route.params.id;
			switch(channelid) {
				case '1':
					this.activeTab = "tab1";
					break;
				case '2':
					this.activeTab = "tab2";
					break;
				case '3':
					this.activeTab = "tab3";
					break;
				case '4':
					this.activeTab = "tab4";
					break;
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