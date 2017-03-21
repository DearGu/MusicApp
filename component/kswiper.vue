<template>
      <!-- swiper -->
      <div class="swiper-container" style="padding-top:110px;">
        <swiper :options="swiperOption">
          <swiper-slide>
            <a href=""><img src="../public/image/banner.jpg" alt=""></a>
          </swiper-slide>
          <swiper-slide>
            <a href=""><img src="../public/image/20170314172701172171.jpg" alt=""></a>
          </swiper-slide>
          <swiper-slide>
            <a href=""><img src="../public/image/20170317164416549267.jpg" alt=""></a>
          </swiper-slide>
          <swiper-slide>
            <a href=""><img src="../public/image/20170317184128389661.jpg" alt=""></a>
          </swiper-slide>
          <swiper-slide>
            <a href=""><img src="../public/image/20170319002100166892.jpg" alt=""></a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
</template>

<script>
  export default {
    data() {
      return {
        swiperOption: {
            pagination: '.swiper-pagination',
            slidesPerView: 1,
            paginationClickable: true,
            spaceBetween: 30
        }
      }
    }
  }
</script>
<style>
  a{
    display:block;
    height:10em;
  }
  img{
    width:100%;
    height:100%;
  }
</style>