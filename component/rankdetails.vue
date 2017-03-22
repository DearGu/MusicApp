<template>
	<div>
		<div :class="{'ranktitle':true,'ranktitleblue':isblue}">
			<div class="leftlogo" @click="goback()"></div>
			<p>{{rankname}}</p>
		</div>
		<img :src="bannerurl" :alt="rankname" style="width:100%">
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
				rankname:"",
				bannerurl:"",
				songlists:[],
				page:1,
				istip:true,
				isblue:false,
				istop:false
			}
		},
		methods:{
			//获取对应排行榜详细信息
			getListData:function(id){
				this.$http.jsonp("http://localhost/vue/test/songlist.php",{
					params:{
						page:this.page++,
          				rankid:id,
          				callback:"JSON_CALLBACK"
					}
				}).then(function(data){
					console.log(data.data);
					this.rankname = data.data.info.rankname;
					this.bannerurl = data.data.info.banner7url.replace('{size}', 400);
					this.songlists = this.songlists.concat(data.data.songs.list);
					this.istip = false;
				})
			},
			//返回上一页
			goback:function(){
				window.history.go(-1);
			},
			//下拉刷新获取数据
			getRankDatas:function(id){
				var self = this;
				this.getListData(id);
				window.addEventListener("scroll",function(){
					if(window.screen.height + document.body.scrollTop >= document.body.scrollHeight){
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
				window.addEventListener("scroll",function(){
					if(document.body.scrollTop > 250){
						self.isblue = true;
					}
					else{
						self.isblue = false;
					}
					if(document.body.scrollTop > 1550){
						self.istop = true;
					}
					else{
						self.istop = false;
					}
				});
			},
			//返回顶部
			gotop:function(){
				document.body.scrollTop = 0;
			}
		},
		mounted:function(){
			//隐藏功能栏
			this.$store.commit("setIsshow",false);
			//根据参数的不同获取不同的排行榜详细信息	
			var rankid = this.$route.params.id;
			switch(rankid) {
				case "11":
					this.getRankDatas(6666);
					this.changeblue();
					break;
				case "12":
					this.getRankDatas(8888);
					this.changeblue();
					break;
				case "13":
					this.getRankDatas(23784);
					this.changeblue();
					break;
				case "14":
					this.getRankDatas(24971);
					this.changeblue();
					break;
				case "15":
					this.getRankDatas(27);
					this.changeblue();
					break;
				case "16":
					this.getRankDatas(28);
					this.changeblue();
					break;
				case "17":
					this.getRankDatas(24047);
					this.changeblue();
					break;
				case "18":
					this.getRankDatas(22050);
					this.changeblue();
					break;
				case "19":
					this.getRankDatas(21101);
					this.changeblue();
					break;
				case "20":
					this.getRankDatas(28653);
					this.changeblue();
					break;
				case "21":
					this.getRankDatas(29606);
					this.changeblue();
					break;
				case "22":
					this.getRankDatas(29534);
					this.changeblue();
					break;
				case "23":
					this.getRankDatas(28061);
					this.changeblue();
					break;
				case "24":
					this.getRankDatas(4681);
					this.changeblue();
					break;
				case "25":
					this.getRankDatas(70);
					this.changeblue();
					break;
				case "26":
					this.getRankDatas(24306);
					this.changeblue();
					break;
				case "27":
					this.getRankDatas(88);
					this.changeblue();
					break;
				case "28":
					this.getRankDatas(22096);
					this.changeblue();
					break;
			}
			
		}
	}
</script>
<style scoped>
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
		position:absolute;
		top:45%;
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