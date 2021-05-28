<template>
    <div>
        <div class="loading-wrapper" v-if="isLoading">
            <div class="loading"></div>
            <div class="loading-txt">正在加载中</div>
        </div>
        <div v-show="!isLoading" class="container">
          <mu-load-more @refresh="refresh"  @load="load" :refreshing="refreshing" :loading="loading">
            <div class="g-title songlist">
            全部歌单
            </div>
            <mu-flex wrap="wrap" justify-content="between" class="mu-flexbox box mu-flex-row" >
                <div style="flex:0 0 48%;" class="mu-flexbox-item list-item" v-for="item in songList" :key="item.id">
                  <router-link
                    :to="{name: 'playListDetail',params: { id: item.id, name: item.name, coverImg: item.coverImgUrl, creator: {nickname:item.creator.nickname,avatarUrl:item.creator.avatarUrl}, count: item.playCount, desc: item.description }}"
                  >
                    <div class="list-bar">{{item.playCount | formatCount}}</div>
                    <img class="img-response" :src="item.coverImgUrl + '?param=300y300'" lazy="loading" />
                    <div class="mv-name">{{item.name}}</div>
                    </router-link>
                </div>
            </mu-flex>
            </mu-load-more>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
@Component(
  {
    filters: {
      formatCount (v :number):string|number {
        if (v < 9999) {
          return v
        } else {
          return (v / 10000).toFixed(0) + '万'
        }
      }
    }
  }
)
export default class Song extends Vue {
  songList :any[] = []
  isLoading :boolean = false
  offset :number = 0
  refreshing :boolean = false
  loading :boolean = false
  created () :void {
    this.load()
  }

  async load () :Promise<void> {
    console.log('执行了。。。')
    this.refreshing = true
    this.loading = true
    try {
      const data = await this.$request({
        url: `top/playlist?limit=6&order=all&offset=${this.offset}`,
        method: 'post'
      })
      if (data.playlists.length > 0) {
        this.songList = this.songList.concat(data.playlists)
      }
      this.offset += 6
      this.refreshing = false
      this.loading = false
    } catch (error) {
      this.refreshing = false
      this.loading = false
      console.log(error)
    }
  }

  refresh () :void {
    this.load()
  }
}
</script>

<style lang="less" scoped>
@import "@/assets/theme.less";
// 通用的标题样式
.g-title {
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
.img-response {
    max-width: 100%;
    height: auto;
}
.list-item{
  margin: 0 !important;
}
.wrapper {
    width: 100%;
    padding:0 10px;
    height: 28rem;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}
.title {
    margin: .2rem 0 .3rem 0;
    padding-left: .2rem;
    border-left: .15rem solid @primaryColor;
}
.list {
    &-bar {
      position: absolute;
      top: 0;
      left: 0;
      color: #fff;
      width: 100%;
      text-align: right;
      padding: 2px 5px;
      background-color: rgba(0,0,0,.2);
    }
    &-item {
        position: relative;
        margin: 0 5px 5px 10px;
        a {
          color:rgba(0,0,0,.87);
        }
    }
    &-img {
      width: 8rem;
      height: 8rem;
    }
     &-img[lazy=loading] {
      background: url('@/assets/img/default_cover.png') no-repeat;
      background-size: cover;
    }

        &-name {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
}
</style>
