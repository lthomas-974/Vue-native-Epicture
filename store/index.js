import Vue from "vue-native-core";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    UserData: {},
    MyFavorites: [],
    MyPictures: []
  },

  mutations: {
    setUserData(state, payload) {
      state.UserData = payload
      console.log("------------> In Store UserData")
    },
    setMyFavorites(state, payload) {
      state.MyFavorites = payload
      console.log("------------> In Store My Favorites")
    },
    setMyPictures(state, payload) {
      state.MyPictures = payload
      console.log("------------> In Store My Pictures")
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
        context.commit("setMyFavorites", pictures.data);
      } catch (err) {
        console.log("Error fetching data-----------", err);
      }
    },
    async updateMyPictures(context) {
      try {
        const imgurApiCall = await fetch(
          `https://api.imgur.com/3/account/me/images`,
          {
            methods: "GET",
            headers: {
              authorization: "Bearer " + store.state.UserData.params.access_token,
            },
          }
        );
        const pictures = await imgurApiCall.json();
        context.commit("setMyPictures", pictures.data);
      } catch (err) {
        console.log("Error fetching data-----------", err);
      }
    }
  }

});

export default store;