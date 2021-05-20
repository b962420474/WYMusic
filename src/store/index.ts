
import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

export interface Audio {
  id: number,
  name: string,
  singer: string,
  albumPic: string,
  location: string,
  album: string
}
interface State {
  audioList : Audio[],
  audio : Audio,
  currentIndex : number
}
const state :State = {
  audioList: [],
  audio: {
    id: 0,
    name: '歌曲名称',
    singer: '演唱者',
    albumPic: '/static/placeholder_disk_play_program.png',
    location: '',
    album: ''
  },
  currentIndex: 0
}
export default new vuex.Store({
  state: state,
  mutations: {
    addAudioToList: function (state:State, audio:Audio) {
      state.audioList.push(audio)
    },
    setAudio: function (state:State) {
      state.audio = state.audioList[state.currentIndex]
    },
    setCurrentIndex: function (state:State, index:number) {
      state.currentIndex = index
    }
  },
  getters: {
    audioList: (state:State) => state.audioList,
    audio: (state:State) => state.audio,
    currentIndex: (state:State) => state.currentIndex
  }
})
