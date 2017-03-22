<template>
	<ul :style="{height:ulheight,'padding-top':'105px'}">
		<li v-for="ranklist in ranklists">
			<a :href="ranklist.go">
				<div class="logo"><img :src="ranklist.url" alt="酷狗飙升榜"></div>
				<div class="content">{{ranklist.name}}</div>
				<div class="rightlogo"></div>
			</a>
		</li>
	</ul>
</template>
<script>
	module.exports = {
		data:function(){
			return {
				ulheight:"",
				ranklists:[{name:"酷狗飙升榜",url:"./image/20150717100030907982.png",go:"#/index/rankdetails/11"},
						   {name:"酷狗top500",url:"./image/20150717100046499341.png",go:"#/index/rankdetails/12"},
						   {name:"网络红歌榜",url:"./image/20150818104300762763.png",go:"#/index/rankdetails/13"},
						   {name:"DJ热歌榜",url:"./image/20160119114653428408.png",go:"#/index/rankdetails/14"},
						   {name:"华语新歌榜",url:"./image/20150717100103282211.png",go:"#/index/rankdetails/15"},
						   {name:"欧美新歌榜",url:"./image/20150717100117648320.png",go:"#/index/rankdetails/16"},
						   {name:"日本新歌榜",url:"./image/20151105175335175464.png",go:"#/index/rankdetails/17"},
						   {name:"粤语新歌榜",url:"./image/20150717100200275675.png",go:"#/index/rankdetails/18"},
						   {name:"vivo热歌分享榜",url:'./image/20161116160652246137.jpg',go:"#/index/rankdetails/19"},
						   {name:"原创音乐榜",url:"./image/20161013110348466009.png",go:"#/index/rankdetails/20"},
						   {name:"歌手2017榜",url:"./image/20170204152817352959.png",go:"#/index/rankdetails/21"},
						   {name:"超强音浪榜",url:"./image/20170104161038978255.jpg",go:"#/index/rankdetails/22"},
						   {name:"校园歌曲榜",url:"./image/20160531175617521660.jpg",go:"#/index/rankdetails/23"},
						   {name:"美国BillBoard榜",url:"./image/20150717100525388020.png",go:"#/index/rankdetails/24"},
						   {name:"中文DJ",url:"./image/20151102152359118990.png",go:"#/index/rankdetails/25"},
						   {name:"全球百大DJ",url:"./image/20160129102832611181.png",go:"#/index/rankdetails/26"},
						   {name:"车载音乐",url:"./image/20160711153735417140.jpg",go:"#/index/rankdetails/27"},
						   {name:"影视金曲",url:'./image/20151105172246425804.png',go:"#/index/rankdetails/28"}]
			}
		},
		mounted:function(){
			this.ulheight = window.screen.height + 'px';
			this.$store.commit("setIsshow",true);
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
	li a div{
		float:left;
	}
	.content{
		color:#333;
		font-size:18px;
		height:100%;
		line-height:7rem;
		margin-left:8%;
	}
	.rightlogo{
		width:50px;
		height:100%;
		float:right;
		background:url("../../public/image/arrow_icon.png") no-repeat center;
		background-size:25%;
	}
</style>