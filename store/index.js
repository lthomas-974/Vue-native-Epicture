import Vue from "vue-native-core";
import Vuex from "vuex";
import { VueNativeBase } from "native-base";
Vue.use(Vuex);
Vue.use(VueNativeBase);

const store = new Vuex.Store({
  state: {
    UserData: {},
    MyFavorites: {},
    ImgurData:[]
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
    },
    setImgurData(state, payload){
      this.state.ImgurData = payload
    }
  },

  actions: {
    async updateHome(context){
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Client-ID ffea18b10c6e973");
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      await fetch(
          "https://api.imgur.com/3/gallery/top/viral/day/1?showViral=true&mature=true&album_previews=false",
          requestOptions)
        .then(response => response.json())
        .then(result => store.commit('setImgurData', result.data))
        .catch(error => console.log('error', error));
    },
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