import Vue from "vue";
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import VueRouter from "vue-router";
import VueAwesomeSwiper from 'vue-awesome-swiper';
import VueResource from 'vue-resource';
import Vuex from 'vuex';
Vue.use(MuseUI);
Vue.use(VueRouter);
Vue.use(VueAwesomeSwiper);
Vue.use(VueResource);
Vue.use(Vuex);


var index = require("./component/index.vue");
var newSong = require("./component/channel/newSong.vue");
var rank = require("./component/channel/rank.vue");
var songList = require("./component/channel/songList.vue");
var singer = require("./component/channel/singer.vue");
var rankdetails = require("./component/rankdetails.vue");
var songsheetdetails = require("./component/songsheetdetails.vue");
var singerdetails = require("./component/singerdetails.vue");
var singers = require("./component/singers.vue");
var ksearch = require("./component/ksearch.vue");
var store = new Vuex.Store({
	state:{
		// 是否显示功能栏
		isshow:true,
		// 获取设备高度
		eheight:"",
		// 是否显示播放器
		showplayer:false,
		// 播放地址
		musicsrc:"",
		// 歌曲图片
		musicimg:"",
		// 歌曲名字
		musicname:"",
		// 歌曲演唱者
		musicauthor:"",
		// 控制播放和暂停
		isplay:false,
		// 歌曲列表
		musiclist:[],
		// 当前歌曲的索引
		clickindex:""
	},
	mutations:{
		setIsshow:function(state,data){
			state.isshow = data
		},
		setEheght:function(state,data){
			state.eheight = data
		},
		setShowplayer:function(state,data){
			state.showplayer = data
		},
		setMusicSrc:function(state,data){
			state.musicsrc = data
		},
		setMusicImg:function(state,data){
			state.musicimg = data
		},
		setMusicName:function(state,data){
			state.musicname = data
		},
		setMusicAuthor:function(state,data){
			state.musicauthor = data
		},
		setIsplay:function(state,data){
			state.isplay = data
		},
		setMusicList:function(state,data){
			state.musiclist = data
		},
		setClickIndex:function(state,data){
			state.clickindex = data
		}
	}
})

var router = new VueRouter({
	routes:[{
		path:"/index",
		component:index,
		children:[{
			path:"newSong/:id",
			component:newSong
		},{
			path:"rank/:id",
			component:rank
		},{
			path:"songList/:id",
			component:songList
		},{
			path:"singer/:id",
			component:singer
		},{
			path:"rankdetails/:id",
			component:rankdetails
		},{
			path:"songsheetdetails/:id",
			component:songsheetdetails
		},{
			path:"singerdetails/:id",
			component:singerdetails
		},{
			path:"singers/:id",
			component:singers
		},{
			path:"ksearch",
			component:ksearch
		}]
	}]
});

new Vue({
	el:"#kugo",
	data:{
		name:"abc123"
	},
	router:router,
	store:store
})