import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    isLogin: false,
    isRegister: false,
    profile:[],
    apiUrl:'http://localhost:8080',
    userData:[],
    products:[]
  },
  mutations: {
    add(state,value){
      state.userData = value
      state.isRegister = true
      console.log(value)
      console.log(state.userData)
    },
    addProfile(state,value){
      state.profile = value
      state.isLogin = true
      console.log(value)
      console.log(state.userData)
    }
  },
  actions: {
    async addUserData(context){
      console.log(this.state.apiUrl+"/user/"+this.state.profile.userId)
      await axios
          // eslint-disable-next-line no-undef
          .get(this.state.apiUrl+"/user/"+this.state.profile.userId)
          .then(response => {
            if (response.data !== null){
              context.commit('add', response.data)
            }
          })
          .catch(error => console.log(error))
    },
    addDataToProfile(context,val){
      context.commit('addProfile',val)
    }
  },
  modules: {
  }
})
