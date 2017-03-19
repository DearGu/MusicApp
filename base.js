import Vue from "vue";
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import VueRouter from "vue-router";
import VueAwesomeSwiper from 'vue-awesome-swiper';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
Vue.use(MuseUI);
Vue.use(VueRouter);
Vue.use(VueAwesomeSwiper);


var index = require("./component/index.vue");
var router = new VueRouter({
	routes:[{
		path:"/index",
		component:index
	}]
})

new Vue({
	el:"#kugo",
	data:{
		name:"abc123"
	},
	router:router
})