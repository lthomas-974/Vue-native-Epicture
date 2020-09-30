import Vue from "vue-native-core";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    UserData:{}
  }
});

export default store;