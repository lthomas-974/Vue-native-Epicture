import Vue from "vue-native-core";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    UserData:{},
    MyFavorites:{}
  },

  mutations: {
    setUserData(state, payload) {
        this.state.UserData = payload
        console.log("------------> In Store")
        console.log(state.UserData)
    },
    setMyFavorites(state, payload) {
      this.state.MyFavorites = payload
      console.log("------------> In Store")
      console.log(state.MyFavorites)
  },
  }
});

export default store;