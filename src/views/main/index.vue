<template>
  <div>
    <div class="fixed-bar">
      <mu-appbar style="width: 100%;" color="primary">
        <div class="logo" slot="left"></div>
        <mu-button icon  slot="right">
          <mu-icon value="search" ></mu-icon>
        </mu-button>
      </mu-appbar>
      <mu-tabs :value.sync="activeTab" @change="handleTabChange" full-width class="view-tabs">
        <mu-tab value="rage">时下流行</mu-tab>
        <mu-tab value="songList">歌单</mu-tab>
        <mu-tab value="leaderBoard">排行榜</mu-tab>
        <mu-tab value="hotSinger">热门歌手</mu-tab>
      </mu-tabs>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
@Component
export default class Main extends Vue {
  activeTab : string= 'rage';
  handleTabChange (val: string) :void {
    console.log(val)
  }
}
</script>
<style lang="less" scoped>
@import "@/assets/theme.less";
.logo {
  width: 150px;
  height: 48px;
  background: url("@/assets/img/logo.png") no-repeat left center;
  background-size: cover;
}
.fixed-bar {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 15;
}
.view-tabs {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.87);
  > .mu-tab-link {
    color: rgba(102, 102, 102, 1);
  }
  > .mu-tab-active {
    color: @primaryColor;
  }
}
</style>
