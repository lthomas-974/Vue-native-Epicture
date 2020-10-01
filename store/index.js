import Vue from "vue-native-core";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    UserData: {},
    MyFavorites: {}
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
      console.log(state)
    },
  },

  actions: {
    async updateMyFavorites(context) {
      try {
        const imgurApiCall = await fetch(
          `https://api.imgur.com/3/account/${store.state.UserData.params.account_username}/favorites`,
          {
            methods: "GET",
            headers: {
              authorization: "Bearer " + store.state.UserData.params.access_token,
            },
          }
        );
        const pictures = await imgurApiCall.json();
        console.log(pictures);
        store.commit("setMyFavorites", pictures.data);
      } catch (err) {
        console.log("Error fetching data-----------", err);
      }
    }
  }

});

export default store;