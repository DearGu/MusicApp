<template>
	<div :style="{height:ulheight,'padding-top':'120px','overflow':'auto'}" class="wrap">
		<div :class="{'singerlisttitle':true}">
			<div class="leftlogo" @click="goback()"></div>
			<p>{{classname}}</p>
		</div>
		<ul>
			<li v-for="list in lists">
				<a href="#">
					<div class="logo"><img :src="list.imgurl|replacesize" :alt="list.singername"></div>
					<div class="content">
						{{list.singername}}
					</div>
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
				lists:[],
				istip:true,
				page:1,
				istop:false,
				classname:"",
				id:""
			}
		},
		methods:{
			getSingerLists:function(id){
				this.$http.jsonp("http://localhost/vue/test/singerdetails.php",{
					params:{
						singerlistid:id,
						page:this.page++,
						callback:"JSON_CALLBACK"
					}
				}).then(function(data){
					console.log(data);
					this.classname = data.body.classname;
					this.lists = this.lists.concat(data.body.singers.list.info);
					this.istip = false;
				})
			},
			loadMore:function(){
				var self = this;
				document.querySelector(".wrap").addEventListener('scroll',function(e){
					if(e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight){
								self.istip = true;
								self.getSingerLists(self.id);	
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
				document.querySelector(".wrap").scrollTop = 0;
			},
			goback:function(){
				window.history.go(-1);
				window.location.reload();
			}
		},
		filters:{
			replacesize:function(input){
				return input.replace("{size}",400);
			}
		},
		mounted:function(){
			this.ulheight = window.screen.height + 'px';
			this.$store.commit("setIsshow",false);
			this.id = this.$route.params.id;
			this.getSingerLists(this.id);
			if(this.id != '88'){
				this.loadMore();
			}	
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
		height:7rem;
		box-sizing:border-box;
		padding-top:3%;
		margin-left:3%;
		padding-bottom:3%;
		border-bottom: 1px solid #ccc;
	}
	li .logo{
		width:17%;
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
	.singerlisttitle{
		width:100%;
		background:white;
		position:fixed;
		top:56px;
		z-index:2;
		box-shadow: 0 0.1785rem 0.1785rem 0 #f4f4f4;
	}
	.singerlisttitle .leftlogo{
		width:12%;
		height:4.5rem;
		display:inline-block;
		background:url("../public/image/goback.png") no-repeat center;
		background-size:40%;
	}
	.singerlisttitle p{
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
</style>