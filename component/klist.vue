<template>
  <div>
    <mu-list>
      <mu-list-item :title="songlist.filename" v-for="songlist in songlists" :key="songlist.id" style="height: 58px;">
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
  methods:{
    getSongList:function(){
      this.$http.jsonp("http://localhost/vue/test/songlist.php",{
        params:{
          page:1,
          rankid:6666,
          callback:"JSON_CALLBACK"
        }
      }).then(function(res){
        this.songlists = res.data.songs.list
      })
    }
  },
  mounted:function(){
    this.getSongList();
  }
}
</script>