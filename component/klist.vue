<template>
  <div :class='{"leave":showplayer}'>
    <mu-list>
      <mu-list-item :title="songlist.filename" v-for="(songlist,index) in songlists" :key="songlist.id" style="height: 58px;" @click="getSongData(songlist.hash,index)">
        <mu-icon value="file_download" slot="right"/>
      </mu-list-item>
    </mu-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      songlists:[]
    }
  },
  computed:{
    showplayer:function(){
      return this.$store.state.showplayer;
    }
  },
  methods:{
    getSongList:function(){
      this.$http.jsonp("http://1.amazingd.applinzi.com/kugou/songlist.php",{
        params:{
          page:1,
          rankid:6666,
          callback:"JSON_CALLBACK"
        }
      }).then(function(res){
        this.songlists = res.data.songs.list
        this.$store.commit("setMusicList",res.body.songs.list);
      })
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
    this.getSongList();
  }
}
</script>
<style scoped>
    .leave{
      padding-bottom:6rem;
    }
</style>