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
var rankdetails = require("./component/rankdetails.vue")
var store = new Vuex.Store({
	state:{
		isshow:true
	},
	mutations:{
		setIsshow:function(state,data){
			state.isshow = data
		}
	}
})

var router = new VueRouter({
	routes:[{
		path:"/index",
		component:index,
		children:[{
			path:"newSong",
			component:newSong
		},{
			path:"rank",
			component:rank
		},{
			path:"songList",
			component:songList
		},{
			path:"singer",
			component:singer
		},{
			path:"rankdetails/:id",
			component:rankdetails
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