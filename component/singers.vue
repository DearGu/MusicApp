<template>
	<div class="wrap" :style="{'height':height+'px','overflow':'auto'}">
		<div :class="{'ranktitle':true,'ranktitleblue':isblue}">
			<div class="leftlogo" @click="goback()"></div>
			<p>{{singerid}}</p>
		</div>
		<div style="height:280px;overflow: hidden;">
			<img :src="bannerurl" :alt="singerid" style="width:100%">
		</div>
		<div class="list demo-infinite-container">
		    <mu-list>
		      <mu-list-item :title="songlist.filename" v-for="songlist in songlists" :key="songlist.id" style="height: 58px;">
		        <mu-icon value="file_download" slot="right"/>
		      </mu-list-item>
		    </mu-list>
		    <div class="loadtip" v-if="istip">正在加载...</div>
	  	</div>
	  	<div class="topbutton" v-if="istop" @click="gotop()"></div>
	</div>
</template>
<script>
	module.exports = {
		data:function(){
			return {
				singerid:"",
				bannerurl:"",
				songlists:[],
				page:1,
				istip:true,
				isblue:false,
				istop:false
			}
		},
		computed:{
			height:function(){
				return this.$store.state.eheight
			}
		},
		methods:{
			//获取对应排行榜详细信息
			getListData:function(id){
				this.$http.jsonp("http://localhost/vue/test/singer.php",{
					params:{
						page:this.page++,
          				singerid:id,
          				callback:"JSON_CALLBACK"
					}
				}).then(function(data){
					this.singerid = data.data.info.list.specialname;
					this.bannerurl = data.data.info.list.imgurl.replace('{size}', 400);
					this.songlists = this.songlists.concat(data.data.list.list.info);
					this.istip = false;
				})
			},
			//返回上一页
			goback:function(){
				window.history.go(-1);
				window.location.reload();
			},
			//下拉刷新获取数据
			getSongDatas:function(id){
				var self = this;
				this.getListData(id);
				document.querySelector(".wrap").addEventListener("scroll",function(e){
					if(e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight){
						if(self.page<4){
							self.istip = true;
							self.getListData(id);
						}		
					}
				});
			},
			//当滚动条到一定位置触发事件
			changeblue:function(){
				var self = this;
				document.querySelector(".wrap").addEventListener("scroll",function(e){
					if(e.target.scrollTop > 250){
						self.isblue = true;
					}
					else{
						self.isblue = false;
					}
					if(e.target.scrollTop > 1550){
						self.istop = true;
					}
					else{
						self.istop = false;
					}
				});
			},
			//返回顶部
			gotop:function(){
				document.querySelector(".wrap").scrollTop = 0;
			}
		},
		mounted:function(){
			//隐藏功能栏
			this.$store.commit("setIsshow",false);
			//根据参数的不同获取不同的排行榜详细信息	
			this.singerid = this.$route.params.id;
			this.getSongDatas(this.singerid);
			this.changeblue();
			this.$store.commit("setEheght",window.screen.height);
		}
	}
</script>
<style scoped>
::-webkit-scrollbar{width:3px;}
::-webkit-scrollbar-thumb{background-color:rgba(0, 0, 0, 0.3);}

	.ranktitle{
		width:100%;
		background:-webkit-linear-gradient(top,rgba(0,0,0,.6),rgba(0,0,0,0));
		position:fixed;
		top:56px;
		z-index:2;
	}
	.ranktitleblue{
		background:#03a9f4;
	}
	.ranktitle .leftlogo{
		width:12%;
		height:4.5rem;
		display:inline-block;
		background:url("../public/image/goback_1.png") no-repeat center;
		background-size:40%;
	}
	.ranktitle p{
		display:inline-block;
		margin:0;
		width:80%;
		height:4.5rem;
		line-height:4.5rem;
		color:white;
		font-size:18px;
		vertical-align:top;
		text-align:center;
	}
	.list{
		width:100%;
		background:white;
	}
	.loadtip{
		height:48px;
		text-align:center;
		font-size:18px;
	}
	.topbutton{
		width:3.5rem;
		height:3.5rem;
		background:url("../public/image/to_top.png") no-repeat center;
		position:fixed;
		bottom:10%;
		right:5%;
		border-radius:50%;
		background-size:100%;
	}
</style>