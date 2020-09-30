import Vue from "vue-native-core";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    UserData:{}
  },

  mutations: {
    setUserData(state, payload) {
        this.state.UserData = payload
        console.log("------------> In Store")
        console.log(state.UserData)
    },
  }
});

export default store;