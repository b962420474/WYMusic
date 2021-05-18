<template>
  <div>
    <div class="loading-wrapper" v-if="isLoading">
      <div class="loading"></div>
      <div class="loading-txt">正在加载中</div>
    </div>
    <div v-show="!isLoading" class="container">
      <div id="slider">
        <swiper :options="swiperOption">
          <swiper-slide v-for="item in bannerList" :key="item.imageUrl">
            <img :src="item.imageUrl" class="banner-item" />
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="wrapper">
        <div class="g-title song-list">
          推荐歌单
          <router-link :to="{path: '/index/songList'}">更多></router-link>
        </div>
        <mu-flex wrap="wrap" justify-content="around" class="mu-flexbox box mu-flex-row" >
          <div style="flex:28%" class="item mu-flexbox-item" :key="item.id" v-for="item in playList">
            <router-link
              :to="{name: 'playListDetail',params: { id: item.id, name: item.name, coverImg: item.picUrl, creator: item.copywriter, count: item.playCount, desc: item.description }}"
            >
              <div class="bar">{{item.playCount | formatCount}}</div>
              <img class="item-img img-response" :src="item.picUrl" lazy="loading" />
              <div class="item-name">{{item.name}}</div>
            </router-link>
          </div>
        </mu-flex>
        <div class="g-title mv">
          推荐MV
          <router-link :to="{}">更多></router-link>
        </div>
        <mu-flex wrap="wrap" justify-content="between" class="mu-flexbox box mu-flex-row" >
          <div style="flex:0 0 48%;" class="mu-flexbox-item mv-item" v-for="item in mvList" :key="item.artistId">
            <img class="img-response" :src="item.picUrl" />
            <div class="mv-name">{{item.name}}</div>
            <div class="mv-author">{{item.artistName}}</div>
          </div>
        </mu-flex>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
@Component({
  components: {
    Swiper,
    SwiperSlide
  },
  filters: {
    formatCount (v :number):string|number {
      if (v < 9999) {
        return v
      } else {
        return (v / 10000).toFixed(0) + '万'
      }
    }
  }
})
export default class Rage extends Vue {
  isLoading : boolean = true
  swiperOption = {
    pagination: '.swiper-pagination',
    paginationClickable: true
  }

  bannerList: any[] = []
  playList: any = []
  mvList: any = []
  created () : void {
  }

  async mounted () :Promise<void> {
    const result = await this.loadData()
    if (result) {
      this.isLoading = false
    }
  }

  async loadData () : Promise<any> {
    let result: any[] = []
    const getBannerList : any = this.$request({
      method: 'post',
      url: '/banner'
    })
    const getPlayList : any = this.$request({
      method: 'post',
      url: '/personalized'
    })
    const getMvList : any = this.$request({
      method: 'post',
      url: '/personalized/mv'
    })
    try {
      result = await Promise.all([getBannerList, getPlayList, getMvList])
      this.bannerList = result[0].banners
      this.playList = result[1].result.length > 6 && result[1].result.slice(0, 6)
      this.mvList = result[2].result.length > 6 ? result[2].result.slice(0, 6) : result[2].result
    } catch (error) {
      return result
    }
    return result
  }
}
</script>
<style lang="less" scoped>
@import "@/assets/theme.less";
.container {
    width: 100%;
    padding: 0;
}
.img-response {
  max-width: 100%;
  height: auto;
}
.wrapper {
  padding: 0 5px;
}
// 通用的标题样式
.g-title {
  padding-left: 25px;
  color: #333;
  height: 35px;
  line-height: 35px;
  font-size: 16px;
  a {
    float: right;
    font-size: 12px;
    color: #666;
  }
}
// banner样式
.banner-item {
  width: 100%;
  height: 7.4rem;
  background: url("@/assets/img/banner-item-load.png") no-repeat;
  background-size: cover;
}

// 推荐歌单
.song-list {
  background: url("@/assets/img/aei.png") no-repeat left center;
  background-size: 20px 20px;
}
.item {
  position: relative;
  margin: 0 5px 5px 10px;
  height: 100%;
  a {
    color: rgba(0, 0, 0, 0.87);
  }
  .bar {
    position: absolute;
    top: 0;
    left: 0;
    color: #fff;
    width: 100%;
    text-align: right;
    padding: 2px 5px;
    background-color: rgba(0, 0, 0, 0.2);
  }

  &-img {
    min-width: 5rem;
    min-height: 5rem;
  }

  &-img[lazy="loading"] {
    background: url("@/assets/img/default_cover.png") no-repeat;
    background-size: cover;
  }

  &-name {
    overflow: hidden;
    font-size: 12px;
    height: 1.7rem;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
.mv {
  background: url("@/assets/img/aee.png") no-repeat left center;
  background-size: 20px 20px;
  &-name {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  &-item {
    position: relative;
  }
  &-author {
    font-size: 12px;
    color: #666;
  }
}
.mv-name {
  width: 100%;
  height: 21px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
