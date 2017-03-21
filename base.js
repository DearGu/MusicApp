import Vue from "vue";
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import VueRouter from "vue-router";
import VueAwesomeSwiper from 'vue-awesome-swiper';
import VueResource from 'vue-resource';
Vue.use(MuseUI);
Vue.use(VueRouter);
Vue.use(VueAwesomeSwiper);
Vue.use(VueResource);


var index = require("./component/index.vue");
var newSong = require("./component/channel/newSong.vue");
var rank = require("./component/channel/rank.vue");
var songList = require("./component/channel/songList.vue");
var singer = require("./component/channel/singer.vue");
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
		}]
	}]
});

new Vue({
	el:"#kugo",
	data:{
		name:"abc123"
	},
	router:router
})