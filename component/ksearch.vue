<template>
	<div class="wrap" :style="{'height':theight+'px','overflow':'auto'}">
		<div :class="{'searchtitle':true}">
			<div v-on:click="goback()" class="leftlogo">		
			</div>
			<p>搜索</p>
		</div>
		<div class="searchbox">
			<div class="searchcontent">
				<span></span>
				<input type="text" placeholder="歌手/歌名/拼音" v-model="search">
				<button @click="getresult()">搜索</button>
			</div>
		</div>
		<div class="hot" v-if="showhot">
			<div class="currenthot">
				最近热门
			</div>
			<div class="loadtip" v-if="istip">正在加载...</div>
			<ul class="hotlist" :style="{'height':height}"> 
				<li v-for="list in lists" @click="taphot(list.keyword)">
					{{list.keyword}}
				</li>
			</ul>
		</div>
		<div class="searchresult" v-if="showresult">
			<div class="total">共有{{total}}条结果</div>
			<mu-list>
		      <mu-list-item :title="result.filename|limitBy" v-for="(result,index) in results" :key="result.id" style="height: 58px;" @click="getSongData(result.hash,index)">
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
				theight:"",
				height:"",
				lists:[],
				showhot:true,
				results:[],
				search:"",
				page:1,
				total:"",
				showresult:false,
				istop:false,
				istip:true,
			}
		},
		components:{
			kplayer:kplayer
		},
		filters:{
			limitBy:function(input) {
				if(input.length > 30){
					return input.slice(0,30) + '...';
				}
			    else{
			    	return input;
			    }
			  }
		},
		methods:{
			goback:function(){
				window.history.go(-1);
				window.location.reload();
			},
			getHotData:function(){
				this.$http.jsonp("https://1.amazingd.applinzi.com/kugou/currenthot.php",{
					params:{
						callback:"JSONP_CALLBACK"
					}
				}).then(function(data){
					this.lists = data.body.data.info;
					this.istip = false;
				})
			},
			getresult:function(){
				this.$http.jsonp("https://1.amazingd.applinzi.com/kugou/searchresult.php",{
					params:{
						callback:"JSONP_CALLBACK",
						page:this.page++,
						search:this.search
					}
				}).then(function(data){
					this.total = data.body.data.total;
					this.results = this.results.concat(data.body.data.info);
					this.showhot = false;
					this.showresult = true;
					this.istip = false;
					this.loadMore();
					this.$store.commit("setMusicList",this.results);
				})
			},
			gotop:function(){
				document.querySelector(".wrap").scrollTop = 0;
			},
			loadMore:function(){
				var self = this;
				document.querySelector(".wrap").addEventListener("scroll",function(e){
					if(e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight){
							self.istip = true;
							self.getresult();	
					}
				});
			},
			taphot:function(name){
				this.search = name;
				this.getresult();
			},
			getSongData:function(hash,index){
		      this.$store.commit("setClickIndex",index);
		      this.$http.jsonp("https://1.amazingd.applinzi.com/kugou/songData.php",{
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
			this.theight = window.screen.height;
			this.$store.commit("setIsshow",false);
			this.height = window.screen.height - 240 + 'px';
			this.$store.commit("setShowplayer",false);
			this.getHotData();
		}
	}
</script>
<style>
::-webkit-scrollbar{width:3px;}
::-webkit-scrollbar-thumb{background-color:rgba(0, 0, 0, 0.3);}

	ul{
		margin:0;
		padding:0;
		list-style:none;
	}
	.searchtitle{
		width:100%;
		background:white;
		position:fixed;
		top:56px;
		z-index:2;
		box-shadow: 0 0.1785rem 0.1785rem 0 #f4f4f4;
	}
	.searchtitle .leftlogo{
		width:12%;
		height:4.5rem;
		display:inline-block;
		background:url("../public/image/goback.png") no-repeat center;
		background-size:40%;
	}
	.searchtitle p{
		display:inline-block;
		margin:0;
		width:80%;
		height:4.5rem;
		line-height:4.5rem;
		color:black;
		font-size:18px;
		vertical-align:top;
		text-align:center;
	}
	.searchbox{
		width:100%;
		background:#fbfbfb;
		padding:130px 13px 13px 13px;
	}
	.searchbox input{
		width:77%;
		height:38px;
		border:1px solid #e5e5e5;
		border-radius:5px;
		margin-right: 3%;
		outline:none;
		font-size:18px;
		text-indent:30px;
	}
	.searchbox button{
		width:18%;
		height:38px;
		border: 0;
		border-radius:5px;
		color:#959595;
		background:#e5e5e5;
		font-size:18px;
		outline:none;
	}
	.searchbox .searchcontent{
		position:relative;
	}
	.searchbox .searchcontent span{
		width:20px;
		height:36px;
		display:block;
		position:absolute;
		background:url('../public/image/search_icon.png') no-repeat center;
		background-size:100%;
		left: 2%;
	}
	.currenthot{
		width:100%;
		height:4.5rem;
		line-height:4.5rem;
		color:#2ca3f5;
		padding-left:4%;
		box-sizing:border-box;
		border-bottom:1px solid #ccc;
		font-size:1.5rem;
	}
	.hotlist{
		padding-left:3%;
	}
	.hotlist li{
		width:100%;
		height:15%;
		border-bottom:1px solid #ccc;
		font-size:20px;
		line-height:15%;
		box-sizing:border-box;
		padding:10% 0;
	}
	.hotlist li:last-child{
		border-bottom:0;
	}
	.searchresult .total{
		width:100%;
		height:30px;
		padding-left:16px;
		line-height:30px;
		background:#e6e6e6;
		color:black;
	}
	.loadtip{
		height:48px;
		text-align:center;
		font-size:18px;
	}
</style>