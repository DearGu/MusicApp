<template>
	<div class="player" style="position: fixed;bottom: 0;width: 100%;" v-if="showplayer">
		<div class="musicimg">
			<img :src="mimg" alt="">
		</div>
		<div class="musicmsg">
			<p>{{mname}}</p>
			<p>{{mauthor}}</p>
		</div>
		<div class="musicfunc">
			<span :class="{'btn-play':isplay,'btn-pause':!isplay}" @click="playpause()"></span>
			<span class="btn-next" @click="nextsong()"></span>
			<span class="btn-download" @click="download()"></span>
		</div>
		<audio :src="murl" autoplay></audio>
	</div>
</template>
<script>
	module.exports = {
		data:function(){
			return {

			}
		},
		computed:{
			showplayer:function(){
				return this.$store.state.showplayer;
			},
			murl:function(){
				return this.$store.state.musicsrc;
			},
			mimg:function(){
				return this.$store.state.musicimg;
			},
			mname:function(){
				return this.$store.state.musicname;
			},
			mauthor:function(){
				return this.$store.state.musicauthor;
			},
			isplay:function(){
				return this.$store.state.isplay;
			}
		},
		methods:{
			playpause:function(){
				var audio = document.querySelector('audio');
				this.$store.commit("setIsplay",!this.isplay);
				if(this.isplay){
					audio.pause();
				}
				else{
					audio.play();
				}
			},
			nextsong:function(){
				this.$store.commit("setClickIndex",this.$store.state.clickindex+1);
				if(this.$store.state.clickindex >= this.$store.state.musiclist.length){
					this.$store.state.clickindex = 0;
				}
				var index = this.$store.state.clickindex;
				var hash = this.$store.state.musiclist[index].hash;
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
			// download:function(){
			// 	window.location.href = this.murl
			// }
		}
	}
</script>
<style scoped>
	p{
		padding:0;
		margin:0;
	}
	.player{
		width:100%;
		height:6rem;
		background:rgba(0,0,0,.9);
		position:relative;
	}
	.player .musicimg{
		width:5rem;
		height:5rem;
		position:absolute;
		margin:auto;
		top:0;
		bottom:0;
		left: 0.5rem;
	}
	.player .musicimg img{
		width:100%;
		height:100%;
		border-radius:5px;
	}
	.player .musicmsg{
		height:3rem;
		position:absolute;
		color:white;
		margin:auto;
		top:0;
		bottom:0;
		left:6.5rem;
	}
	.player .musicmsg p:last-child{
		color:#888;
	}
	.player .musicfunc{
		position:absolute;
		height:2.5rem;
		margin:auto;
		top:0;
		bottom:0;
		left: 55%;
	}
	.player .musicfunc span{
		display:inline-block;
		width:2.5rem;
		height:2.5rem;
		margin-left:1.5rem;
	}
	.player .btn-play{
		background:url('../public/image/play_icon.png') no-repeat center;
		background-size:100%;
	}
	.player .btn-pause{
		background:url('../public/image/pause_icon.png') no-repeat center;
		background-size:100%;
	}
	.player .btn-next{
		background:url('../public/image/next_icon.png') no-repeat center;
		background-size:100%;
	}
	.player .btn-download{
		background:url('../public/image/download_icon.png') no-repeat center;
		background-size:100%;
	}
</style>