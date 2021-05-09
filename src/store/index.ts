import Vue from "vue"
import vuex from "vuex"
Vue.use(vuex)


export default new vuex.Store({
    state: {
        videoList:[]
    },
    mutations:{
        "SET_VIDEOLIST":function(state,list){
            state.videoList=list
        }
    },
    getters: {

    }
})