<template>
	<div>
		<ul :style="{height:ulheight,'padding-top':'105px'}" class="dd">
			<li v-for="songlist in songlists">
				<a :href="'#/index/songsheetdetails/'+songlist.specialid">
					<div class="logo"><img :src="songlist.imgurl|replacesize" :alt="songlist.specialname"></div>
					<div class="content">
						{{songlist.specialname}}
						<div class="listenNum">
							<i></i>
							<span>{{songlist.playcount}}</span>
						</div>
					</div>
					<div class="rightlogo"></div>
				</a>
			</li>
		</ul>
		<div class="loadtip" v-if="istip">正在加载...</div>
		<div class="topbutton" v-if="istop" @click="gotop()"></div>
	</div>
</template>
<script>
	module.exports = {
		data:function(){
			return {
				ulheight:"",
				songlists:[],
				istip:true,
				page:1,
				istop:false
			}
		},
		methods:{
			getSongLists:function(){
				this.$http.jsonp("http://1.amazingd.applinzi.com/kugou/getsongsheet.php",{
					params:{
						page:this.page++,
						callback:"JSON_CALLBACK"
					}
				}).then(function(data){
					this.songlists = this.songlists.concat(data.body.plist.list.info);
					this.istip = false;
				})
			},
			loadMore:function(){
				var self = this;
				document.querySelector(".dd").addEventListener('scroll',function(e){
					if(e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight){
								self.istip = true;
								self.getSongLists();	
					}
					if(e.target.scrollTop > 1550){
						self.istop = true;
					}
					else{
						self.istop = false;
					}
				});
			},
			gotop:function(){
				document.querySelector(".dd").scrollTop = 0;
			}
		},
		filters:{
			replacesize:function(input){
				return input.replace("{size}",400);
			}
		},
		mounted:function(){
			this.ulheight = window.screen.height + 'px';
			this.$store.commit("setIsshow",true);
			this.getSongLists();
			this.loadMore();
			this.$store.commit("setShowplayer",false);
		}
	}
</script>
<style scoped>
::-webkit-scrollbar{width:3px;}
::-webkit-scrollbar-thumb{background-color:rgba(0, 0, 0, 0.3);}

	ul{
		padding:0;
		margin:0;
		overflow:auto;
		list-style:none;
	}
	li{
		height:22%;
		box-sizing:border-box;
		padding-top:3%;
		margin-left:3%;
		padding-bottom:3%;
		border-bottom: 1px solid #ccc;
	}
	li .logo{
		width:28%;
		height:100%;
	}
	li img{
		width:100%;
		height:100%;
	}
	li a >div{
		float:left;
	}
	.content{
		padding-top:1.6rem;
		width:180px;
		color:#333;
		font-size:17px;
		height:100%;
		margin-left:7%;
	}
	.content .listenNum{
		font-size:13px;
	}
	.content .listenNum i{
		display:inline-block;
		width:20px;
		height:20px;
		background:url("../../public/image/icon_music.png") no-repeat;
		background-size:90%;
		vertical-align:bottom;
	}
	.rightlogo{
		width:50px;
		height:100%;
		float:right;
		background:url("../../public/image/arrow_icon.png") no-repeat center;
		background-size:25%;
	}
	.loadtip{
		height:48px;
		text-align:center;
		font-size:18px;
	}
	.topbutton{
		width:3.5rem;
		height:3.5rem;
		background:url("../../public/image/to_top.png") no-repeat center;
		position:fixed;
		bottom:10%;
		right:5%;
		border-radius:50%;
		background-size:100%;
	}
</style>