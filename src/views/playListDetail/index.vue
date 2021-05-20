<template>
    <div class="playList" :class="{view: audioList.length > 0}">
        <div class="fixed-title" :style="{'background': 'rgba(206, 61, 62, '+ opacity +')'}" style="transition: opacity .1s;">
            <mu-appbar>
            <mu-button icon  slot="left" @click="back">
              <mu-icon value="arrow_back" ></mu-icon>
            </mu-button>
            <div class="play-title">
              <div class="play-name"><span>{{fname}}</span></div>
            </div>
          </mu-appbar>
        </div>
        <div class="playlist-info">
            <div class="info-wrapper">
                <div class="info-gallery">
                    <span>{{playCount | formatCount}}</span>
                    <img :src="coverImgUrl + '?param=300y300'" alt="">
                </div>
                <div class="info-title">
                    <p class="titile">{{name}}</p>
                    <p class="author" v-if="creator.avatarUrl">
                        <mu-avatar slot="left"  :src="creator.avatarUrl + '?param=50y50'" :size="30" :iconSize="20"/>
                        <span>{{creator.nickname}}</span>
                    </p>
                </div>
            </div>
            <div class="bg-mask"></div>
            <div class="bg-player" id="backImg" :style="{'background-image':'url(' + coverImgUrl + '?param=300y300)'}" ></div>
        </div>
        <div class="playlist-holder">
            <div class="add-all">
                <mu-button icon  slot="left" class="demo-flat-button" label="播放全部" @click="playAll">
                  <mu-icon value="add_circle_outline" ></mu-icon>
                </mu-button>
                <mu-divider/>
            </div>
            <div>
              <mu-circular-progress :size="40" class="center" v-if="isloading"/>
                <mu-list :value="value" v-show="!isloading" @change="change">
                  <div v-for="(item, index) in list" :key="item.id" @click="playAudio(item)">
                      <mu-list-item class="item"  :disableRipple="true"  :value="item.id">
                        <mu-list-item-action>
                          <span class="indexStyle">{{index + 1}}</span>
                        </mu-list-item-action>
                        <mu-list-item-content>
                          <mu-list-item-title>{{item.name}}</mu-list-item-title>
                          <mu-list-item-sub-title>{{item.ar[0].name}}</mu-list-item-sub-title>
                        </mu-list-item-content>
                      </mu-list-item>
                      <mu-divider inset></mu-divider>
                  </div>
                </mu-list>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { Audio } from '@/store/index'
interface Creator {
    avatarUrl:string,
    nickname:string
}
@Component({
  filters: {
    formatCount: function () {

    }
  }
})
export default class PlayList extends Vue {
  opacity :number = 0
  fname: string = '歌单'
  coverImgUrl :string = '@/assets/img/default_cover.png'
  name:string = '歌单标题'
  id:number = 0
  playCount:number = 0
  description:string = '描述描述'
  creator:Creator|string = {
    avatarUrl: '@/assets/img/user-default.png',
    nickname: '昵称'
  }

  list: any[] = []
  value:number = 0
  isloading:boolean = false
  @Getter('audioList') audioList:Audio[]|undefined
  @Getter('audio')
  @Getter('currentIndex')

  beforeRouteEnter (to: any, from: any, next: any) {
    next((vm: PlayList) => {
      if (parseInt(to.params.id) !== vm.id) {
        vm.get()
      }
      if (to.params.coverImg) {
        // 获取songList传入的数据
        vm.coverImgUrl = vm.$route.params.coverImg
        vm.name = vm.$route.params.name
        vm.description = vm.$route.params.desc
        vm.playCount = parseInt(vm.$route.params.count)
        vm.creator = vm.$route.params.creator
        vm.id = parseInt(vm.$route.params.id)
      }
    })
  }

  async get () {
    this.isloading = true
    const id = this.$route.params.id
    try {
      const data = await this.$request(
        {
          method: 'post',
          url: `/playlist/detail?id=${id}`
        }
      )
      this.list = data.playlist.tracks
      this.isloading = false
    } catch (error) {
      this.isloading = false
    }
  }

  back () {
    this.$router.go(-1)
  }

  playAll () {}

  change () {}

  playAudio () {}
}
</script>
<style lang="less" scoped>
    .item{
      min-height: 70px;
    }
    .fixed-title {
        position: fixed;
        top: 0;
        width: 100%;
        height: 56px;
        left: 0;
        z-index: 15;
    }

     // 修改默认的bar样式
    .mu-appbar {
      background-color: transparent;
    }
    .bar-line {
      display: block;
      bottom: 0 ;
      left: 0;
      display: block;
      width: 100%;
      height: 0.05rem;
      background: radial-gradient(#d3d3d3 -90%, transparent 100%);
    }
    .mu-paper-1 {
      box-shadow: none;
      > .mu-appbar-title {
        text-align: center;
        font-size: 14px;
      }
    }
    // 歌单信息
    .playlist-info {
        position: relative;
        padding: 60px .5rem 0 ;
        height: 10rem;
    }

    .info-wrapper {
        position: relative;
        z-index: 10;
        color: #fff;
        .info-gallery {
            position: relative;
            float: left;
            width: 6rem;
            overflow: hidden;
            span {
                position: absolute;
                display: block;
                padding-right: 5px;
                width: 100%;
                left: 0;
                top: 0;
                font-size: 12px;
                text-align: right;
                background: rgba(0,0,0,.35);
                z-index: 11;
            }
            img {
                max-width: 100%;
                height: auto;
            }
        }

        .info-title {
            float: left;
            width: 7.5rem;
            margin-left: 1rem;
            .title {
                font-size: 16px;
                word-wrap: wrapper;
            }
            .author {
                span {
                    overflow: hidden;
                    display: inline-block;
                    height: 30px;
                    text-overflow: ellipsis;
                    width: 5.4rem;
                    white-space: nowrap;
                    font-size: 14px;
                    vertical-align: top;
                    line-height: 30px;
                }
            }
        }
    }

    .playlist-holder {
        position: relative;
        background: #fff;
        z-index: 3;

        .add-all {
            padding-left: .4rem;
        }
    }

    // 列表样式
    .indexStyle {
    padding-left: 10px;
    font-size: 18px;
    font-weight: bolder;
    }
    .mu-item-title {
        white-space:nowrap;
        height: 1.7rem;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .bg-player {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: bottom right;
        filter: blur(40px);
        -webkit-filter: blur(40px);
        z-index: 1;
    }
    .bg-mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #292a2b;
        background-color: rgba(0,0,0,.35);
        z-index: 2;
    }
    .center {
      display: block!important;
      margin: 10% auto 0;
    }
    .view {
      width:100%;
      margin-bottom:2.3rem;
    }
    .mu-item-title {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      line-height: 1.5;
    }
</style>
