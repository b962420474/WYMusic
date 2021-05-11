<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
@Component
export default class App extends Vue {
  $request: any
  mounted () {
    this.$request({
      method: 'post',
      url: '/banner'
    })
      .then((data : any) => {
        console.log(data)
      })
  }
}
</script>
