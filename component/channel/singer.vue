<template>
	<div style="padding-top: 105px;">
		<ul class="singerClass">
			<li><a href="#/index/singerdetails/88">热门歌手<i></i></a></li>
		</ul>
		<ul class="singerClass">
			<li><a href="#/index/singerdetails/1">华语男歌手<i></i></a></li>
			<li><a href="#/index/singerdetails/2">华语女歌手<i></i></a></li>
			<li><a href="#/index/singerdetails/3">华语组合<i></i></a></li>
		</ul>
		<ul class="singerClass">
			<li><a href="#/index/singerdetails/4">日韩男歌手<i></i></a></li>
			<li><a href="#/index/singerdetails/5">日韩女歌手<i></i></a></li>
			<li><a href="#/index/singerdetails/6">日韩组合<i></i></a></li>
		</ul>
		<ul class="singerClass">
			<li><a href="#/index/singerdetails/7">欧美男歌手<i></i></a></li>
			<li><a href="#/index/singerdetails/8">欧美女歌手<i></i></a></li>
			<li><a href="#/index/singerdetails/9">欧美组合<i></i></a></li>
		</ul>
	</div>
</template>
<script>
	module.exports = {
		data:function(){
			return {

			}
		},
		mounted:function(){
			this.$store.commit("setIsshow",true);
		}
	}
</script>
<style scoped>
	.singerClass{
		padding:0;
		margin:18px 12px;
		list-style:none;
		border:1px solid #e4e4e4;
		background: #fbfbfb;
		border-radius:5px;
	}
	.singerClass li{
		border-bottom:1px solid #e4e4e4;
		position:relative;
	}
	.singerClass li:last-child{
		border-bottom:0;
	}
	.singerClass a{
		color:#333;
		display:block;
		text-decoration:none;
		padding:12px;
		font-size:18px;
	}
	.singerClass a i{
		display:inline-block;
		width:10px;
		height:15px;
		background:url('../../public/image/arrow_icon.png') no-repeat center;
		background-size:100%;
		position:absolute;
		margin:auto;
		right:3%;
		top:0;
		bottom:0;
	}
</style>