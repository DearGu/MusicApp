<template>
	<div class="wrap" :style="{'height':height+'px','overflow':'auto'}">
		<div :class="{'ranktitle':true,'ranktitleblue':isblue}">
			<div class="leftlogo" @click="goback()"></div>
			<p>{{specialname}}</p>
		</div>
		<div style="height:280px;overflow: hidden;">
			<img :src="bannerurl" :alt="specialname" style="width:100%">
		</div>
		<div class="list demo-infinite-container">
		    <mu-list>
		      <mu-list-item :title="songlist.filename" v-for="(songlist,index) in songlists" :key="songlist.id" style="height: 58px;" @click="getSongData(songlist.hash,index)">
		        <mu-icon value="file_download" slot="right"/>
		      </mu-list-item>
		    </mu-list>
		    <div class="loadtip" v-if="istip">正在加载...</div>
	  	</div>
	  	<div class="topbutton" v-if="istop" @click="gotop()"></div>
	  	<kplayer></kplayer>
	</div>
</template>
<script>
	var kplayer = require("../component/kplayer.vue");
	module.exports = {
		data:function(){
			return {
				specialname:"",
				bannerurl:"",
				songlists:[],
				page:1,
				istip:true,
				isblue:false,
				istop:false
			}
		},
		components:{
			kplayer:kplayer
		},
		computed:{
			height:function(){
				return this.$store.state.eheight
			}
		},
		methods:{
			//获取对应排行榜详细信息
			getListData:function(id){
				this.$http.jsonp("http://1.amazingd.applinzi.com/kugou/songsheetlist.php",{
					params:{
						page:this.page++,
          				specialid:id,
          				callback:"JSON_CALLBACK"
					}
				}).then(function(data){
					this.specialname = data.data.info.list.specialname;
					this.bannerurl = data.data.info.list.imgurl.replace('{size}', 400);
					this.songlists = this.songlists.concat(data.data.list.list.info);
					this.istip = false;
					this.$store.commit("setMusicList",this.songlists);
				})
			},
			//返回上一页
			goback:function(){
				window.history.go(-1);
				window.location.reload();
			},
			//下拉刷新获取数据
			getRankDatas:function(id){
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
			},
			getSongData:function(hash,index){
		      this.$store.commit("setClickIndex",index);
		      this.$http.jsonp("http://1.amazingd.applinzi.com/kugou/songData.php",{
		        params:{
		          callback:"JSON_CALLBACK",
		          hash:hash
		        }
		      }).then(function(data){
		        var url = data.body.url;
		        var imgurl = data.body.imgUrl.replace("{size}", 400);
		        var mname = data.body.songName;
		        var mauthor = data.body.singerName;
		        this.$store.commit("setShowplayer",true);
		        this.$store.commit("setMusicSrc",url);
		        this.$store.commit("setMusicImg",imgurl);
		        this.$store.commit("setMusicName",mname);
		        this.$store.commit("setMusicAuthor",mauthor);
		        this.$store.commit("setIsplay",false);
		      })
		    }
		},
		mounted:function(){
			//隐藏功能栏
			this.$store.commit("setIsshow",false);
			this.$store.commit("setShowplayer",false);
			//根据参数的不同获取不同的排行榜详细信息	
			var rankid = this.$route.params.id;
			this.getRankDatas(rankid);
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
		width:82%;
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
		bottom:12%;
		right:5%;
		border-radius:50%;
		background-size:100%;
	}
</style>